import { NextResponse } from "next/server";
import { beirutDate, scrapeIptPrices, IPT_SOURCE_URL, FUEL_KEYS } from "@/lib/fuel";

// Called by Vercel Cron (see vercel.json). Stores a new row when the price table changes.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: "database not configured" }, { status: 500 });
  }
  const headers = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" };

  const prices = await scrapeIptPrices();
  if (FUEL_KEYS.some((k) => prices[k] == null)) {
    return NextResponse.json({ error: "could not read all prices", prices }, { status: 502 });
  }

  const lastRes = await fetch(`${url}/rest/v1/fuel_prices?select=p95,p98,diesel,gas,table_date&order=table_date.desc&limit=1`, {
    headers,
    cache: "no-store",
  });
  const last = lastRes.ok ? ((await lastRes.json()) as Record<string, number | string>[])[0] : undefined;
  const changed = !last || FUEL_KEYS.some((k) => Number(last[k]) !== prices[k]);
  if (!changed) {
    return NextResponse.json({ stored: false, reason: "no change", last_table: last?.table_date });
  }

  const today = beirutDate();
  const ins = await fetch(`${url}/rest/v1/fuel_prices?on_conflict=table_date`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ table_date: today, ...prices, source: IPT_SOURCE_URL }),
  });
  if (!ins.ok) {
    return NextResponse.json({ error: "insert failed", detail: await ins.text() }, { status: 500 });
  }
  return NextResponse.json({ stored: true, table_date: today, prices });
}
