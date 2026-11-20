import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { beirutDate, FUEL_KEYS, FUEL_LABELS, formatArabicDate, formatLbp, formatUsd, getPriceHistory } from "@/lib/fuel";
import { changeClass, formatChange, withChanges } from "@/lib/history";

export async function generateStaticParams() {
  const rows = await getPriceHistory(60);
  // Cache Components needs at least one param at build time.
  return rows.length ? rows.map((r) => ({ date: r.table_date })) : [{ date: beirutDate() }];
}

export async function generateMetadata({ params }: PageProps<"/fuel-prices/[date]">): Promise<Metadata> {
  const { date } = await params;
  const title = `أسعار المحروقات في لبنان، ${formatArabicDate(date)}`;
  return {
    title,
    description: `سعر صفيحة البنزين 95 و98 والمازوت وقارورة الغاز حسب جدول ${formatArabicDate(date)}، مع التغيّر عن الجدول اللي قبله.`,
    alternates: { canonical: `/fuel-prices/${date}` },
    openGraph: {
      type: "article",
      locale: "ar_LB",
      siteName: "A.Petroleum",
      url: `/fuel-prices/${date}`,
      title,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

async function TableDetails({ params }: { params: PageProps<"/fuel-prices/[date]">["params"] }) {
  const { date } = await params;
  const all = withChanges(await getPriceHistory());
  const idx = all.findIndex((r) => r.table_date === date);
  if (idx === -1) notFound();
  const row = all[idx];
  const newer = all[idx - 1];
  const older = all[idx + 1];

  const up = FUEL_KEYS.filter((k) => (row.change[k] ?? 0) > 0).map((k) => FUEL_LABELS[k].ar);
  const down = FUEL_KEYS.filter((k) => (row.change[k] ?? 0) < 0).map((k) => FUEL_LABELS[k].ar);
  const summary = !older
    ? "هيدا أول جدول محفوظ بالسجل."
    : [up.length ? `ارتفع سعر ${up.join("، ")}` : "", down.length ? `انخفض سعر ${down.join("، ")}` : ""].filter(Boolean).join("، و") ||
      "ما تغيّرت الأسعار عن الجدول اللي قبله.";

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">أسعار المحروقات في لبنان، {formatArabicDate(date)}</h1>
      <p className="text-slate-700 leading-8 text-lg">{summary}.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {FUEL_KEYS.map((k) => (
          <div key={k} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="font-extrabold">{FUEL_LABELS[k].ar}</div>
            <div className="text-xs text-slate-500">{FUEL_LABELS[k].unit}</div>
            <div className="num text-2xl font-black mt-2">{formatLbp(row[k])} <span className="text-sm text-slate-500">ل.ل.</span></div>
            <div className={`num text-sm font-bold ${changeClass(row.change[k])}`}>{formatChange(row.change[k])}</div>
            {row[k] != null && <div className="num text-xs text-slate-500 mt-1">≈ ${formatUsd(row[k])}</div>}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        المصدر: <a href={row.source} target="_blank" rel="noopener nofollow" className="underline">IPT Group</a>. التاريخ هو يوم ما ظهر الجدول عنا. الدولار تقريبي على 89,500 ل.ل.
      </p>

      <nav className="flex flex-wrap justify-between gap-3" aria-label="جداول أخرى">
        {older ? <Link href={`/fuel-prices/${older.table_date}`} className="text-[#0B4F9F] font-bold hover:underline">الجدول اللي قبله: {formatArabicDate(older.table_date)}</Link> : <span />}
        {newer && <Link href={`/fuel-prices/${newer.table_date}`} className="text-[#0B4F9F] font-bold hover:underline">الجدول اللي بعده: {formatArabicDate(newer.table_date)}</Link>}
      </nav>
    </>
  );
}

export default function PriceTablePage(props: PageProps<"/fuel-prices/[date]">) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">الرئيسية</Link> / <Link href="/fuel-prices" className="hover:underline">أسعار المحروقات</Link>
      </nav>
      <Suspense fallback={<p className="text-slate-500">عم نجيب الجدول…</p>}>
        <TableDetails params={props.params} />
      </Suspense>
      <Link href="/fuel-prices" className="inline-block bg-[#F5B301] text-slate-950 font-extrabold px-5 py-3 rounded-xl">أسعار اليوم والسجل الكامل</Link>
    </div>
  );
}
