"use client";

import React, { useState } from "react";

export default function ActivePetroleumPro() {
  const WHATSAPP_NUMBER = "96170000000";

  // حالة معرض الصور التفاعلي للمحطة
  const [activeShowcase, setActiveShowcase] = useState(0);

  // حالة كراج الزبون وتتبع الزيت
  const [plateSearch, setPlateSearch] = useState("M 458921");
  const [currentKm, setCurrentKm] = useState(145800);
  const lastOilChangeKm = 142000;
  const oilIntervalKm = 5000;
  const nextOilChangeKm = lastOilChangeKm + oilIntervalKm;
  const remainingKm = Math.max(0, nextOilChangeKm - currentKm);
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentKm - lastOilChangeKm) / oilIntervalKm) * 100)
  );

  // حالة بطاقة ولاء الغسيل
  const [washCount, setWashCount] = useState(4);

  // حالة مستشار الزيوت
  const [selectedCarType, setSelectedCarType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  // بيانات التوتيم الحقيقي للمحطة
  const fuelPrices = [
    {
      code: "98",
      name: "بنزين 98 أوكتان",
      en: "SUPER UNLEADED 98",
      priceLbp: "1,525,000",
      priceUsd: "17.05",
      badge: "QUANTUM",
      accent: "border-l-4 border-l-blue-500",
    },
    {
      code: "95",
      name: "بنزين 95 أوكتان",
      en: "PREMIUM UNLEADED 95",
      priceLbp: "1,485,000",
      priceUsd: "16.60",
      badge: "QUANTUM",
      accent: "border-l-4 border-l-emerald-500",
    },
    {
      code: "DIESEL",
      name: "مازوت أخضر نقي",
      en: "EURO GREEN DIESEL",
      priceLbp: "1,310,000",
      priceUsd: "14.65",
      badge: "توصيل 24/7",
      accent: "border-l-4 border-l-amber-400",
    },
    {
      code: "GAS",
      name: "غاز منزلي وتجاري",
      en: "CERTIFIED LPG 10KG",
      priceLbp: "980,000",
      priceUsd: "10.95",
      badge: "مفحوص",
      accent: "border-l-4 border-l-cyan-400",
    },
  ];

  // مشاهد المحطة الحقيقية (تعمل بالصور المرفوعة مع خلفية احتياطية فخمة)
  const stationShowcases = [
    {
      id: "day",
      tag: "MINIEH STATION • المنية",
      title: "محطة نموذجية تعمل بالطاقة الشمسية 24/7",
      subtitle: "YOUR SATISFACTION IS OUR PRIORITY — رضاكم أولويتنا دائماً",
      desc: "تجهيزات حديثة، مضخات Quantum رقمية عالية الدقة، وصهاريج IPT مجهزة لتلبية المنازل والمؤسسات في المنية والشمال.",
      img: "/station-day.jpg",
      gradient: "from-blue-950 via-slate-900 to-amber-950",
    },
    {
      id: "evzone",
      tag: "EVZONE & NITROGEN • طاقتنا ما بتقطعك",
      title: "اشحن، انطلق، واحمِ البيئة!",
      subtitle: "شحن سريع للسيارات الكهربائية + منفاخ نيتروجين للإطارات",
      desc: "المنطقة الذكية الأولى في المنية: شواحن EVZONE المتطورة وتعبئة الإطارات بغاز النيتروجين النقي لثبات أعلى وتوفير في استهلاك الوقود.",
      img: "/evzone.jpg",
      gradient: "from-slate-950 via-teal-950 to-cyan-900",
    },
    {
      id: "oils",
      tag: "ELF • QUANTUM • IPT LUBRICANTS",
      title: "Elf Oil — Power in Motion",
      subtitle: "صالة عرض متكاملة لأفخم الزيوت الفرنسية والعالمية",
      desc: "تشكيلة كاملة من زيوت ELF Evolution 700 STI 10W-40 و900 SXR التخليقية بالكامل مع فحص وتبديل الفلاتر بإشراف فنيين مختصين.",
      img: "/oils.jpg",
      gradient: "from-blue-950 via-indigo-950 to-slate-900",
    },
    {
      id: "wash",
      tag: "VIP CAR CARE • العناية بالسيارات",
      title: "نظافة من الخارج... وقوة من الداخل!",
      subtitle: "غسيل سيارات احترافي بالفوم النشط والماء المفلتر",
      desc: "عناية فائقة بطلاء سيارتك والجنوط والمقصورة الداخلية مع نظام بطاقة الولاء الرقمية (5 غسلات والسادسة مجاناً).",
      img: "/wash.jpg",
      gradient: "from-slate-900 via-blue-950 to-slate-950",
    },
  ];

  // قاعدة بيانات الزيوت من صالة العرض
  const lubricants = [
    {
      id: 1,
      brand: "ELF",
      name: "ELF Evolution 700 STI 10W-40",
      viscosity: "10W-40",
      spec: "Semi-Synthetic • تكنولوجيا فرنسية",
      carTypes: ["all", "standard_gas", "euro_diesel"],
      kmRange: "5,000 - 6,000 KM",
      highlight: "Power in Motion • الأكثر مبيعاً",
      desc: "الزيت الأشهر في صالة A.Petroleum، مصمم لحماية المحركات في ظروف القيادة اليومية والحرارة العالية بنظافة فائقة.",
    },
    {
      id: 2,
      brand: "ELF",
      name: "ELF Evolution 900 SXR 5W-40",
      viscosity: "5W-40",
      spec: "100% Full Synthetic • تخليقي بالكامل",
      carTypes: ["all", "modern_gas", "euro_diesel"],
      kmRange: "8,000 - 10,000 KM",
      highlight: "للسيارات الحديثة والتيربو",
      desc: "أعلى درجات الحماية لمحركات البنزين والديزل الحديثة المزودة بشاحن تيربو مع ثبات استثنائي للزوجة.",
    },
    {
      id: 3,
      brand: "QUANTUM",
      name: "Quantum X-Treme Ultra 5W-30",
      viscosity: "5W-30",
      spec: "Full Synthetic • توفير الوقود",
      carTypes: ["all", "modern_gas"],
      kmRange: "8,000 - 10,000 KM",
      highlight: "مثالي للهايبرد والحديث",
      desc: "تركيبة متطورة تقلل الاحتكاك الداخلي للمحرك وتمنح انطلاقة سلسة وتوفيراً ملموساً في استهلاك البنزين.",
    },
    {
      id: 4,
      brand: "IPT",
      name: "IPT Supralube Heavy Duty 15W-40",
      viscosity: "15W-40",
      spec: "Heavy Duty Diesel & Fleet",
      carTypes: ["all", "heavy_diesel"],
      kmRange: "5,000 KM / 250 Hrs",
      highlight: "للآليات والمولدات الكهربائية",
      desc: "مخصص لمحركات الديزل الثقيلة، الشاحنات، البيك أب، والمولدات التي تعمل لساعات طويلة تحت الضغط.",
    },
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
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0B4F9F] selection:text-white"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      {/* استيراد الخطوط الاحترافية مباشرة */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800&display=swap');
        .font-mono-num { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* الشريط العلوي المعماري */}
      <div className="bg-[#071120] text-slate-300 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              مفتوح 24/7 بالطاقة الشمسية
            </span>
            <span className="text-slate-300 font-medium">
              لبنان، المنية — الأوتوستراد العام (MINIEH STATION)
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] font-bold tracking-wide">
            <span className="text-amber-400">IPT OFFICIAL PARTNER</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">QUANTUM FUELS</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400">ELF LUBRICANTS</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">EVZONE CHARGING</span>
          </div>
        </div>
      </div>

      {/* النافبار الرئيسي مع الشعار الهندسي الأصلي */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          {/* الشعار الهندسي المطابق للصورة الأصلية */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-slate-200/90 flex items-center justify-center p-1.5 group-hover:border-[#0B4F9F] transition">
              <svg viewBox="0 0 120 100" className="w-10 h-10">
                {/* القمة الصفراء العلوية */}
                <path
                  d="M62 8 L30 72 L45 72 L62 36 L70 52 L79 42 Z"
                  fill="#F5B301"
                />
                {/* القوس الأصفر الصاعد */}
                <path
                  d="M28 74 C52 68, 75 50, 96 22 C82 52, 60 70, 28 74 Z"
                  fill="#F5B301"
                />
                {/* المثلث الأزرق السفلي */}
                <path
                  d="M15 88 C45 84, 68 70, 84 48 L108 88 L48 88 L56 77 L86 77 L78 62 C62 77, 40 86, 15 88 Z"
                  fill="#0B4F9F"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="text-2xl font-black tracking-tight text-[#F5B301]">
                  A.
                </span>
                <span className="text-2xl font-black tracking-tight text-[#0B4F9F]">
                  Petroleum
                </span>
              </div>
              <div className="flex items-center gap-2 -mt-1">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#F5B301] uppercase">
                  ACTIVE
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-bold text-slate-600">
                  محطة المنية النموذجية
                </span>
              </div>
            </div>
          </a>

          {/* روابط التنقل المدروسة */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70 text-xs font-extrabold text-slate-700">
            <a
              href="#totem"
              className="px-4 py-2 rounded-xl bg-white text-[#0B4F9F] shadow-2xs"
            >
              التوتيم والأسعار
            </a>
            <a
              href="#evzone"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-teal-700 transition"
            >
              شحن EV والنيتروجين
            </a>
            <a
              href="#garage"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-[#0B4F9F] transition"
            >
              عدّاد الزيت وولاء الغسيل
            </a>
            <a
              href="#lubricants"
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-[#0B4F9F] transition"
            >
              صالة زيوت ELF & IPT
            </a>
          </nav>

          {/* زر التواصل الفوري */}
          <button
            onClick={() =>
              sendWhatsApp("مرحباً محطة A.Petroleum المنية، أود الاستفسار عن:")
            }
            className="bg-[#0B4F9F] hover:bg-[#083B78] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <span>خدمة الزبائن</span>
            <span className="bg-[#F5B301] text-slate-950 font-black px-2 py-0.5 rounded-md text-[11px]">
              24/7
            </span>
          </button>
        </div>
      </header>

      {/* القسم الأول: الواجهة المعمارية + التوتيم الحقيقي لمحطة المنية */}
      <section id="totem" className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* العمود الأيمن: العرض البصري والهوية (7 أعمدة) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200/90 shadow-xs relative overflow-hidden">
            {/* خلفية هندسية خفيفة جداً */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0B4F9F]/5 blur-3xl pointer-events-none"></div>

            <div>
              {/* شريط الهوية */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="bg-[#0B4F9F]/10 text-[#0B4F9F] border border-[#0B4F9F]/20 px-3 py-1 rounded-full text-xs font-extrabold">
                  YOUR SATISFACTION OUR PRIORITY
                </span>
                <span className="bg-amber-500/15 text-amber-800 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-extrabold">
                  محطة المنية • MINIEH STATION
                </span>
              </div>

              {/* العنوان الرئيسي المدروس حرفياً */}
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-5">
                طاقتنا ما بتقطعك،{" "}
                <span className="text-[#0B4F9F]">ونظافة من الخارج</span>{" "}
                <span className="underline decoration-[#F5B301] decoration-4 underline-offset-8">
                  وقوة من الداخل.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-medium">
                مرحباً بك في المنصة الرقمية الرسمية لمحطة{" "}
                <strong className="text-slate-900">A.Petroleum المنية</strong>.
                وقود <strong className="text-emerald-700">Quantum</strong> النقي،
                صالة زيوت <strong className="text-[#0B4F9F]">ELF & IPT</strong>{" "}
                الأصلية، محطة شحن <strong className="text-teal-700">EVZONE</strong>{" "}
                للهايبرد والكهرباء، وتعبئة النيتروجين للإطارات.
              </p>

              {/* بطاقة عرض مشاهد المحطة الحقيقية (تعمل بالصور أو التدرج المعماري) */}
              <div
                className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br ${stationShowcases[activeShowcase].gradient} text-white p-6 sm:p-7 min-h-[230px] flex flex-col justify-between shadow-inner`}
              >
                {/* إذا تم رفع الصورة في مجلد public ستظهر هنا بشفافية مدروسة */}
                <img
                  src={stationShowcases[activeShowcase].img}
                  alt={stationShowcases[activeShowcase].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-block bg-white/15 backdrop-blur-md text-[#F5B301] text-[11px] font-black tracking-wider px-3 py-1 rounded-lg border border-white/15 mb-3">
                    {stationShowcases[activeShowcase].tag}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {stationShowcases[activeShowcase].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-300 font-bold mt-1">
                    {stationShowcases[activeShowcase].subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2.5 max-w-xl leading-relaxed">
                    {stationShowcases[activeShowcase].desc}
                  </p>
                </div>

                {/* أزرار التبديل بين أقسام المحطة بالصور */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/15">
                  {[
                    { idx: 0, label: "المحطة والطاقة الشمسية" },
                    { idx: 1, label: "شحن EVZONE والنيتروجين" },
                    { idx: 2, label: "صالة زيوت ELF" },
                    { idx: 3, label: "غسيل VIP" },
                  ].map((tab) => (
                    <button
                      key={tab.idx}
                      onClick={() => setActiveShowcase(tab.idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                        activeShowcase === tab.idx
                          ? "bg-[#F5B301] text-slate-950 shadow-xs"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* أزرار الإجراءات السريعة أسفل البطاقة */}
            <div className="mt-7 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#garage"
                  className="bg-[#0B4F9F] hover:bg-[#083B78] text-white font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm transition shadow-xs"
                >
                  افتح سجل سيارتك وبطاقة الغسيل
                </a>
                <button
                  onClick={() =>
                    sendWhatsApp(
                      "مرحباً محطة A.Petroleum المنية، أرغب بطلب توصيل مازوت بصهريج المحطة المجهز:"
                    )
                  }
                  className="bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer"
                >
                  اطلب صهريج المازوت (IPT)
                </button>
              </div>
              <div className="text-xs text-slate-500 font-bold">
                كفالة نقاوة وعيار إلكتروني 100%
              </div>
            </div>
          </div>

          {/* العمود الأيسر: محاكاة التوتيم الحقيقي لمحطة المنية (5 أعمدة) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 p-2.5 rounded-[32px] shadow-xl border-2 border-slate-300 relative flex flex-col justify-between">
              {/* شريط QUANTUM الأخضر الجانبي تماماً مثل التوتيم الحقيقي بالصورة */}
              <div className="absolute -right-2.5 top-8 bottom-28 w-6 bg-emerald-700 rounded-l-xl border-y-2 border-l-2 border-emerald-400 shadow-md flex items-center justify-center">
                <span
                  className="text-white font-black text-[11px] tracking-[0.25em] uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  QUANTUM
                </span>
              </div>

              {/* رأس التوتيم: IPT + ELF Lubricants */}
              <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-3xl p-5 border-b-2 border-slate-300 text-center">
                <div className="inline-flex items-center gap-3 bg-[#0B4F9F] text-white px-5 py-2 rounded-2xl shadow-xs">
                  <span className="font-black text-2xl tracking-wider">IPT</span>
                  <span className="w-2 h-2 rounded-full bg-[#F5B301]"></span>
                  <span className="text-xs font-extrabold text-amber-300">
                    A.PETROLEUM
                  </span>
                </div>
                <div className="mt-2.5 bg-slate-900 text-white py-1.5 px-4 rounded-xl inline-flex items-center gap-2 border border-slate-700">
                  <span className="font-black text-sm tracking-wide text-blue-400">
                    elf
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-[11px] font-bold text-slate-300 uppercase">
                    Lubricants Center
                  </span>
                </div>
              </div>

              {/* شاشة أسعار الـ LED الرقمية */}
              <div className="bg-[#090F1A] p-4 sm:p-5 space-y-3 border-x-2 border-slate-800 my-1">
                <div className="flex justify-between items-center text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-bold text-amber-400">
                    ● تسعيرة المحروقات الرسمية اليوم
                  </span>
                  <span className="font-mono-num">20 LITERS</span>
                </div>

                {fuelPrices.map((item) => (
                  <div
                    key={item.code}
                    className={`bg-[#111A2E] ${item.accent} rounded-xl p-3.5 flex justify-between items-center border border-slate-800/90`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-num text-xs font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <h3 className="font-extrabold text-white text-sm sm:text-base">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono-num tracking-wider block mt-0.5">
                        {item.en}
                      </span>
                    </div>

                    <div className="text-left" dir="ltr">
                      <div className="font-mono-num text-lg sm:text-xl font-extrabold text-[#F5B301] tracking-tight">
                        {item.priceLbp}{" "}
                        <span className="text-[10px] text-slate-400">LBP</span>
                      </div>
                      <div className="font-mono-num text-xs font-bold text-emerald-400">
                        ${item.priceUsd} USD
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* اللوحة الصفراء السفلية المطابقة للتوتيم الحقيقي (GAS | WASH | OIL + MINIEH STATION) */}
              <div className="bg-[#F5B301] text-slate-950 rounded-b-3xl p-4 border-t-2 border-amber-300">
                <div className="grid grid-cols-4 gap-2 text-center pb-3 border-b border-slate-950/15">
                  <div className="bg-slate-950/10 rounded-xl py-2 px-1">
                    <span className="block font-black text-xs">GAS</span>
                    <span className="text-[10px] font-bold">وقود وغاز</span>
                  </div>
                  <div className="bg-slate-950/10 rounded-xl py-2 px-1">
                    <span className="block font-black text-xs">WASH</span>
                    <span className="text-[10px] font-bold">غسيل VIP</span>
                  </div>
                  <div className="bg-slate-950/10 rounded-xl py-2 px-1">
                    <span className="block font-black text-xs">OIL</span>
                    <span className="text-[10px] font-bold">زيوت وفلاتر</span>
                  </div>
                  <div className="bg-slate-950 text-cyan-300 rounded-xl py-2 px-1">
                    <span className="block font-black text-xs">EV</span>
                    <span className="text-[10px] font-bold">شحن ونيتروجين</span>
                  </div>
                </div>
                <div className="pt-2.5 flex justify-between items-center px-1">
                  <span className="font-black text-xs tracking-widest uppercase">
                    MINIEH STATION
                  </span>
                  <span className="text-xs font-extrabold">
                    محطة المنية — A.Petroleum
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثاني الجديد كلياً: EVZONE & Nitrogen Air Pump (مستوحى من صورة المحطة الحقيقية) */}
      <section id="evzone" className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="rounded-[28px] bg-gradient-to-r from-[#06131F] via-[#092230] to-[#06131F] text-white p-6 sm:p-10 border-2 border-cyan-500/40 shadow-lg relative overflow-hidden">
          {/* خطوط إضاءة السقف Cyan LED المطابقة لصورة EVZONE */}
          <div className="absolute top-0 left-10 right-10 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 px-3.5 py-1 rounded-full text-xs font-extrabold mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>EVZONE • NITROGEN AIR PUMP</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
                طاقتنا ما بتقطعك..{" "}
                <span className="text-cyan-400">اشحن، انطلق، احمِ البيئة!</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                لأن محطة <strong>A.Petroleum المنية</strong> تواكب المستقبل، جهّزنا
                مساراً خاصاً بإضاءة الـ Cyan LED يضم أحدث نقاط شحن السيارات
                الكهربائية والهايبرد (<strong>EVZONE</strong>) إلى جانب جهاز تعبئة
                الإطارات بغاز النيتروجين النقي (<strong>Nitrogen Air Pump</strong>).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-cyan-400/25 rounded-2xl p-4">
                  <div className="text-cyan-400 font-black text-base mb-1">
                    ⚡ شحن كهربائي سريع (EVZONE)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    شواحن آمنة وعالية الكفاءة للسيارات الكهربائية والـ Plug-in
                    Hybrid مع استراحة مريحة في المحطة.
                  </p>
                </div>

                <div className="bg-white/5 border border-cyan-400/25 rounded-2xl p-4">
                  <div className="text-cyan-400 font-black text-base mb-1">
                    🛞 نيتروجين للإطارات (NITROGEN)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    يحافظ على ضغط الإطارات ثابتاً بالصيف والشتاء، يبرّد الإطار على
                    الأوتوستراد، ويوفر في استهلاك البنزين.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#040D16]/90 border border-cyan-500/30 rounded-3xl p-6 text-center flex flex-col justify-between">
              <div className="py-4">
                <div className="text-xs font-extrabold text-cyan-400 tracking-[0.2em] uppercase mb-2">
                  CLEAN ENERGY & TIRE CARE
                </div>
                <div className="text-3xl font-black text-white tracking-tight">
                  EV<span className="text-cyan-400">ZONE</span> & N₂
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  متوفر يومياً في محطة A.Petroleum المنية
                </p>
              </div>

              <button
                onClick={() =>
                  sendWhatsApp(
                    "مرحباً محطة A.Petroleum المنية، أود الاستفسار عن خدمة شحن السيارات الكهربائية (EVZONE) أو تعبئة النيتروجين للإطارات:"
                  )
                }
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-3.5 px-6 rounded-xl text-sm transition cursor-pointer shadow-md"
              >
                احجز نقطة شحن EV أو فحص نيتروجين الإطارات
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: كراج الزبون الذكي (عدّاد الزيت + بطاقة الغسيل الرقمية) */}
      <section id="garage" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#0B4F9F] font-extrabold text-xs uppercase tracking-wider">
              DIGITAL VEHICLE PASSPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              سجل سيارتك الرقمي وبطاقة ولاء الغسيل
            </h2>
          </div>

          {/* شريط إدخال رقم اللوحة التفاعلي */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-2xs">
            <span className="bg-[#0B4F9F] text-white text-xs font-black px-3 py-2 rounded-xl">
              لوحة السيارة (لبنان)
            </span>
            <input
              type="text"
              value={plateSearch}
              onChange={(e) => setPlateSearch(e.target.value)}
              dir="ltr"
              className="font-mono-num text-sm font-extrabold text-slate-900 px-3 py-1 w-32 text-center bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4F9F]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* بطاقة تتبع غيار الزيت والفلاتر */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <span className="bg-blue-50 text-[#0B4F9F] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200">
                    ELF / IPT LUBRICANT TRACKER
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    عدّاد كيلومترات غيار الزيت والفلاتر
                  </h3>
                </div>
                <div
                  className="bg-slate-900 text-white px-3.5 py-2 rounded-xl border-2 border-amber-400 text-center"
                  dir="ltr"
                >
                  <span className="text-[9px] text-amber-400 font-bold block">
                    LEBANON
                  </span>
                  <span className="font-mono-num text-sm font-extrabold">
                    {plateSearch}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center sm:text-right">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    الزيت المعتمد حالياً
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-[#0B4F9F]">
                    ELF 700 STI 10W-40
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    عداد آخر غيار
                  </span>
                  <strong
                    className="font-mono-num text-xs sm:text-sm font-extrabold text-slate-900"
                    dir="ltr"
                  >
                    {lastOilChangeKm.toLocaleString()} KM
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    حالة الفلاتر
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-emerald-700">
                    زيت + هواء مكفول ✓
                  </strong>
                </div>
              </div>

              {/* التحكم التفاعلي بالعداد */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                    حدّث عداد سيارتك الحالي لمعرفة المتبقي:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentKm((prev) => Math.max(lastOilChangeKm, prev - 500))
                      }
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 font-black text-slate-800 border border-slate-300 cursor-pointer"
                    >
                      -
                    </button>
                    <span
                      className="font-mono-num text-sm sm:text-base font-extrabold bg-amber-50 border-2 border-[#F5B301] text-slate-900 px-3.5 py-1 rounded-xl"
                      dir="ltr"
                    >
                      {currentKm.toLocaleString()} KM
                    </span>
                    <button
                      onClick={() => setCurrentKm((prev) => prev + 500)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 font-black text-slate-800 border border-slate-300 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      remainingKm <= 500
                        ? "bg-red-600"
                        : remainingKm <= 1200
                        ? "bg-[#F5B301]"
                        : "bg-emerald-600"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs font-extrabold mt-2.5">
                  <span className="text-slate-500">
                    موعد الغيار القادم:{" "}
                    <strong className="font-mono-num text-slate-900" dir="ltr">
                      {nextOilChangeKm.toLocaleString()} KM
                    </strong>
                  </span>
                  <span
                    className={
                      remainingKm <= 500 ? "text-red-600" : "text-emerald-700"
                    }
                  >
                    {remainingKm > 0
                      ? `متبقي ${remainingKm.toLocaleString()} كم للغيار`
                      : "حان موعد غيار الزيت في المحطة!"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                sendWhatsApp(
                  `مرحباً محطة A.Petroleum المنية، سيارة رقم (${plateSearch}) عدادها الحالي (${currentKm} كم). أود حجز غيار زيت مع فحص الفلاتر.`
                )
              }
              className="w-full bg-[#0B4F9F] hover:bg-[#083B78] text-white font-extrabold text-sm py-3.5 rounded-xl transition cursor-pointer"
            >
              احجز موعد غيار الزيت وتبديل الفلاتر عبر واتساب
            </button>
          </div>

          {/* بطاقة ولاء الغسيل المستوحاة من بوست المرسيدس */}
          <div className="bg-gradient-to-br from-[#0A192F] via-[#0B2545] to-[#071120] text-white rounded-[28px] p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-5">
                <div>
                  <span className="bg-[#F5B301] text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                    نظافة من الخارج... وقوة من الداخل!
                  </span>
                  <h3 className="text-xl font-black text-white mt-2.5">
                    بطاقة ولاء الغسيل الرقمية (VIP Wash)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    اجمع 5 أختام غسيل في محطة المنية واحصل على{" "}
                    <strong className="text-[#F5B301]">
                      الغسلة السادسة مجاناً بالكامل!
                    </strong>
                  </p>
                </div>
                <div className="bg-white/10 border border-white/15 px-4 py-2 rounded-2xl text-center">
                  <span className="font-mono-num text-2xl font-extrabold text-[#F5B301]">
                    {washCount}/5
                  </span>
                  <span className="block text-[10px] text-slate-300 font-bold">
                    أختام الغسيل
                  </span>
                </div>
              </div>

              {/* الأختام الستة */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 my-6">
                {[1, 2, 3, 4, 5].map((stamp) => {
                  const done = stamp <= washCount;
                  return (
                    <div
                      key={stamp}
                      className={`rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition ${
                        done
                          ? "bg-emerald-500/20 border-emerald-400 text-white"
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      <span className="font-mono-num text-base font-extrabold">
                        {done ? "✓" : `0${stamp}`}
                      </span>
                      <span className="text-[10px] font-bold mt-1">
                        غسلة {stamp}
                      </span>
                    </div>
                  );
                })}

                <div
                  className={`rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition ${
                    washCount >= 5
                      ? "bg-[#F5B301] text-slate-950 border-white animate-bounce"
                      : "bg-[#F5B301]/15 border-[#F5B301]/50 text-[#F5B301]"
                  }`}
                >
                  <span className="text-base font-black">★</span>
                  <span className="text-[10px] font-black mt-1">6 مجاناً</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-200 font-bold">
                  {washCount >= 5
                    ? "مبروك! غسلتك السادسة القادمة مجانية بالكامل في المحطة!"
                    : `باقي لك (${5 - washCount}) غسلة فقط للحصول على الغسلة المجانية.`}
                </span>
                <button
                  onClick={() => setWashCount((prev) => (prev < 5 ? prev + 1 : 0))}
                  className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-xl font-extrabold shrink-0 cursor-pointer"
                >
                  {washCount < 5 ? "+ ختم تجريبي" : "إعادة ضبط"}
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                sendWhatsApp(
                  `مرحباً محطة A.Petroleum المنية، أود حجز دور غسيل VIP للسيارة رقم (${plateSearch}). رصيدي الحالي (${washCount}/5).`
                )
              }
              className="mt-6 w-full bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black text-sm py-3.5 rounded-xl transition cursor-pointer"
            >
              احجز دور غسيل VIP الآن
            </button>
          </div>
        </div>
      </section>

      {/* القسم الرابع: صالة عرض الزيوت المعتمدة (ELF • Quantum • IPT) */}
      <section id="lubricants" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#0B4F9F] font-extrabold text-xs uppercase tracking-wider">
                ELF OIL • POWER IN MOTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                صالة الزيوت المعتمدة (ELF • Quantum • IPT)
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                اختر الزيت الأصلي من رفوف صالتنا مباشرة مع كفالة المصدر وفحص مجاني
                للفلاتر والسوائل.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["ALL", "ELF", "QUANTUM", "IPT"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    selectedBrand === brand
                      ? "bg-[#0B4F9F] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {brand === "ALL" ? "جميع الماركات" : brand}
                </button>
              ))}
            </div>
          </div>

          {/* بطاقات الزيوت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOils.map((oil) => (
              <div
                key={oil.id}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 flex flex-col justify-between hover:border-[#0B4F9F] transition"
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="bg-[#0B4F9F] text-white text-xs font-black px-3 py-1 rounded-lg">
                      {oil.brand} ORIGINAL
                    </span>
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold px-3 py-1 rounded-full">
                      {oil.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">{oil.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {oil.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 block font-bold">
                        اللزوجة والمواصفات:
                      </span>
                      <strong className="font-mono-num text-slate-900 font-extrabold">
                        {oil.viscosity}
                      </strong>{" "}
                      <span className="text-slate-700 font-bold">({oil.spec})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-bold">
                        المسافة المعتمدة:
                      </span>
                      <strong className="font-mono-num text-[#0B4F9F] font-extrabold">
                        {oil.kmRange}
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    sendWhatsApp(
                      `مرحباً محطة A.Petroleum المنية، أود حجز غيار زيت (${oil.name}) الأصلي مع الفلتر لسيارتي.`
                    )
                  }
                  className="mt-6 w-full bg-slate-900 hover:bg-[#0B4F9F] text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl transition cursor-pointer"
                >
                  احجز هذا الزيت من صالة المحطة عبر واتساب
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الفوتر الرسمي */}
      <footer className="bg-[#071120] text-slate-400 py-10 px-4 sm:px-6 mt-12 border-t-4 border-[#F5B301]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-white font-black text-xl tracking-tight">
                A.PETROLEUM
              </span>
              <span className="bg-[#F5B301] text-slate-950 text-xs font-black px-2.5 py-0.5 rounded">
                MINIEH STATION
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              لبنان، الشمال، المنية — الأوتوستراد العام | نعمل 24/7 بالطاقة الشمسية
            </p>
          </div>

          <div className="text-xs text-center sm:text-left">
            <p className="text-slate-200 font-extrabold">
              IPT • Quantum • ELF Lubricants • EVZONE • Nitrogen Air Pump
            </p>
            <p className="mt-1">
              جميع الحقوق محفوظة © 2026 A.Petroleum Active.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
