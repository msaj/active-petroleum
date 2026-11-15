import { NextResponse } from "next/server";
import { getCurrentPrices } from "@/lib/fuel";

// Public JSON of the current prices (kept for compatibility with earlier versions of the site).
export async function GET() {
  const { prices, checkedAt } = await getCurrentPrices();
  return NextResponse.json({ ...prices, checkedAt });
}
