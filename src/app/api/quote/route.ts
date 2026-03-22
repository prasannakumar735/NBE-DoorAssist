import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface QuotePayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  facility_type?: string;
  opening_width?: string;
  opening_height?: string;
  quantity?: string;
  material?: string;
  insulation?: string;
  notes?: string;
  files?: string[];
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toPositiveInt(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return Math.floor(parsed);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim();
    const company = (body.company || "").trim();
    const facilityType = (body.facility_type || "warehouse").trim();
    const material = (body.material || "aluminum").trim();
    const insulation = (body.insulation || "no").trim();
    const notes = (body.notes || "").trim();
    const attachments = Array.isArray(body.files)
      ? body.files.filter((fileName) => typeof fileName === "string" && fileName.trim().length > 0)
      : [];

    const openingWidth = toPositiveInt(body.opening_width);
    const openingHeight = toPositiveInt(body.opening_height);
    const quantity = toPositiveInt(body.quantity);

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!openingWidth || !openingHeight || !quantity) {
      return NextResponse.json(
        { error: "Opening width, opening height, and quantity must be valid positive numbers." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabasePublishableKey) {
      return NextResponse.json(
        { error: "Supabase is not configured on the server." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabasePublishableKey);
    const { error } = await supabase.from("enquiries").insert({
      name,
      email,
      phone,
      company: company || null,
      facility_type: facilityType,
      opening_width: openingWidth,
      opening_height: openingHeight,
      quantity,
      material,
      insulation,
      notes: notes || null,
      attachments,
      status: "new",
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
