import type { Metadata } from "next";
import Link from "next/link";
import PriceBoard from "../components/PriceBoard";
import Showcase from "../components/Showcase";
import OrderForm from "../components/OrderForm";
import { ADDRESS_AR, MAPS_URL, PHONE_DISPLAY, PHONE_E164, waLink } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SERVICES = [
  { title: "وقود IPT", text: "بنزين 95 و98 ومازوت، مع خدمة سريعة عالمضخة.", href: "/fuel-prices", cta: "أسعار اليوم", icon: "M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M15 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3M7 7h5v4H7z" },
  { title: "مازوت التدفئة والغاز", text: "توصيل مازوت التدفئة بالصهريج وقناني غاز للبيوت والمؤسسات.", href: "/services/heating-diesel", cta: "التفاصيل والطلب", icon: "M2 9h13v8H2zM15 12h4l3 3v2h-7M5 9V6h7v3", highlight: true },
  { title: "تغيير زيت وفلاتر", text: "زيوت ELF وتبديل الفلاتر بالدرجة اللي بيطلبها موتورك.", href: "/services/oil-change", cta: "تغيير الزيت", icon: "M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" },
  { title: "غسيل VIP", text: "غسيل عادي، ورافع من تحت، مع موتور، وVIP شامل.", href: "/services/car-wash", cta: "أنواع الغسيل", icon: "M3 15l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 10l2 5v3H3zM8 4v1M12 3v2M16 4v1" },
  { title: "شحن السيارات الكهربائية", text: "شواحن EVZONE بالمحطة.", href: "/services/ev-charging", cta: "شحن EV", icon: "M4 3h10v18H4zM10 7l-2 4h3l-2 4M14 9h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8" },
  { title: "نيتروجين للدواليب", text: "تعبئة الإطارات بالنيتروجين لضغط أثبت لفترة أطول.", href: "/tips/tyre-nitrogen", cta: "شو بيفيد النيتروجين؟", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
];

const OILS = [
  { name: "ELF Evolution 700 STI 10W-40", type: "نصف تخليقي", text: "لمحركات البنزين والديزل العادية." },
  { name: "ELF Evolution 900 SXR 5W-40", type: "تخليقي بالكامل", text: "للمحركات الحديثة، ومنها اللي فيها تيربو." },
];

const TIPS = [
  {
    tag: "لمبات التابلو",
    href: "/tips/oil-warning-light",
    q: "ضوّت لمبة الزيت وإنت ماشي؟",
    a: "وقّف بأمان وطفّي الموتور. اللمبة الحمرا يعني ضغط الزيت واطي، والموتور ما عم يوصلو زيت كافي. شيك مستوى الزيت، ولا تكمّل سواقة قبل ما تعرف السبب.",
  },
  {
    tag: "الوقود",
    q: "عبّيت بنزين بسيارة ديزل أو العكس؟",
    a: "لا تشغّل الموتور أبداً. اسحب السيارة وفضّي الخزان. تشغيلة وحدة بتوصّل الوقود الغلط عالطرمبة والبخاخات.",
  },
  {
    tag: "الحرارة",
    q: "طلعت إبرة الحرارة عالأحمر؟",
    a: "وقّف بأمان وطفّي الموتور. لا تفتح غطا الرادياتير وهو سخن لأن المي تحت ضغط. استنّى يبرد، وبعدين شيك المي.",
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B4F9F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 flex flex-col gap-6">
            <span className="self-start bg-[#0B4F9F]/10 text-[#0B4F9F] border border-[#0B4F9F]/20 px-3 py-1 rounded-full text-xs font-extrabold">محطة A.Petroleum • المنية</span>
            <h1 className="text-3xl sm:text-5xl font-black leading-[1.3]">
              طاقتنا ما بتقطعك، <span className="text-[#0B4F9F]">نظافة من الخارج</span>{" "}
              <span className="underline decoration-[#F5B301] decoration-4 underline-offset-8">وقوة من الداخل.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-8">
              وقود IPT، توصيل مازوت التدفئة والغاز، زيوت ELF، غسيل VIP، شحن السيارات الكهربائية ونيتروجين للدواليب، ببقعة وحدة بالمنية.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#order" className="bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl">اطلب مازوت أو غاز</Link>
              <a href={`tel:${PHONE_E164}`} className="border-2 border-[#0B4F9F] text-[#0B4F9F] font-extrabold px-6 py-3 rounded-xl">اتصل: <span className="num">{PHONE_DISPLAY}</span></a>
            </div>
            <Showcase />
          </div>
          <div className="lg:col-span-5 flex">
            <PriceBoard />
          </div>
        </div>
      </section>

      <section id="services" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-black mb-6">خدماتنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <article key={s.title} className={`rounded-2xl p-6 border flex flex-col gap-3 ${s.highlight ? "bg-amber-50 border-[#F5B301] border-2" : "bg-white border-slate-200"}`}>
                <span className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center"><Icon d={s.icon} /></span>
                <h3 className="text-xl font-black">{s.title}</h3>
                <p className="text-slate-600 leading-7 flex-1">{s.text}</p>
                <a href={s.href} {...(external ? { target: "_blank", rel: "noopener" } : {})} className="font-extrabold text-[#0B4F9F] hover:underline">{s.cta}</a>
              </article>
            );
          })}
        </div>
      </section>

      <section id="order" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-[#0B2545] text-white rounded-[28px] p-6 sm:p-10 grid gap-8 lg:grid-cols-2 items-start">
          <div className="space-y-4">
            <span className="text-[#F5B301] font-extrabold text-sm">طلب سريع</span>
            <h2 className="text-2xl sm:text-4xl font-black leading-[1.4]">الشتوية وصلت؟ اطلب مازوت التدفئة أو الغاز بدقيقة</h2>
            <p className="text-slate-300 leading-8">عبّي الطلب، بيوصلنا عالواتساب مباشرة، ومنتصل فيك نأكد الكمية والسعر والموعد.</p>
            <ol className="space-y-2 text-slate-200">
              <li>١. اختار مازوت أو غاز</li>
              <li>٢. اكتب العنوان والوقت اللي بيناسبك</li>
              <li>٣. منأكد معك عالواتساب</li>
            </ol>
          </div>
          <OrderForm />
        </div>
      </section>

      <section id="oils" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200">
          <span className="text-[#0B4F9F] font-extrabold text-xs tracking-wider">ELF • POWER IN MOTION</span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1 mb-6">زيوت ELF وتغيير الزيت</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OILS.map((o) => (
              <div key={o.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 dir="ltr" className="text-xl font-black text-right">{o.name}</h3>
                <p className="text-sm font-bold text-[#0B4F9F] mt-1">{o.type}</p>
                <p className="text-slate-600 mt-2">{o.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-600 leading-8">
            الزيت الصح مش الأتخن، الصح هو اللي بيطلبه موتور سيارتك حسب الكتيّب. مش متأكد؟{" "}
            <a href={waLink("مرحبا A.Petroleum، شو الزيت المناسب لسيارتي؟ النوع والسنة:")} target="_blank" rel="noopener" className="font-extrabold text-[#0B4F9F] underline">ابعتلنا نوع سيارتك وسنتها</a>.
          </p>
        </div>
      </section>

      <section id="tips" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-black mb-6">نصائح بتوفّر عليك</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIPS.map((t) => (
            <article key={t.q} className="rounded-2xl bg-[#0B2545] text-white p-6 space-y-3">
              <span className="text-[#F5B301] text-xs font-extrabold">{t.tag}</span>
              <h3 className="text-xl font-black leading-8">{t.q}</h3>
              <p className="text-slate-200 leading-8">{t.a}</p>
              {"href" in t && t.href && (
                <Link href={t.href} className="inline-block font-extrabold text-[#F5B301] hover:underline">اقرأ أكتر</Link>
              )}
            </article>
          ))}
        </div>
        <Link href="/tips" className="inline-block mt-6 font-extrabold text-[#0B4F9F] hover:underline">كل النصائح: الزيت، البنزين 95 أو 98، مازوت التدفئة والدواليب</Link>
      </section>

      <section id="contact" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black">زورونا بالمنية</h2>
            <p className="text-slate-600">{ADDRESS_AR}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={MAPS_URL} target="_blank" rel="noopener" className="bg-[#0B4F9F] text-white font-extrabold px-5 py-3 rounded-xl">خدني عالمحطة</a>
              <a href={`tel:${PHONE_E164}`} className="border-2 border-[#0B4F9F] text-[#0B4F9F] font-extrabold px-5 py-2.5 rounded-xl">اتصل: <span className="num">{PHONE_DISPLAY}</span></a>
              <a href={waLink("مرحبا A.Petroleum")} target="_blank" rel="noopener" className="bg-[#F5B301] text-slate-950 font-extrabold px-5 py-3 rounded-xl">واتساب</a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/station-night.jpg" alt="محطة A.Petroleum بالمنية بالليل" className="w-full h-64 object-cover rounded-2xl" />
        </div>
      </section>
    </>
  );
}
