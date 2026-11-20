"use client";

import { useState } from "react";

const SLIDES = [
  {
    tab: "المحطة",
    tag: "MINIEH STATION • المنية",
    title: "محطة IPT حديثة بالمنية",
    desc: "مضخات Quantum وخدمة سريعة، وصهاريج لتوصيل المازوت للبيوت والمؤسسات.",
    img: "/station-day.jpg",
    alt: "محطة A.Petroleum بالمنية بالنهار",
    gradient: "from-blue-950 via-slate-900 to-amber-950",
  },
  {
    tab: "شحن EV ونيتروجين",
    tag: "EVZONE & NITROGEN",
    title: "اشحن سيارتك الكهربائية، وعبّي دواليبك نيتروجين",
    desc: "شواحن EVZONE للسيارات الكهربائية، وتعبئة الإطارات بالنيتروجين لضغط أثبت.",
    img: "/evzone.jpg",
    alt: "شاحن سيارات كهربائية بمحطة A.Petroleum",
    gradient: "from-slate-950 via-teal-950 to-cyan-900",
  },
  {
    tab: "صالة الزيوت",
    tag: "ELF LUBRICANTS",
    title: "زيوت ELF وتبديل الفلاتر",
    desc: "تغيير زيت وفلتر بالدرجة اللي بيطلبها موتور سيارتك.",
    img: "/oils.jpg",
    alt: "صالة زيوت ELF بالمحطة",
    gradient: "from-blue-950 via-indigo-950 to-slate-900",
  },
  {
    tab: "غسيل VIP",
    tag: "VIP CAR CARE",
    title: "نظافة من الخارج… وقوة من الداخل",
    desc: "غسيل عادي، غسيل ورافع من تحت، غسيل مع موتور، وغسيل VIP شامل.",
    img: "/wash.jpg",
    alt: "غسيل سيارات VIP بمحطة A.Petroleum",
    gradient: "from-slate-900 via-blue-950 to-slate-950",
  },
];

export default function Showcase() {
  const [i, setI] = useState(0);
  const s = SLIDES[i];
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${s.gradient} text-white p-6 sm:p-7 min-h-[240px] flex flex-col justify-between`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none" />
      <div className="relative z-10">
        <span className="inline-block bg-white/15 text-[#F5B301] text-[11px] font-black tracking-wider px-3 py-1 rounded-lg border border-white/15 mb-3">{s.tag}</span>
        <h2 className="text-xl sm:text-2xl font-black">{s.title}</h2>
        <p className="text-sm text-slate-200 mt-2.5 max-w-xl leading-7">{s.desc}</p>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/15" role="tablist" aria-label="خدمات المحطة">
        {SLIDES.map((t, idx) => (
          <button
            key={t.tab}
            type="button"
            role="tab"
            aria-selected={i === idx}
            onClick={() => setI(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${i === idx ? "bg-[#F5B301] text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            {t.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
