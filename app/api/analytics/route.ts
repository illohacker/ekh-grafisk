import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, utm_source, utm_medium, utm_campaign } = body;

    try {
      const supabase = getSupabase();
      await supabase.from("page_views").insert({
        path: path || "/",
        referrer: referrer || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
      });
    } catch {
      // Table may not exist yet — silently ignore
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}

// Get analytics data
export async function GET(request: NextRequest) {
  const days = parseInt(request.nextUrl.searchParams.get("days") || "30");
  const since = new Date();
  since.setDate(since.getDate() - days);

  const supabase = getSupabase();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let views: any[] | null = null;
  try {
    const result = await supabase
      .from("page_views")
      .select("*")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });
    views = result.data;
  } catch {
    views = null;
  }

  const { data: leads } = await supabase
    .from("leads")
    .select("id, status, created_at, company")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false });

  const allViews = views || [];
  const allLeads = leads || [];

  // Aggregate stats
  const totalViews = allViews.length;
  const totalLeads = allLeads.length;
  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : "0";

  // UTM breakdown
  const utmSources: Record<string, number> = {};
  for (const v of allViews) {
    const src = v.utm_source || "direkte";
    utmSources[src] = (utmSources[src] || 0) + 1;
  }

  // Daily views for chart
  const dailyViews: Record<string, number> = {};
  const dailyLeads: Record<string, number> = {};
  for (const v of allViews) {
    const day = new Date(v.created_at).toISOString().slice(0, 10);
    dailyViews[day] = (dailyViews[day] || 0) + 1;
  }
  for (const l of allLeads) {
    const day = new Date(l.created_at).toISOString().slice(0, 10);
    dailyLeads[day] = (dailyLeads[day] || 0) + 1;
  }

  // Lead status breakdown
  const statusBreakdown: Record<string, number> = {};
  for (const l of allLeads) {
    statusBreakdown[l.status] = (statusBreakdown[l.status] || 0) + 1;
  }

  return NextResponse.json({
    totalViews,
    totalLeads,
    conversionRate,
    utmSources,
    dailyViews,
    dailyLeads,
    statusBreakdown,
  });
}
