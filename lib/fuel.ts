import { cacheLife } from "next/cache";

export type FuelKey = "p95" | "p98" | "diesel" | "gas";

export type FuelPrices = {
  p95: number | null;
  p98: number | null;
  diesel: number | null;
  gas: number | null;
};

export type PriceRow = FuelPrices & {
  table_date: string; // YYYY-MM-DD, Beirut date when the table was first seen
  source: string;
};

export const FUEL_LABELS: Record<FuelKey, { ar: string; en: string; unit: string }> = {
  p95: { ar: "بنزين 95 أوكتان", en: "Unleaded 95", unit: "صفيحة 20 ليتر" },
  p98: { ar: "بنزين 98 أوكتان", en: "Unleaded 98", unit: "صفيحة 20 ليتر" },
  diesel: { ar: "مازوت", en: "Diesel", unit: "صفيحة 20 ليتر" },
  gas: { ar: "قارورة غاز", en: "Gas (LPG)", unit: "قارورة" },
};

export const FUEL_KEYS: FuelKey[] = ["p95", "p98", "diesel", "gas"];

export const IPT_SOURCE_URL = "https://www.iptgroup.com.lb/ipt/en/home";

// Approximate dollar rate used only for an indicative conversion.
export const USD_RATE = 89500;

/** Reads the price table published on the IPT Group home page. Not cached: callers cache. */
export async function scrapeIptPrices(): Promise<FuelPrices> {
  const res = await fetch(IPT_SOURCE_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    cache: "no-store",
  });
  const html = await res.text();
  const read = (label: string): number | null => {
    const safe = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const m = html.match(
      new RegExp(`<span class="item-info">${safe}</span>\\s*<span class="item-price">(.*?)\\s*L\\.L\\.</span>`, "i"),
    );
    if (!m) return null;
    const n = parseInt(m[1].replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) ? n : null;
  };
  return { p95: read("UNL 95"), p98: read("UNL 98"), diesel: read("Diesel"), gas: read("Gas (LPG)") };
}

/** Current prices with the time they were read. Cached for about an hour. */
export async function getCurrentPrices(): Promise<{ prices: FuelPrices; checkedAt: string }> {
  "use cache";
  cacheLife("hours");
  try {
    const prices = await scrapeIptPrices();
    return { prices, checkedAt: new Date().toISOString() };
  } catch {
    return { prices: { p95: null, p98: null, diesel: null, gas: null }, checkedAt: new Date().toISOString() };
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Archived price tables, newest first. Empty if the database is not configured yet. */
export async function getPriceHistory(limit = 400): Promise<PriceRow[]> {
  "use cache";
  cacheLife("hours");
  if (!SUPABASE_URL || !SUPABASE_ANON) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/fuel_prices?select=table_date,p95,p98,diesel,gas,source&order=table_date.desc&limit=${limit}`,
      { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } },
    );
    if (!res.ok) return [];
    return (await res.json()) as PriceRow[];
  } catch {
    return [];
  }
}

export function formatLbp(n: number | null) {
  return n == null ? "غير متوفر" : n.toLocaleString("en-US");
}

export function formatUsd(n: number | null) {
  return n == null ? "" : (n / USD_RATE).toFixed(2);
}

export function beirutDate(d: Date = new Date()) {
  // en-CA gives YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Beirut" }).format(d);
}

export function formatArabicDate(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat("ar-LB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Beirut" }).format(d);
}

export function formatArabicDateTime(iso: string) {
  return new Intl.DateTimeFormat("ar-LB", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Beirut" }).format(new Date(iso));
}
