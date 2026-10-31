"use client";

import React, { useState } from "react";

export default function ActivePetroleumApp() {
  // رقم واتساب المحطة (يمكنك تعديله لاحقاً لرقم المحطة الرسمي)
  const WHATSAPP_NUMBER = "96170000000";

  // حالة التبويبات في لوحة الزبون
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

  // حالة بطاقة ولاء الغسيل (5 غسلات = السادسة مجاناً)
  const [washCount, setWashCount] = useState(4);

  // حالة مستشار الزيوت الذكي
  const [selectedCarType, setSelectedCarType] = useState("modern_gas");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  // بيانات أسعار المحروقات
  const fuelPrices = [
    {
      id: "oct95",
      name: "بنزين 95 أوكتان",
      sub: "Unleaded 95 Premium",
      priceLbp: "1,485,000",
      priceUsd: "16.60",
      status: "متوفر",
      color: "bg-emerald-600",
    },
    {
      id: "oct98",
      name: "بنزين 98 أوكتان",
      sub: "Super Unleaded 98",
      priceLbp: "1,525,000",
      priceUsd: "17.05",
      status: "متوفر",
      color: "bg-blue-700",
    },
    {
      id: "diesel",
      name: "مازوت أخضر نقي",
      sub: "Euro Diesel - للمركبات والمولدات",
      priceLbp: "1,310,000",
      priceUsd: "14.65",
      status: "متوفر مع التوصيل",
      color: "bg-amber-500",
    },
    {
      id: "lpg",
      name: "غاز منزلي وتجاري",
      sub: "أسطوانة 10 كغ مفحوصة",
      priceLbp: "980,000",
      priceUsd: "10.95",
      status: "متوفر",
      color: "bg-teal-600",
    },
  ];

  // قاعدة بيانات الزيوت المعتمدة
  const lubricants = [
    {
      id: 1,
      brand: "ELF",
      name: "ELF Evolution 900 SXR 5W-40",
      viscosity: "5W-40",
      type: "Synthetic تخليقي بالكامل",
      carTypes: ["modern_gas", "euro_diesel"],
      kmRange: "7,000 - 10,000 كم",
      badge: "الأكثر طلباً للسيارات الحديثة",
      desc: "حماية فائقة للمحركات الحديثة والتيربو ضد التآكل والحرارة العالية.",
    },
    {
      id: 2,
      brand: "ELF",
      name: "ELF Evolution 700 STI 10W-40",
      viscosity: "10W-40",
      type: "Semi-Synthetic نصف تخليقي",
      carTypes: ["standard_gas", "euro_diesel"],
      kmRange: "5,000 - 6,000 كم",
      badge: "أداء مثالي وموثوق",
      desc: "تكنولوجيا فرنسية متطورة تمنح المحرك نظافة فائقة واستقراراً في الأداء.",
    },
    {
      id: 3,
      brand: "QUANTUM",
      name: "Quantum X-Treme Ultra 5W-30",
      viscosity: "5W-30",
      type: "Full Synthetic",
      carTypes: ["modern_gas", "hybrid"],
      kmRange: "8,000 - 10,000 كم",
      badge: "توفير استهلاك الوقود",
      desc: "مصمم للسيارات الأمريكية والآسيوية الحديثة وسيارات الهايبرد لتقليل الاحتكاك.",
    },
    {
      id: 4,
      brand: "IPT",
      name: "IPT Supralube HD 15W-40",
      viscosity: "15W-40",
      type: "Heavy Duty Diesel & Gas",
      carTypes: ["heavy_diesel", "standard_gas"],
      kmRange: "5,000 كم / 250 ساعة عمل",
      badge: "للآليات والمولدات",
      desc: "زيت عالي التحمل مخصص لمحركات الديزل الثقيلة، البيك أب، والمولدات الكهربائية.",
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
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* الشريط العلوي - حالة المحطة */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">
              محطة المنية (A.Petroleum) مفتوحة الآن 24/7 — الطريق العام
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>الوكيل المعتمد: IPT | Quantum | ELF</span>
            <span className="hidden sm:inline text-amber-400 font-semibold">
              كفالة عداد ونقاوة 100%
            </span>
          </div>
        </div>
      </div>

      {/* الهيدر الرئيسي */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center shadow-md border-2 border-amber-400">
              <span className="text-amber-400 font-black text-2xl tracking-tighter">
                A.P
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  A.PETROLEUM
                </h1>
                <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                محطة المنية النموذجية للمحروقات والزيوت والغسيل
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
            <a href="#totem" className="hover:text-blue-700 transition">
              أسعار المحروقات
            </a>
            <a href="#garage" className="hover:text-blue-700 transition">
              سجل سيارتي والولاء
            </a>
            <a href="#lubricants" className="hover:text-blue-700 transition">
              مستشار الزيوت (ELF/IPT/Quantum)
            </a>
            <a href="#services" className="hover:text-blue-700 transition">
              توصيل المازوت والخدمات
            </a>
          </div>

          <button
            onClick={() =>
              sendWhatsApp("مرحباً محطة A.Petroleum المنية، أود الاستفسار عن خدمة:")
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <span>تواصل مباشر</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">
              WhatsApp
            </span>
          </button>
        </div>
      </header>

      {/* القسم الترحيبي + لوحة أسعار المحروقات الحية (Totem) */}
      <section id="totem" className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* البطاقة التعريفية الرئيسية */}
          <div className="lg:col-span-7 bg-gradient-to-br from-white via-white to-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>المنصة الرقمية الأولى لخدمات السيارات في الشمال</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
                أعلى معايير النقاوة لمحركك،{" "}
                <span className="text-blue-800 underline decoration-amber-400 decoration-4 underline-offset-8">
                  بإدارة رقمية ذكية.
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                في محطة <strong>A.Petroleum المنية</strong>، نجمع بين الوقود المفحوص مخبرياً، والتمثيل الرسمي لأقوى علامات الزيوت العالمية (<strong>ELF, Quantum, IPT</strong>)، مع نظام رقمي لتتبع صيانة سيارتك ومكافآت الغسيل.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="#garage"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition text-sm sm:text-base"
                >
                  افتح سجل سيارتك وبطاقة الغسيل
                </a>
                <a
                  href="#lubricants"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-sm transition text-sm sm:text-base"
                >
                  اعرف الزيت المناسب لسيارتك
                </a>
              </div>

              {/* شارات الثقة */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-center sm:text-right">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">الزيوت المعتمدة</p>
                  <p className="text-sm sm:text-base font-black text-slate-900">
                    IPT • QUANTUM • ELF
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">فحص الفلاتر والسوائل</p>
                  <p className="text-sm sm:text-base font-black text-emerald-700">
                    مجاناً مع كل غيار زيت
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">بطاقة ولاء الغسيل</p>
                  <p className="text-sm sm:text-base font-black text-blue-800">
                    الغسلة السادسة مجاناً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* توتيم أسعار المحروقات المباشر */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-800">
                <div>
                  <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                    LIVE STATION TOTEM
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    لوحة أسعار المحروقات اليوم
                  </h3>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  محدّث تلقائياً
                </span>
              </div>

              <div className="space-y-3.5">
                {fuelPrices.map((fuel) => (
                  <div
                    key={fuel.id}
                    className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4 transition flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-10 rounded-full ${fuel.color}`}></span>
                      <div>
                        <h4 className="font-bold text-white text-sm sm:text-base">
                          {fuel.name}
                        </h4>
                        <p className="text-xs text-slate-400">{fuel.sub}</p>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg sm:text-xl font-black text-amber-400 tracking-tight">
                        {fuel.priceLbp} <span className="text-xs text-slate-300">ل.ل</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        أو ${fuel.priceUsd} / 20 ليتر
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-400">
                تحتاج توصيل مازوت للمولد أو المنزل في المنية والجوار؟
              </p>
              <button
                onClick={() =>
                  sendWhatsApp(
                    "مرحباً A.Petroleum، أود طلب توصيل مازوت أخضر نقي. الكمية المطلوبة والعنوان:"
                  )
                }
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shrink-0 transition cursor-pointer"
              >
                اطلب مازوت الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثاني: كراج الزبون الذكي (تتبع غيار الزيت + بطاقة ولاء الغسيل) */}
      <section id="garage" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-blue-700 font-extrabold text-xs uppercase tracking-wider">
              SMART CUSTOMER ACCOUNT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              حساب الزبون: سجل غيار الزيت وبطاقة ولاء الغسيل
            </h2>
          </div>

          {/* شريط البحث برقم اللوحة */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-300 shadow-xs">
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-2 rounded-xl">
              رقم اللوحة:
            </span>
            <input
              type="text"
              value={plateSearch}
              onChange={(e) => setPlateSearch(e.target.value)}
              className="text-sm font-black text-slate-900 px-2 py-1 focus:outline-none w-32 text-left"
              dir="ltr"
              placeholder="M 123456"
            />
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1.5 rounded-xl">
              ملف نشط
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* بطاقة تتبع غيار الزيت والفلاتر */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                    سجل صيانة المحرك الرقمي
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    متابعة كيلومترات الزيت والفلاتر
                  </h3>
                </div>
                <div className="text-left bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200" dir="ltr">
                  <span className="text-[10px] font-bold text-slate-500 block">PLATE NO</span>
                  <span className="text-sm font-black text-slate-900">{plateSearch}</span>
                </div>
              </div>

              {/* تفاصيل آخر غيار زيت */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <p className="text-xs text-slate-500">الزيت المستخدم حالياً</p>
                  <p className="text-sm font-black text-blue-900 mt-0.5">
                    ELF 900 5W-40
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">عداد آخر غيار زيت</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5" dir="ltr">
                    {lastOilChangeKm.toLocaleString()} km
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-slate-500">الفلاتر المستبدلة</p>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">
                    فلتر زيت + فلتر هواء ✓
                  </p>
                </div>
              </div>

              {/* محاكي عداد الكيلومترات الحالي */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-bold text-slate-700">
                    أدخل عداد سيارتك الحالي لتحديث المتبقي:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentKm((prev) => Math.max(lastOilChangeKm, prev - 500))}
                      className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-black text-base text-slate-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-lg" dir="ltr">
                      {currentKm.toLocaleString()} km
                    </span>
                    <button
                      onClick={() => setCurrentKm((prev) => prev + 500)}
                      className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* شريط التقدم */}
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      remainingKm <= 500
                        ? "bg-red-500"
                        : remainingKm <= 1200
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold mt-2">
                  <span className="text-slate-500">
                    موعد الغيار القادم:{" "}
                    <strong className="text-slate-800" dir="ltr">
                      {nextOilChangeKm.toLocaleString()} km
                    </strong>
                  </span>
                  <span
                    className={
                      remainingKm <= 500
                        ? "text-red-600 font-black"
                        : "text-emerald-700 font-black"
                    }
                  >
                    {remainingKm > 0
                      ? `متبقي ${remainingKm.toLocaleString()} كم للغيار القادم`
                      : "حان موعد غيار الزيت الآن!"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-slate-500">
                يتم حفظ السجل تلقائياً عند كل غيار في محطة المنية
              </span>
              <button
                onClick={() =>
                  sendWhatsApp(
                    `مرحباً محطة A.Petroleum، رقم لوحة سيارتي (${plateSearch}) والعداد الحالي (${currentKm} كم). أود حجز موعد لغيار الزيت وفحص الفلاتر.`
                  )
                }
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                احجز موعد غيار الزيت القادم
              </button>
            </div>
          </div>

          {/* بطاقة ولاء غسيل السيارات الرقمية */}
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                    VIP CAR WASH LOYALTY
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">
                    بطاقة ولاء غسيل السيارات الرقمية
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    اجمع 5 أختام غسيل واحصل على <strong>الغسلة السادسة VIP مجاناً</strong> مع تلميع!
                  </p>
                </div>
                <div className="text-center bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
                  <span className="text-2xl font-black text-amber-400">{washCount}/5</span>
                  <span className="block text-[10px] text-slate-300">أختام مكتملة</span>
                </div>
              </div>

              {/* شبكة الأختام الـ 6 */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-6">
                {[1, 2, 3, 4, 5].map((stamp) => {
                  const completed = stamp <= washCount;
                  return (
                    <div
                      key={stamp}
                      className={`rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition ${
                        completed
                          ? "bg-emerald-500/20 border-emerald-400 text-white"
                          : "bg-slate-800/60 border-slate-700 text-slate-400"
                      }`}
                    >
                      <span className="text-lg font-black">
                        {completed ? "✓" : stamp}
                      </span>
                      <span className="text-[11px] font-bold mt-1">
                        غسلة {stamp}
                      </span>
                    </div>
                  );
                })}

                {/* الختم السادس المجاني */}
                <div
                  className={`rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition ${
                    washCount >= 5
                      ? "bg-amber-400 text-slate-950 border-white animate-bounce"
                      : "bg-amber-400/15 border-amber-400/50 text-amber-300"
                  }`}
                >
                  <span className="text-lg font-black">🎁</span>
                  <span className="text-[11px] font-black mt-1">6 مجاناً</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 flex items-center justify-between gap-2">
                <span>
                  {washCount >= 5
                    ? "مبروك! لقد استحقيت غسلة VIP مجانية بالكامل في محطة المنية!"
                    : `باقي لك (${5 - washCount}) غسلة واحدة فقط للحصول على الغسلة المجانية القادمة.`}
                </span>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => setWashCount((prev) => (prev < 5 ? prev + 1 : 0))}
                    className="bg-white/15 hover:bg-white/25 text-white px-2.5 py-1.5 rounded-lg font-bold cursor-pointer"
                  >
                    {washCount < 5 ? "+ تجربة ختم" : "إعادة ضبط"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-slate-400">
                غسيل بالفوم النشط والماء المفلتر بدون خدوش
              </span>
              <button
                onClick={() =>
                  sendWhatsApp(
                    `مرحباً A.Petroleum، أود حجز دور غسيل سيارة VIP للوحة رقم (${plateSearch}). رصيدي الحالي في بطاقة الولاء: (${washCount}/5).`
                  )
                }
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                احجز دور غسيل VIP الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: مستشار الزيوت الذكي (IPT / Quantum / ELF) */}
      <section id="lubricants" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-amber-600 font-extrabold text-xs uppercase tracking-wider">
                AUTHORIZED LUBRICANT DISTRIBUTOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                مستشار الزيوت الذكي (ELF • Quantum • IPT)
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                اختر نوع محرك سيارتك لنرشح لك الزيت الأصلي المضمون من الوكيل مباشرة مع فحص مجاني للفلاتر.
              </p>
            </div>

            {/* فلتر الماركة */}
            <div className="flex flex-wrap gap-2">
              {["ALL", "ELF", "QUANTUM", "IPT"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    selectedBrand === brand
                      ? "bg-slate-900 text-amber-400 shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {brand === "ALL" ? "كل الماركات المعتمدة" : brand}
                </button>
              ))}
            </div>
          </div>

          {/* أزرار اختيار نوع السيارة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { id: "modern_gas", label: "سيارة بنزين حديثة / تيربو", sub: "موديلات 2015 وما فوق" },
              { id: "standard_gas", label: "سيارة بنزين اعتيادية", sub: "محركات تنفس طبيعي" },
              { id: "euro_diesel", label: "سيارة ديزل / SUV حديثة", sub: "حماية عالية للتيربو" },
              { id: "heavy_diesel", label: "بيك أب / شاحنة / مولد كهرباء", sub: "أحمال شاقة وساعات طويلة" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedCarType(type.id)}
                className={`p-4 rounded-2xl border-2 text-right transition cursor-pointer ${
                  selectedCarType === type.id
                    ? "border-blue-700 bg-blue-50/60"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="font-black text-sm text-slate-900">{type.label}</div>
                <div className="text-xs text-slate-500 mt-1">{type.sub}</div>
              </button>
            ))}
          </div>

          {/* بطاقات الزيوت المرشحة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOils.map((oil) => (
              <div
                key={oil.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between hover:border-blue-400 transition"
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="bg-slate-900 text-amber-400 text-xs font-black px-3 py-1 rounded-lg">
                      {oil.brand} ORIGINAL
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      {oil.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {oil.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {oil.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-500 block">درجة اللزوجة والتصنيف:</span>
                      <strong className="text-slate-900 font-black">{oil.viscosity} — {oil.type}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">المسافة الموصى بها:</span>
                      <strong className="text-blue-800 font-black">{oil.kmRange}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    sendWhatsApp(
                      `مرحباً A.Petroleum، أود الاستفسار وحجز غيار زيت (${oil.name} - ${oil.viscosity}) مع فلتر زيت أصلي لسيارتي.`
                    )
                  }
                  className="mt-6 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm py-3 rounded-xl transition cursor-pointer"
                >
                  احجز هذا الزيت مع فحص الفلاتر عبر واتساب
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* القسم الرابع: خدمات المحطة وتوصيل المازوت */}
      <section id="services" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl mb-4">
              01
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              توصيل مازوت للمنازل والمؤسسات
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              صهاريج مجهزة بعدادات إلكترونية دقيقة لتأمين المازوت الأخضر النقي للمولدات والمنازل والمشاريع في المنية وطرابلس والشمال.
            </p>
            <button
              onClick={() =>
                sendWhatsApp("مرحباً A.Petroleum، أريد طلب صهريج مازوت للتوصيل:")
              }
              className="text-blue-800 font-black text-sm hover:underline cursor-pointer"
            >
              اطلب التوصيل الفوري ←
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl mb-4">
              02
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              مركز غيار الزيوت والفلاتر الاحترافي
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              فنيون مختصون، فلاتر أصلية لجميع أنواع السيارات، وفحص مجاني لمستوى مياه الرديتر، زيت الفرامل، والبطارية.
            </p>
            <a
              href="#lubricants"
              className="text-blue-800 font-black text-sm hover:underline"
            >
              اختر زيت سيارتك ←
            </a>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl mb-4">
              03
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              غسيل سيارات VIP وعناية شاملة
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              غسيل خارجي وداخلي بأحدث ماكينات الضغط العالي ومواد التنظيف الآمنة على الطلاء مع نظام مكافآت رقمي لكل زبون.
            </p>
            <a
              href="#garage"
              className="text-blue-800 font-black text-sm hover:underline"
            >
              تفقّد بطاقة الولاء ←
            </a>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6 mt-12 border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-xl">A.PETROLEUM</span>
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded">
                محطة المنية
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              لبنان، الشمال، المنية - الطريق العام الدولي | خدمة 24 ساعة
            </p>
          </div>

          <div className="text-xs text-center sm:text-left">
            <p className="text-slate-300 font-bold">
              الوكيل المعتمد لزيوت IPT • Quantum • ELF
            </p>
            <p className="mt-1">
جميع الحقوق محفوظة © 2026 A.Petroleum.            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
