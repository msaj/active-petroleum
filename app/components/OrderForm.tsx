"use client";

import { useState } from "react";
import { waLink } from "@/lib/site";

export default function OrderForm() {
  const [product, setProduct] = useState<"diesel" | "gas">("diesel");
  const [qty, setQty] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("اليوم");
  const [name, setName] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "مرحبا A.Petroleum، بدي اطلب:",
      `• ${product === "diesel" ? "مازوت تدفئة" : "قارورة غاز"}`,
      qty && `• الكمية: ${qty}`,
      address && `• العنوان: ${address}`,
      `• الوقت المفضّل: ${time}`,
      name && `• الاسم: ${name}`,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  const field = "w-full mt-1.5 px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#0B4F9F]";

  return (
    <form onSubmit={send} className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 space-y-4" aria-label="طلب مازوت أو غاز">
      <fieldset>
        <legend className="font-extrabold text-sm mb-2">شو بدك؟</legend>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["diesel", "مازوت تدفئة"],
            ["gas", "قارورة غاز"],
          ] as const).map(([val, label]) => (
            <label key={val} className={`cursor-pointer rounded-xl border-2 px-3 py-3 font-bold text-center ${product === val ? "border-[#0B4F9F] bg-blue-50" : "border-slate-200"}`}>
              <input type="radio" name="product" value={val} checked={product === val} onChange={() => setProduct(val)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-bold">
        الكمية
        <input value={qty} onChange={(e) => setQty(e.target.value)} placeholder={product === "diesel" ? "مثلاً: 500 ليتر" : "مثلاً: قارورتين"} className={field} />
      </label>
      <label className="block text-sm font-bold">
        العنوان
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="الضيعة، الشارع، أقرب معلم" className={field} required />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-bold">
          الوقت المفضّل
          <select value={time} onChange={(e) => setTime(e.target.value)} className={field}>
            <option>اليوم</option>
            <option>بكرا</option>
            <option>هالأسبوع</option>
          </select>
        </label>
        <label className="block text-sm font-bold">
          الاسم
          <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
      </div>
      <button type="submit" className="w-full bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black text-lg rounded-xl py-3.5">
        ابعت الطلب عالواتساب
      </button>
      <p className="text-xs text-slate-500 text-center">منتصل فيك نأكد الكمية والسعر والموعد. الدفع عند التسليم.</p>
    </form>
  );
}
