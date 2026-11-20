import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import { Breadcrumbs } from "../../components/ContentBlocks";
import EvBookingForm from "../../components/EvBookingForm";

export const metadata: Metadata = {
  title: "احجز شاحن لسيارتك الكهربائية بالمنية",
  description:
    "احجز موعد لشحن سيارتك الكهربائية بمحطة A.Petroleum بالمنية على شواحن EVZONE. اختار اليوم والساعة ونوع الموصل، والطلب بيوصلنا عالواتساب.",
  alternates: { canonical: "/book-charging" },
  openGraph: {
    type: "website",
    locale: "ar_LB",
    siteName: "A.Petroleum",
    url: "/book-charging",
    title: "احجز شاحن لسيارتك الكهربائية | A.Petroleum المنية",
    description: "اختار اليوم والساعة ونوع الموصل، والطلب بيوصلنا عالواتساب.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function BookCharging() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { href: "/services/ev-charging", label: "شحن السيارات الكهربائية" }, { label: "احجز شاحن" }]} />
      <div className="bg-[#0B2545] text-white rounded-[28px] p-6 sm:p-10 grid gap-8 lg:grid-cols-2 items-start">
        <div className="space-y-5">
          <span className="text-[#F5B301] font-extrabold text-sm">شواحن EVZONE • المنية</span>
          <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">احجز شاحن لسيارتك الكهربائية</h1>
          <p className="text-slate-300 leading-8">
            ما بدك تستنّى عالشاحن؟ اختار اليوم والساعة اللي بتناسبك، وابعتلنا الطلب عالواتساب. منرد عليك ومنثبّت الموعد.
          </p>
          <ol className="space-y-2 text-slate-200">
            <li>١. اختار اليوم والساعة</li>
            <li>٢. اكتب نوع السيارة ونوع الموصل</li>
            <li>٣. منأكد معك الموعد عالواتساب</li>
          </ol>
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden hidden lg:block">
            <Image src="/evzone.jpg" alt="شاحن EVZONE للسيارات الكهربائية بمحطة A.Petroleum بالمنية" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <p className="text-sm text-slate-300">
            مش متأكد من نوع الموصل؟ اختار &quot;ما بعرف&quot; أو اتصل:{" "}
            <a href={`tel:${PHONE_E164}`} className="num font-extrabold text-white underline">{PHONE_DISPLAY}</a>
          </p>
        </div>
        <EvBookingForm />
      </div>
      <p className="text-slate-600 leading-8">
        بدك تعرف أكتر عن الشحن ونصائح البطارية؟{" "}
        <Link href="/services/ev-charging" className="font-extrabold text-[#0B4F9F] underline">صفحة شحن السيارات الكهربائية</Link>
      </p>
    </div>
  );
}
