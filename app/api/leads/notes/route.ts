import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const leadId = request.nextUrl.searchParams.get("lead_id");

  if (!leadId) {
    return NextResponse.json({ error: "lead_id is required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { lead_id, content } = body;

  if (!lead_id || !content) {
    return NextResponse.json(
      { error: "lead_id and content are required" },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("lead_notes")
    .insert({ lead_id, content });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
