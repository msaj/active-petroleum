import Link from "next/link";
import { FUEL_KEYS, FUEL_LABELS, formatArabicDateTime, formatLbp, formatUsd, getCurrentPrices, IPT_SOURCE_URL } from "@/lib/fuel";

const ACCENT: Record<string, string> = {
  p95: "border-r-4 border-r-emerald-500",
  p98: "border-r-4 border-r-blue-500",
  diesel: "border-r-4 border-r-amber-400",
  gas: "border-r-4 border-r-cyan-400",
};

export default async function PriceBoard({ showLink = true }: { showLink?: boolean }) {
  const { prices, checkedAt } = await getCurrentPrices();

  return (
    <div className="w-full bg-[#090F1A] text-white rounded-[28px] p-5 sm:p-6 shadow-xl border-4 border-slate-200">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <h2 className="text-lg font-black">أسعار المحروقات اليوم</h2>
        <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-0.5">حسب جدول IPT</span>
      </div>

      <ul className="mt-3 space-y-2.5">
        {FUEL_KEYS.map((k) => (
          <li key={k} className={`bg-[#111A2E] ${ACCENT[k]} rounded-xl p-3.5 flex justify-between items-center gap-3`}>
            <div>
              <div className="font-extrabold text-sm sm:text-base">{FUEL_LABELS[k].ar}</div>
              <div className="text-[11px] text-slate-400">{FUEL_LABELS[k].unit}</div>
            </div>
            <div className="text-left">
              <div className="num text-lg sm:text-xl font-extrabold text-[#F5B301]">
                {formatLbp(prices[k])} <span className="text-[10px] text-slate-400">ل.ل.</span>
              </div>
              {prices[k] != null && <div className="num text-[11px] font-bold text-emerald-400">≈ ${formatUsd(prices[k])}</div>}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[11px] leading-5 text-slate-400">
        آخر تحقق: {formatArabicDateTime(checkedAt)} • المصدر:{" "}
        <a href={IPT_SOURCE_URL} target="_blank" rel="noopener nofollow" className="underline hover:text-white">IPT Group</a>
        {" "}• الدولار تقريبي على 89,500 ل.ل.
      </p>
      {showLink && (
        <Link href="/fuel-prices" className="mt-3 block text-center bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl py-2.5">
          سجل الأسعار والتغييرات
        </Link>
      )}
    </div>
  );
}
