import type { Metadata } from "next";
import Link from "next/link";
import PriceBoard from "../../components/PriceBoard";
import { FUEL_KEYS, FUEL_LABELS, formatArabicDate, formatLbp, getPriceHistory } from "@/lib/fuel";
import { changeClass, formatChange, withChanges } from "@/lib/history";

export const metadata: Metadata = {
  title: "أسعار المحروقات اليوم في لبنان: البنزين والمازوت والغاز",
  description:
    "سعر صفيحة البنزين 95 و98 والمازوت وقارورة الغاز اليوم في لبنان، مع سجل كل جدول وتغيّر السعر عن الجدول اللي قبله. محدّث من جدول IPT.",
  alternates: { canonical: "/fuel-prices" },
};

export default async function FuelPricesPage() {
  const history = withChanges(await getPriceHistory());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <header className="space-y-3">
        <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">الرئيسية</Link> / أسعار المحروقات
        </nav>
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">أسعار المحروقات اليوم في لبنان</h1>
        <p className="text-slate-600 leading-8">
          سعر صفيحة البنزين 95 و98 أوكتان والمازوت (20 ليتر) وقارورة الغاز، كما يظهر بجدول IPT. منحدّث الأسعار تلقائياً، ومنحفظ كل جدول جديد بالسجل تحت.
        </p>
      </header>

      <PriceBoard showLink={false} />

      <section className="space-y-4">
        <h2 className="text-2xl font-black">سجل جداول الأسعار</h2>
        {history.length === 0 ? (
          <p className="text-slate-600 bg-white border border-slate-200 rounded-2xl p-5">السجل بلّش يتجمّع. كل ما يصدر جدول جديد، بينضاف هون بتاريخه.</p>
        ) : (
          <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3 text-right">التاريخ</th>
                  {FUEL_KEYS.map((k) => (
                    <th key={k} className="p-3 text-right whitespace-nowrap">{FUEL_LABELS[k].ar}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr key={r.table_date} className="border-t border-slate-100">
                    <td className="p-3 whitespace-nowrap">
                      <Link href={`/fuel-prices/${r.table_date}`} className="font-bold text-[#0B4F9F] hover:underline">{formatArabicDate(r.table_date)}</Link>
                    </td>
                    {FUEL_KEYS.map((k) => (
                      <td key={k} className="p-3 whitespace-nowrap">
                        <div className="num font-bold">{formatLbp(r[k])}</div>
                        <div className={`num text-xs ${changeClass(r.change[k])}`}>{formatChange(r.change[k])}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-2xl font-black">أسئلة متكررة</h2>
        <div>
          <h3 className="font-extrabold text-lg">مين بيحدد سعر المحروقات بلبنان؟</h3>
          <p className="text-slate-600 leading-8 mt-1">وزارة الطاقة والمياه بتصدر جدول تركيب أسعار المحروقات، وبيتغيّر عادة أكتر من مرة بالأسبوع حسب أسعار النفط العالمية وسعر الصرف.</p>
        </div>
        <div>
          <h3 className="font-extrabold text-lg">ليش السعر محسوب على الصفيحة؟</h3>
          <p className="text-slate-600 leading-8 mt-1">بلبنان سعر البنزين والمازوت بينحسب على الصفيحة، يعني 20 ليتر، وسعر الغاز على القارورة.</p>
        </div>
        <div>
          <h3 className="font-extrabold text-lg">بتوصّلو مازوت للبيت؟</h3>
          <p className="text-slate-600 leading-8 mt-1">إي، منوصّل مازوت التدفئة بالصهريج للبيوت والمؤسسات بالمنية والشمال. <Link href="/#order" className="font-extrabold text-[#0B4F9F] underline">اطلب من هون</Link>.</p>
        </div>
      </section>
    </div>
  );
}
