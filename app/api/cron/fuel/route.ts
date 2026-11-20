import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseHeaders } from "@/lib/supabase";
import { beirutDate, scrapeIptTable, IPT_SOURCE_URL, FUEL_KEYS, FUEL_TAG } from "@/lib/fuel";
import { SITE_URL } from "@/lib/site";

/** Marks cached prices stale and rebuilds the main price pages right away, so visitors and crawlers see the new table. */
async function refreshPages(extra: string[] = []) {
  revalidateTag(FUEL_TAG, { expire: 0 });
  const paths = ["/fuel-prices", "/", "/sitemap.xml", ...extra];
  await Promise.allSettled(paths.map((p) => fetch(`${SITE_URL}${p}`, { cache: "no-store" })));
}

// Called by Vercel Cron (see vercel.json). Stores a new row when the price table changes,
// then refreshes the cached price pages.
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
  const headers = { ...supabaseHeaders(serviceKey), "Content-Type": "application/json" };

  const { prices, tableDate } = await scrapeIptTable();
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
    await refreshPages();
    return NextResponse.json({ stored: false, reason: "no change", last_table: last?.table_date });
  }

  // Use the date printed by IPT; fall back to today's Beirut date if it is missing or older than the last row.
  let today = tableDate ?? beirutDate();
  if (last && String(last.table_date) >= today) today = beirutDate();
  const ins = await fetch(`${url}/rest/v1/fuel_prices?on_conflict=table_date`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ table_date: today, ...prices, source: IPT_SOURCE_URL }),
  });
  if (!ins.ok) {
    return NextResponse.json({ error: "insert failed", detail: await ins.text() }, { status: 500 });
  }
  await refreshPages([`/fuel-prices/${today}`]);
  return NextResponse.json({ stored: true, table_date: today, ipt_date: tableDate, prices });
}
