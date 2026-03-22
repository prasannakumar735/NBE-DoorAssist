import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Drooov Assistant.

You ONLY answer about:
- Rapid Roller Doors
- PVC Strip Curtains
- Industrial door solutions
- Installation and specifications

STRICT RULES:

1. NEVER provide product pricing.
2. NEVER compare competitors.
3. NEVER mention other companies or brands.
4. NEVER reveal internal manufacturing details.
5. ALWAYS guide users to request a quote.

If user asks price:
→ Say: 'Please request a quote and our team will provide the best pricing based on your requirements.'

If user asks competitor comparison:
→ Say: 'We provide customised solutions tailored to your needs. Please contact us for more details.'

Tone:
- Professional
- Short
- Helpful
- Sales-focused`;

const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_MESSAGES = 24;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function parseUpstreamError(data: unknown): string {
  if (!data || typeof data !== "object") return "Unknown error";
  const err = (data as { error?: unknown }).error;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err && typeof (err as { message: unknown }).message === "string") {
    return (err as { message: string }).message;
  }
  return "Unknown error";
}

const isDev = process.env.NODE_ENV === "development";

type ChatProvider = "groq" | "xai";

/** Groq keys always start with `gsk_`. xAI keys start with `xai-`. */
function isGroqApiKey(key: string) {
  return key.startsWith("gsk_");
}

function isXaiApiKey(key: string) {
  return key.startsWith("xai-");
}

function resolveChatBackend():
  | { provider: ChatProvider; apiKey: string; endpoint: string; model: string }
  | null {
  const groqExplicit = process.env.GROQ_API_KEY?.trim();
  const grokEnv = process.env.GROK_API_KEY?.trim();
  const xaiEnv = process.env.XAI_API_KEY?.trim();

  // Prefer explicit Groq; also accept common mistake: GROK_API_KEY=gsk_… (Groq, not xAI "Grok")
  const groqKey = groqExplicit ?? (grokEnv && isGroqApiKey(grokEnv) ? grokEnv : undefined);
  if (groqKey) {
    return {
      provider: "groq",
      apiKey: groqKey,
      endpoint: process.env.GROQ_API_URL ?? "https://api.groq.com/openai/v1/chat/completions",
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    };
  }

  const xaiKey = (xaiEnv ?? (grokEnv && isXaiApiKey(grokEnv) ? grokEnv : undefined))?.trim();
  if (xaiKey) {
    return {
      provider: "xai",
      apiKey: xaiKey,
      endpoint: process.env.XAI_API_URL ?? process.env.GROK_API_URL ?? "https://api.x.ai/v1/chat/completions",
      model: process.env.GROK_MODEL ?? process.env.XAI_MODEL ?? "grok-4-1-fast-non-reasoning",
    };
  }

  return null;
}

export async function POST(request: Request) {
  const backend = resolveChatBackend();
  if (!backend) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured. Set GROQ_API_KEY (Groq, keys start with gsk_) or XAI_API_KEY (xAI, keys start with xai-).",
      },
      { status: 503 },
    );
  }

  if (isDev && backend.provider === "xai" && !backend.apiKey.startsWith("xai-")) {
    console.warn(
      "[chat] xAI key does not start with xai-. Confirm the key from https://console.x.ai",
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body as { messages?: ChatMessage[] }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array required" }, { status: 400 });
  }

  const safeHistory: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of messages) {
    if (!m || typeof m.content !== "string") continue;
    if (m.role !== "user" && m.role !== "assistant") continue;
    const trimmed = m.content.trim();
    if (!trimmed) continue;
    if (trimmed.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }
    safeHistory.push({ role: m.role, content: trimmed });
  }

  if (safeHistory.length === 0) {
    return NextResponse.json({ error: "No valid messages" }, { status: 400 });
  }

  const truncated = safeHistory.slice(-MAX_HISTORY_MESSAGES);
  const label = backend.provider === "groq" ? "Groq" : "xAI";

  try {
    const res = await fetch(backend.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${backend.apiKey}`,
      },
      body: JSON.stringify({
        model: backend.model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...truncated],
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });

    const rawText = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(rawText) as unknown;
    } catch {
      console.error("[chat] Non-JSON response:", rawText.slice(0, 500));
      return NextResponse.json(
        {
          error: isDev
            ? `Invalid response from API (${res.status}). Check ${backend.provider === "groq" ? "GROQ_MODEL" : "GROK_MODEL"} and endpoint.`
            : "The assistant could not respond right now. Please try again or use Get a quote.",
        },
        { status: 502 },
      );
    }

    const payload = data as {
      error?: { message?: string };
      choices?: { message?: { content?: string | null } }[];
    };

    if (!res.ok) {
      const msg = parseUpstreamError(data) || payload.error?.message || res.statusText;
      console.error(`[chat] ${label} error:`, res.status, msg);
      return NextResponse.json(
        {
          error: isDev ? `${label} API (${res.status}): ${msg}` : "The assistant could not respond right now. Please try again or use Get a quote.",
        },
        { status: 502 },
      );
    }

    const text = payload.choices?.[0]?.message?.content?.trim();
    if (!text) {
      console.error("[chat] Empty choices:", JSON.stringify(data).slice(0, 800));
      return NextResponse.json(
        { error: isDev ? `Empty completion from ${label} (check model).` : "Empty response" },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: text });
  } catch (e) {
    console.error("[chat] fetch failed:", e);
    return NextResponse.json(
      {
        error: isDev
          ? `Network error: ${e instanceof Error ? e.message : String(e)}`
          : "Could not reach the assistant. Please try again later.",
      },
      { status: 502 },
    );
  }
}
