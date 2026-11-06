"use client";

import React, { useState } from "react";

export default function VipBadgeGenerator() {
  const [plate, setPlate] = useState("M 458921");
  
  // Raqem aw ID l-zaboun yalli rah ykoun mokhfi bl QR Code
  const qrData = `https://active-petroleum.vercel.app/admin/scan?plate=${encodeURIComponent(plate)}`;
  // Api majjaniye la twallid l-QR Code ka soura
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&margin=10`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6" dir="ltr" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      <div className="mb-8 text-center" dir="rtl">
        <h1 className="text-2xl font-black text-[#0B4F9F] mb-2">مولّد ملصقات VIP (للموظفين)</h1>
        <p className="text-slate-500 text-sm">أدخل رقم اللوحة لرؤية تصميم الملصق الذكي</p>
        <input 
          type="text" 
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          className="mt-4 px-4 py-2 border-2 border-[#0B4F9F] rounded-xl font-black text-center text-lg uppercase outline-none"
        />
      </div>

      {/* L-Design l-Fa5em lal Sticker (8x5 cm fil waqe3) */}
      <div className="relative w-[320px] h-[480px] bg-gradient-to-b from-[#071120] via-[#0B2545] to-[#0B4F9F] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between border-4 border-[#F5B301] overflow-hidden">
        
        {/* Khalfiye Handasiye */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Tarwise: Logo + Brand */}
        <div className="text-center w-full relative z-10">
          <div className="flex justify-center mb-2">
             <svg viewBox="0 0 120 100" className="w-12 h-12">
                <path d="M62 8 L30 72 L45 72 L62 36 L70 52 L79 42 Z" fill="#F5B301" />
                <path d="M28 74 C52 68, 75 50, 96 22 C82 52, 60 70, 28 74 Z" fill="#F5B301" />
                <path d="M15 88 C45 84, 68 70, 84 48 L108 88 L48 88 L56 77 L86 77 L78 62 C62 77, 40 86, 15 88 Z" fill="#0B4F9F" />
              </svg>
          </div>
          <h2 className="text-[#F5B301] font-black text-xl tracking-widest uppercase mb-0.5">A.Petroleum</h2>
          <div className="text-slate-300 text-[10px] font-extrabold tracking-[0.3em] uppercase">Minieh Station</div>
        </div>

        {/* L-QR Code l-Zaki */}
        <div className="bg-white p-3 rounded-2xl shadow-[0_0_20px_rgba(245,179,1,0.3)] relative z-10">
          <img src={qrImageUrl} alt="VIP QR Code" className="w-40 h-40 rounded-lg" />
        </div>

        {/* Ma3loumat l-Siyara */}
        <div className="text-center w-full relative z-10">
          <div className="bg-[#F5B301] text-[#071120] font-black text-2xl py-1.5 px-4 rounded-xl inline-block mb-3 border border-amber-300 shadow-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {plate}
          </div>
          <div className="text-white text-xs font-bold tracking-widest uppercase">
            VIP Digital Passport
          </div>
          <div className="text-slate-400 text-[9px] mt-1 border-t border-slate-600 pt-1">
            Oil & Wash Loyalty System
          </div>
        </div>
      </div>

      <button onClick={() => window.print()} className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition">
        🖨️ طباعة الملصق (Print Sticker)
      </button>

    </div>
  );
}
