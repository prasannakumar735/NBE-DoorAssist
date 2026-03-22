"use client";

import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

export type ChatLine = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

const QUICK_QUESTIONS = [
  "What door suits my warehouse?",
  "Do you install?",
  "What is delivery time?",
] as const;

/** Same output in Node and browsers (avoids toLocaleTimeString hydration mismatches). */
function formatTime(ts: number) {
  const d = new Date(ts);
  const h24 = d.getHours();
  const min = d.getMinutes();
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12;
  const hour = h12 === 0 ? 12 : h12;
  return `${hour}:${min.toString().padStart(2, "0")} ${period}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatLine[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I'm the Drooov Assistant. I can help with rapid roller doors, PVC strip curtains, and industrial door solutions. Ask a question below or use a quick prompt.",
      createdAt: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<ChatLine[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendPayload = useCallback(
    async (history: { role: Role; content: string }[]) => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });
        const data = (await res.json()) as { message?: string; error?: string };
        if (!res.ok) {
          throw new Error(data.error ?? "Something went wrong");
        }
        if (!data.message) {
          throw new Error("No reply from assistant");
        }
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message!,
            createdAt: Date.now(),
          },
        ]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatLine = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setInput("");
    const next = [...messagesRef.current, userMsg];
    messagesRef.current = next;
    setMessages(next);
    await sendPayload(next.map((m) => ({ role: m.role, content: m.content })));
  }, [input, loading, sendPayload]);

  const sendQuick = useCallback(
    async (q: string) => {
      if (loading) return;
      setInput("");
      const userMsg: ChatLine = {
        id: crypto.randomUUID(),
        role: "user",
        content: q,
        createdAt: Date.now(),
      };
      const next = [...messagesRef.current, userMsg];
      messagesRef.current = next;
      setMessages(next);
      await sendPayload(next.map((m) => ({ role: m.role, content: m.content })));
    },
    [loading, sendPayload],
  );

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[9999] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] md:p-6">
      <div className="pointer-events-auto relative flex flex-col items-end">
        <div
          id="drooov-chat-panel"
          className={`absolute bottom-full right-0 mb-3 flex max-h-[min(560px,calc(100vh-8rem))] w-[min(100vw-2rem,400px)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl transition-all duration-300 ease-out ${
            open ? "visible translate-y-0 scale-100 opacity-100" : "invisible pointer-events-none translate-y-2 scale-95 opacity-0"
          }`}
          aria-hidden={!open}
        >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-[#fafafa] px-4">
          <span className="font-headline text-sm font-bold text-[#051125]">Drooov Assistant</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-[#584237] transition-colors hover:bg-[#e5e7eb] hover:text-[#051125]"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="border-b border-[#f3f4f6] px-3 py-2">
          <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wide text-[#6b7280]">Quick questions</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => sendQuick(q)}
                className="rounded-full border border-[#fed7aa] bg-[#fff7ed] px-2.5 py-1 text-left text-[11px] font-medium leading-snug text-[#9a3412] transition-colors hover:bg-[#ffedd5] disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="min-h-[200px] flex-1 space-y-3 overflow-y-auto px-4 py-3"
          role="log"
          aria-live="polite"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col gap-0.5 ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-md bg-[#f97316] text-white"
                    : "rounded-bl-md bg-[#f3f4f6] text-[#191c1f]"
                }`}
              >
                {m.content}
              </div>
              {m.createdAt > 0 ? (
                <span className="text-[10px] text-[#9ca3af]">{formatTime(m.createdAt)}</span>
              ) : null}
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 pl-1 text-sm text-[#6b7280]">
              <span className="flex gap-1">
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[#f97316] [animation-delay:-0.2s]" />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[#f97316] [animation-delay:-0.1s]" />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[#f97316]" />
              </span>
              <span className="text-xs">Typing…</span>
            </div>
          ) : null}
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="border-t border-[#e5e7eb] p-3">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Type your message…"
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#191c1f] placeholder:text-[#9ca3af] outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/25 disabled:opacity-60"
              maxLength={2000}
              aria-label="Message"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f97316] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <Link
            href="/contact"
            className="mt-2 block text-center text-xs font-semibold text-[#f97316] hover:underline"
            onClick={() => setOpen(false)}
          >
            Get a quote →
          </Link>
        </div>
      </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg ring-offset-2 ring-offset-[#fbf9f8] transition-transform hover:scale-105 active:scale-95 ${
            open ? "ring-2 ring-[#f97316]" : ""
          }`}
          aria-expanded={open}
          aria-controls="drooov-chat-panel"
          aria-label={open ? "Close Drooov Assistant" : "Open Drooov Assistant"}
        >
          {open ? (
            <X className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />
          ) : (
            <MessageCircle className="h-7 w-7 text-white" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
