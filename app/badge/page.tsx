"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import AdminGate from "../admin/AdminGate";

/** QR sticker for a car. Scanning it opens the staff panel on that car. The QR is drawn in the browser. */
function BadgeGenerator() {
  const [plate, setPlate] = useState("");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const p = plate.trim().toUpperCase();
    if (!p) return setSvg("");
    const url = `${window.location.origin}/admin?plate=${encodeURIComponent(p)}`;
    QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "M" }).then(setSvg);
  }, [plate]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 print:bg-white print:p-0">
      <div className="mb-8 text-center print:hidden" dir="rtl">
        <h1 className="text-2xl font-black text-[#0B4F9F] mb-2">ملصق السيارة (للموظفين)</h1>
        <p className="text-slate-500 text-sm">اكتب رقم اللوحة واطبع الملصق. المسح بيفتح ملف السيارة بلوحة الموظفين.</p>
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="رقم اللوحة"
          dir="ltr"
          className="mt-4 px-4 py-2 border-2 border-[#0B4F9F] rounded-xl font-black text-center text-lg uppercase outline-none"
        />
      </div>

      {svg && (
        <div className="relative w-[320px] h-[480px] bg-gradient-to-b from-[#071120] via-[#0B2545] to-[#0B4F9F] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between border-4 border-[#F5B301] overflow-hidden print:shadow-none">
          <div className="text-center w-full">
            <h2 className="text-[#F5B301] font-black text-xl tracking-widest uppercase mb-0.5">A.Petroleum</h2>
            <div className="text-slate-300 text-[10px] font-extrabold tracking-[0.3em] uppercase">Minieh Station</div>
          </div>
          <div className="bg-white p-3 rounded-2xl w-44 h-44" dangerouslySetInnerHTML={{ __html: svg }} />
          <div className="text-center w-full">
            <div dir="ltr" className="bg-[#F5B301] text-[#071120] font-black text-2xl py-1.5 px-4 rounded-xl inline-block mb-3" style={{ fontFamily: "monospace" }}>
              {plate.trim().toUpperCase()}
            </div>
            <div className="text-white text-xs font-bold" dir="rtl">زيت وغسيل • سجلّ سيارتك</div>
          </div>
        </div>
      )}

      {svg && (
        <button onClick={() => window.print()} className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold print:hidden">
          طباعة الملصق
        </button>
      )}
    </div>
  );
}

export default function BadgePage() {
  return (
    <AdminGate>
      <BadgeGenerator />
    </AdminGate>
  );
}
