"use client";

import { useEffect, useState } from "react";
import { EV_BOOKING, waLink } from "@/lib/site";

const CONNECTORS = ["Type 2", "CCS2", "CHAdeMO", "GB/T", "ما بعرف"];

const pad = (n: number) => String(n).padStart(2, "0");
const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function slots() {
  const out: string[] = [];
  for (let h = EV_BOOKING.firstHour; h <= EV_BOOKING.lastHour; h++) out.push(`${pad(h)}:00`);
  return out;
}

function dayLabel(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = new Intl.DateTimeFormat("ar-LB", { weekday: "long" }).format(date);
  return `${weekday} ${d}/${m}`;
}

// EV charger booking request: the customer fills it in and it opens WhatsApp with a ready message.
export default function EvBookingForm() {
  const [today, setToday] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState(slots()[0]);
  const [car, setCar] = useState("");
  const [connector, setConnector] = useState("ما بعرف");
  const [battery, setBattery] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  // The date depends on the visitor's clock, so it is set in the browser only.
  useEffect(() => {
    const t = isoDay(new Date());
    setToday(t);
    setDay(t);
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "مرحبا A.Petroleum، بدي احجز شاحن للسيارة الكهربائية:",
      day && `• اليوم: ${dayLabel(day)}`,
      `• الساعة: ${time}`,
      `• السيارة: ${car}`,
      `• نوع الموصل: ${connector}`,
      battery && `• البطارية هلق: ${battery}%`,
      name && `• الاسم: ${name}`,
      notes && `• ملاحظة: ${notes}`,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  const field = "w-full mt-1.5 px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#0B4F9F]";

  return (
    <form onSubmit={send} className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 space-y-4" aria-label="حجز شاحن سيارة كهربائية">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-bold">
          اليوم
          <input type="date" value={day} min={today || undefined} onChange={(e) => setDay(e.target.value)} className={field} required />
        </label>
        <label className="block text-sm font-bold">
          الساعة
          <select value={time} onChange={(e) => setTime(e.target.value)} className={`${field} num`}>
            {slots().map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-bold">
        نوع السيارة
        <input value={car} onChange={(e) => setCar(e.target.value)} placeholder="مثلاً: BYD Atto 3 أو Tesla Model 3" className={field} required />
      </label>
      <fieldset>
        <legend className="font-extrabold text-sm mb-2">نوع الموصل (المقبس)</legend>
        <div className="grid grid-cols-3 gap-2" dir="ltr">
          {CONNECTORS.map((c) => (
            <label key={c} className={`cursor-pointer rounded-xl border-2 px-2 py-2.5 font-bold text-center text-sm ${connector === c ? "border-[#0B4F9F] bg-blue-50" : "border-slate-200"}`}>
              <input type="radio" name="connector" value={c} checked={connector === c} onChange={() => setConnector(c)} className="sr-only" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-bold">
          البطارية هلق (%)
          <input value={battery} onChange={(e) => setBattery(e.target.value.replace(/\D/g, "").slice(0, 3))} inputMode="numeric" placeholder="مثلاً 20" className={`${field} num`} />
        </label>
        <label className="block text-sm font-bold">
          الاسم
          <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
      </div>
      <label className="block text-sm font-bold">
        ملاحظة (اختياري)
        <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أي شي لازم نعرفه" className={field} />
      </label>
      <button type="submit" className="w-full bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black text-lg rounded-xl py-3.5">
        ابعت طلب الحجز عالواتساب
      </button>
      <p className="text-xs text-slate-500 text-center">الحجز بيتأكّد بس نرد عليك عالواتساب ونثبّت الموعد.</p>
    </form>
  );
}
