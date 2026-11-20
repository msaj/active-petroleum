import type { Metadata } from "next";
import Link from "next/link";
import { TIPS } from "@/lib/content";
import { Breadcrumbs } from "../../components/ContentBlocks";

export const metadata: Metadata = {
  title: "نصائح للسيارة: الزيت، البنزين، المازوت والدواليب",
  description:
    "نصائح بسيطة من محطة A.Petroleum بالمنية: كل قدّيش تغيّر الزيت، ضو الزيت الأحمر، بنزين 95 أو 98، مازوت التدفئة بأمان، والنيتروجين بالدواليب.",
  alternates: { canonical: "/tips" },
  openGraph: {
    type: "website",
    locale: "ar_LB",
    siteName: "A.Petroleum",
    url: "/tips",
    title: "نصائح للسيارة من A.Petroleum المنية",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function TipsIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { label: "نصائح" }]} />
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">نصائح بتوفّر عليك</h1>
        <p className="text-lg leading-9 text-slate-700">أجوبة قصيرة وواضحة على أسئلة بنسمعها كل يوم بالمحطة.</p>
      </header>
      <ul className="grid sm:grid-cols-2 gap-4">
        {TIPS.map((t) => (
          <li key={t.slug}>
            <Link href={`/tips/${t.slug}`} className="block h-full bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#0B4F9F] hover:shadow-md transition">
              <h2 className="text-xl font-black leading-8">{t.title}</h2>
              <p className="text-slate-600 leading-7 mt-2 line-clamp-3">{t.summary}</p>
              <span className="inline-block mt-3 font-extrabold text-[#0B4F9F]">اقرأ ←</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
