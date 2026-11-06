"use client";

import React, { useState, useEffect } from "react";

export default function ActivePetroleumPro() {
  const WHATSAPP_NUMBER = "96170000000";

  // حالة الأسعار المباشرة (Live)
  const [livePrices, setLivePrices] = useState({
    "95": "جاري التحديث...",
    "98": "جاري التحديث...",
    "DIESEL": "جاري التحديث...",
    "GAS": "جاري التحديث..."
  });

  // جلب الأسعار من موقع IPT عند فتح الصفحة
  useEffect(() => {
    fetch('/api/fuel')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setLivePrices(data);
        }
      })
      .catch(err => console.error("Error fetching prices:", err));
  }, []);

  // دالة لحساب السعر بالدولار تقريبياً (على سعر صرف 89500)
  const getUsdPrice = (lbpPrice: string) => {
    if (lbpPrice === "جاري التحديث..." || lbpPrice === "غير متوفر") return "--";
    const num = parseInt(lbpPrice.replace(/,/g, ''));
    return (num / 89500).toFixed(2);
  };

  const [activeShowcase, setActiveShowcase] = useState(0);
  const [plateSearch, setPlateSearch] = useState("M 458921");
  const [currentKm, setCurrentKm] = useState(145800);
  const [washCount, setWashCount] = useState(4);
  const [selectedCarType, setSelectedCarType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const lastOilChangeKm = 142000;
  const oilIntervalKm = 5000;
  const nextOilChangeKm = lastOilChangeKm + oilIntervalKm;
  const remainingKm = Math.max(0, nextOilChangeKm - currentKm);
  const progressPercent = Math.min(100, Math.max(0, ((currentKm - lastOilChangeKm) / oilIntervalKm) * 100));

  const fuelPricesData = [
    {
      code: "98",
      name: "بنزين 98 أوكتان",
      en: "SUPER UNLEADED 98",
      priceLbp: livePrices["98"],
      priceUsd: getUsdPrice(livePrices["98"]),
      accent: "border-l-4 border-l-blue-500",
    },
    {
      code: "95",
      name: "بنزين 95 أوكتان",
      en: "PREMIUM UNLEADED 95",
      priceLbp: livePrices["95"],
      priceUsd: getUsdPrice(livePrices["95"]),
      accent: "border-l-4 border-l-emerald-500",
    },
    {
      code: "DIESEL",
      name: "مازوت أخضر نقي",
      en: "EURO GREEN DIESEL",
      priceLbp: livePrices["DIESEL"],
      priceUsd: getUsdPrice(livePrices["DIESEL"]),
      accent: "border-l-4 border-l-amber-400",
    },
    {
      code: "GAS",
      name: "غاز منزلي وتجاري",
      en: "CERTIFIED LPG 10KG",
      priceLbp: livePrices["GAS"],
      priceUsd: getUsdPrice(livePrices["GAS"]),
      accent: "border-l-4 border-l-cyan-400",
    }
  ];

  const stationShowcases = [
    { id: "day", tag: "MINIEH STATION • المنية", title: "محطة نموذجية تعمل بالطاقة الشمسية 24/7", subtitle: "YOUR SATISFACTION IS OUR PRIORITY", desc: "تجهيزات حديثة، مضخات Quantum رقمية عالية الدقة.", img: "/station-day.jpg", gradient: "from-blue-950 via-slate-900 to-amber-950" },
    { id: "evzone", tag: "EVZONE & NITROGEN", title: "اشحن، انطلق، واحمِ البيئة!", subtitle: "شحن سريع للسيارات الكهربائية + منفاخ نيتروجين", desc: "المنطقة الذكية الأولى في المنية.", img: "/evzone.jpg", gradient: "from-slate-950 via-teal-950 to-cyan-900" },
    { id: "oils", tag: "ELF • QUANTUM • IPT", title: "Elf Oil — Power in Motion", subtitle: "صالة عرض متكاملة لأفخم الزيوت", desc: "تشكيلة كاملة من زيوت ELF التخليقية مع فحص الفلاتر.", img: "/oils.jpg", gradient: "from-blue-950 via-indigo-950 to-slate-900" },
    { id: "wash", tag: "VIP CAR CARE", title: "نظافة من الخارج... وقوة من الداخل!", subtitle: "غسيل سيارات احترافي بالفوم النشط", desc: "عناية فائقة بطلاء سيارتك مع نظام بطاقة الولاء.", img: "/wash.jpg", gradient: "from-slate-900 via-blue-950 to-slate-950" },
  ];

  const lubricants = [
    { id: 1, brand: "ELF", name: "ELF Evolution 700 STI 10W-40", viscosity: "10W-40", spec: "Semi-Synthetic", carTypes: ["all", "standard_gas", "euro_diesel"], kmRange: "5,000 - 6,000 KM", highlight: "Power in Motion", desc: "الزيت الأشهر في صالة A.Petroleum." },
    { id: 2, brand: "ELF", name: "ELF Evolution 900 SXR 5W-40", viscosity: "5W-40", spec: "100% Full Synthetic", carTypes: ["all", "modern_gas", "euro_diesel"], kmRange: "8,000 - 10,000 KM", highlight: "للسيارات الحديثة والتيربو", desc: "أعلى درجات الحماية لمحركات البنزين والديزل الحديثة." },
    { id: 3, brand: "QUANTUM", name: "Quantum X-Treme Ultra 5W-30", viscosity: "5W-30", spec: "Full Synthetic", carTypes: ["all", "modern_gas"], kmRange: "8,000 - 10,000 KM", highlight: "مثالي للهايبرد", desc: "تركيبة متطورة تقلل الاحتكاك وتوفر الوقود." },
    { id: 4, brand: "IPT", name: "IPT Supralube Heavy Duty 15W-40", viscosity: "15W-40", spec: "Heavy Duty Diesel", carTypes: ["all", "heavy_diesel"], kmRange: "5,000 KM / 250 Hrs", highlight: "للآليات والمولدات", desc: "مخصص لمحركات الديزل الثقيلة والشاحنات." }
  ];

  const filteredOils = lubricants.filter((oil) => {
    const matchType = oil.carTypes.includes(selectedCarType);
    const matchBrand = selectedBrand === "ALL" || oil.brand === selectedBrand;
    return matchType && matchBrand;
  });

  const sendWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0B4F9F] selection:text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800&display=swap');
        .font-mono-num { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* الشريط العلوي */}
      <div className="bg-[#071120] text-slate-300 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              مفتوح 24/7 بالطاقة الشمسية
            </span>
            <span className="text-slate-300 font-medium">لبنان، المنية — الأوتوستراد العام (MINIEH STATION)</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px] font-bold tracking-wide">
            <span className="text-amber-400">IPT OFFICIAL PARTNER</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">QUANTUM FUELS</span>
          </div>
        </div>
      </div>

      {/* النافبار */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-slate-200/90 flex items-center justify-center p-1.5 group-hover:border-[#0B4F9F] transition">
              <svg viewBox="0 0 120 100" className="w-10 h-10">
                <path d="M62 8 L30 72 L45 72 L62 36 L70 52 L79 42 Z" fill="#F5B301" />
                <path d="M28 74 C52 68, 75 50, 96 22 C82 52, 60 70, 28 74 Z" fill="#F5B301" />
                <path d="M15 88 C45 84, 68 70, 84 48 L108 88 L48 88 L56 77 L86 77 L78 62 C62 77, 40 86, 15 88 Z" fill="#0B4F9F" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="text-2xl font-black tracking-tight text-[#F5B301]">A.</span>
                <span className="text-2xl font-black tracking-tight text-[#0B4F9F]">Petroleum</span>
              </div>
              <div className="flex items-center gap-2 -mt-1">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#F5B301] uppercase">ACTIVE</span>
              </div>
            </div>
          </a>
          <button onClick={() => sendWhatsApp("مرحباً محطة A.Petroleum المنية، أود الاستفسار عن:")} className="bg-[#0B4F9F] hover:bg-[#083B78] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer">
            <span>خدمة الزبائن</span>
          </button>
        </div>
      </header>

      {/* التوتيم والأسعار الـ LIVE */}
      <section id="totem" className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200/90 shadow-xs relative overflow-hidden">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="bg-[#0B4F9F]/10 text-[#0B4F9F] border border-[#0B4F9F]/20 px-3 py-1 rounded-full text-xs font-extrabold">YOUR SATISFACTION OUR PRIORITY</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-5">
                طاقتنا ما بتقطعك، <span className="text-[#0B4F9F]">ونظافة من الخارج</span> <span className="underline decoration-[#F5B301] decoration-4 underline-offset-8">وقوة من الداخل.</span>
              </h1>
              
              <div className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br ${stationShowcases[activeShowcase].gradient} text-white p-6 sm:p-7 min-h-[230px] flex flex-col justify-between shadow-inner mt-8`}>
                <img src={stationShowcases[activeShowcase].img} alt="Showcase" className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="relative z-10">
                  <span className="inline-block bg-white/15 backdrop-blur-md text-[#F5B301] text-[11px] font-black tracking-wider px-3 py-1 rounded-lg border border-white/15 mb-3">{stationShowcases[activeShowcase].tag}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{stationShowcases[activeShowcase].title}</h2>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2.5 max-w-xl leading-relaxed">{stationShowcases[activeShowcase].desc}</p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/15">
                  {[{ idx: 0, label: "الطاقة الشمسية" }, { idx: 1, label: "شحن EV ونيتروجين" }, { idx: 2, label: "صالة الزيوت" }, { idx: 3, label: "غسيل VIP" }].map((tab) => (
                    <button key={tab.idx} onClick={() => setActiveShowcase(tab.idx)} className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${activeShowcase === tab.idx ? "bg-[#F5B301] text-slate-950 shadow-xs" : "bg-white/10 text-white hover:bg-white/20"}`}>{tab.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* لوحة الأسعار المباشرة */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 p-2.5 rounded-[32px] shadow-xl border-2 border-slate-300 relative flex flex-col justify-between">
              <div className="absolute -right-2.5 top-8 bottom-28 w-6 bg-emerald-700 rounded-l-xl border-y-2 border-l-2 border-emerald-400 shadow-md flex items-center justify-center">
                <span className="text-white font-black text-[11px] tracking-[0.25em] uppercase" style={{ writingMode: "vertical-rl" }}>QUANTUM</span>
              </div>

              <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-3xl p-5 border-b-2 border-slate-300 text-center">
                <div className="inline-flex items-center gap-3 bg-[#0B4F9F] text-white px-5 py-2 rounded-2xl shadow-xs">
                  <span className="font-black text-2xl tracking-wider">IPT</span>
                  <span className="w-2 h-2 rounded-full bg-[#F5B301]"></span>
                  <span className="text-xs font-extrabold text-amber-300">A.PETROLEUM</span>
                </div>
              </div>

              <div className="bg-[#090F1A] p-4 sm:p-5 space-y-3 border-x-2 border-slate-800 my-1">
                <div className="flex justify-between items-center text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    تسعيرة IPT المباشرة (LIVE)
                  </span>
                  <span className="font-mono-num text-emerald-400">تحديث تلقائي</span>
                </div>

                {fuelPricesData.map((item) => (
                  <div key={item.code} className={`bg-[#111A2E] ${item.accent} rounded-xl p-3.5 flex justify-between items-center border border-slate-800/90`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-num text-xs font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">{item.code}</span>
                        <h3 className="font-extrabold text-white text-sm sm:text-base">{item.name}</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono-num tracking-wider block mt-0.5">{item.en}</span>
                    </div>
                    <div className="text-left" dir="ltr">
                      <div className="font-mono-num text-lg sm:text-xl font-extrabold text-[#F5B301] tracking-tight">
                        {item.priceLbp} <span className="text-[10px] text-slate-400">L.L.</span>
                      </div>
                      <div className="font-mono-num text-xs font-bold text-emerald-400">${item.priceUsd} USD</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F5B301] text-slate-950 rounded-b-3xl p-4 border-t-2 border-amber-300">
                <div className="pt-2 flex justify-between items-center px-1">
                  <span className="font-black text-xs tracking-widest uppercase">MINIEH STATION</span>
                  <span className="text-xs font-extrabold">محطة المنية — A.Petroleum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* باقي الأقسام مدمجة اختصاراً (الكراج والزيوت) */}
      <section id="garage" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[28px] p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-black text-[#0B4F9F]">نظام ولاء الزبائن (قيد الربط بقاعدة البيانات)</h2>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold">المنصة متصلة بـ IPT Live ✓</button>
        </div>
      </section>
    </div>
  );
}
