import { FUEL_KEYS, type FuelKey, type PriceRow } from "./fuel";

export type RowWithChange = PriceRow & { change: Record<FuelKey, number | null> };

/** Adds the change of each price versus the previous (older) table. Rows are newest first. */
export function withChanges(rows: PriceRow[]): RowWithChange[] {
  return rows.map((r, i) => {
    const prev = rows[i + 1];
    const change = Object.fromEntries(
      FUEL_KEYS.map((k) => [k, prev && r[k] != null && prev[k] != null ? (r[k] as number) - (prev[k] as number) : null]),
    ) as Record<FuelKey, number | null>;
    return { ...r, change };
  });
}

export function formatChange(n: number | null) {
  if (n == null || n === 0) return n === 0 ? "بدون تغيير" : "";
  const sign = n > 0 ? "+" : "−";
  return `${sign}${Math.abs(n).toLocaleString("en-US")}`;
}

export function changeClass(n: number | null) {
  if (!n) return "text-slate-500";
  return n > 0 ? "text-red-600" : "text-emerald-700";
}
