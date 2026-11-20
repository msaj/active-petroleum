import { NextResponse } from "next/server";

// Short link printed in the QR stickers: /s/AP-XXXXXX.
// For now it opens the staff panel on that sticker. Later it can show the customer page.
export async function GET(request: Request, ctx: RouteContext<"/s/[code]">) {
  const { code } = await ctx.params;
  const clean = decodeURIComponent(code).toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 20);
  return NextResponse.redirect(new URL(`/admin?sticker=${encodeURIComponent(clean)}`, request.url), 307);
}
