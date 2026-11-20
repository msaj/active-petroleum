// Oil products sold at the station and default change intervals.
// The intervals are starting values: staff can change the next change for each car,
// and the station owner should confirm them.

export type OilProduct = { id: string; label: string; km: number; months: number };

export const OIL_PRODUCTS: OilProduct[] = [
  { id: "ELF Evolution 700 STI 10W-40", label: "ELF 700 STI 10W-40 (نصف صناعي)", km: 7500, months: 6 },
  { id: "ELF Evolution 900 SXR 5W-40", label: "ELF 900 SXR 5W-40 (صناعي)", km: 10000, months: 6 },
];

export const OTHER_OIL = { km: 5000, months: 6 };

export const OIL_SERVICES = [
  { id: "oil_filter", label: "زيت + فلتر" },
  { id: "oil_only", label: "زيت بلا فلتر" },
  { id: "top_up", label: "زيادة زيت" },
  { id: "filter_only", label: "فلتر بس" },
] as const;

export const WASH_TYPES = [
  { id: "normal", label: "غسيل عادي" },
  { id: "lift", label: "غسيل ورافع" },
  { id: "engine", label: "غسيل مع موتور" },
  { id: "vip", label: "VIP شامل" },
] as const;

/** Same rule as the plate_key column in the database: upper case, no spaces, dots, dashes, underscores or slashes. */
export function plateKey(plate: string) {
  return plate.toUpperCase().replace(/[\s._/-]/g, "");
}

export function addMonths(d: Date, months: number) {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r.toISOString().slice(0, 10);
}
