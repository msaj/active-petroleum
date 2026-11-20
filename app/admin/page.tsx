"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import AdminGate, { getSupabase } from "./AdminGate";
import InstallApp from "@/app/components/InstallApp";
import { OIL_PRODUCTS, OIL_SERVICES, OTHER_OIL, WASH_TYPES, addMonths, plateKey } from "@/lib/oil";

type Customer = {
  id: string;
  plate_number: string;
  name: string | null;
  car: string | null;
  whatsapp: string | null;
  wash_count: number | null;
  current_km: number | null;
  oil_type: string | null;
  last_visit: string | null;
  last_oil_at: string | null;
  next_oil_km: number | null;
  next_oil_date: string | null;
  sticker_code: string | null;
};

type Visit = {
  id: number;
  visited_at: string;
  service: "oil" | "wash";
  wash_type: string | null;
  oil_product: string | null;
  oil_service: string | null;
  oil_added_kg: number | null;
  km: number | null;
  next_oil_km: number | null;
  next_oil_date: string | null;
  notes: string | null;
  staff_email: string | null;
};

const CUSTOMER_COLS = "id,plate_number,name,car,whatsapp,wash_count,current_km,oil_type,last_visit,last_oil_at,next_oil_km,next_oil_date,sticker_code";

const stickerKey = (s: string) => s.toUpperCase().replace(/[^A-Z0-9-]/g, "");

const fmtDate = (s: string | null) => (s ? new Date(s).toLocaleDateString("en-GB") : "غير محدد");
const fmtKm = (n: number | null) => (n == null ? "غير محدد" : `${n.toLocaleString("en-US")} كم`);
const label = (list: readonly { id: string; label: string }[], id: string | null) => list.find((x) => x.id === id)?.label ?? id ?? "";

function Msg({ m }: { m: { text: string; ok: boolean } | null }) {
  if (!m) return null;
  return (
    <div className={`p-3 rounded-xl text-sm font-bold text-center ${m.ok ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
      {m.text}
    </div>
  );
}

function RegisterForm({ plate, sticker, onCreated }: { plate: string; sticker: string | null; onCreated: (c: Customer) => void }) {
  const [f, setF] = useState({ plate_number: plate.toUpperCase(), name: "", car: "", whatsapp: "", current_km: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const save = async () => {
    if (!f.plate_number.trim()) return setMsg({ text: "اكتب رقم اللوحة.", ok: false });
    setBusy(true);
    const { data, error } = await getSupabase()
      .from("customers")
      .insert({
        plate_number: f.plate_number.trim().toUpperCase(),
        name: f.name.trim() || null,
        car: f.car.trim() || null,
        whatsapp: f.whatsapp.replace(/\D/g, "") || null,
        current_km: f.current_km ? parseInt(f.current_km, 10) : 0,
        oil_type: null,
        sticker_code: sticker,
      })
      .select(CUSTOMER_COLS)
      .single();
    setBusy(false);
    if (error) return setMsg({ text: error.code === "23505" ? "هيدي اللوحة أو هيدا الملصق مسجّلين من قبل." : "ما زبط التسجيل، جرّب مرة تانية.", ok: false });
    onCreated(data as Customer);
  };

  const input = "w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 font-bold outline-none focus:border-[#0B4F9F]";
  return (
    <div className="bg-white border-2 border-[#0B4F9F] rounded-2xl p-5 space-y-3">
      <h3 className="font-black text-[#0B4F9F] text-lg">تسجيل سيارة جديدة</h3>
      {sticker && <p className="text-sm font-bold text-slate-600">الملصق <span dir="ltr">{sticker}</span> رح ينربط بهالسيارة.</p>}
      <input className={input} dir="ltr" placeholder="رقم اللوحة" value={f.plate_number} onChange={(e) => setF({ ...f, plate_number: e.target.value })} />
      <input className={input} placeholder="نوع السيارة وسنتها (مثلاً Kia Picanto 2016)" value={f.car} onChange={(e) => setF({ ...f, car: e.target.value })} />
      <input className={input} placeholder="اسم صاحب السيارة" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input className={input} dir="ltr" inputMode="tel" placeholder="واتساب (مثلاً 03123456)" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} />
      <input className={input} dir="ltr" inputMode="numeric" placeholder="العداد الحالي (كم)" value={f.current_km} onChange={(e) => setF({ ...f, current_km: e.target.value.replace(/\D/g, "") })} />
      <Msg m={msg} />
      <button onClick={save} disabled={busy} className="w-full bg-[#0B4F9F] text-white py-3 rounded-xl font-black text-lg disabled:opacity-60">
        {busy ? "..." : "تسجيل السيارة"}
      </button>
    </div>
  );
}

function OilForm({ c, onSaved }: { c: Customer; onSaved: () => void }) {
  const [product, setProduct] = useState(OIL_PRODUCTS[0].id);
  const [other, setOther] = useState("");
  const [service, setService] = useState<string>("oil_filter");
  const [kg, setKg] = useState("1");
  const [km, setKm] = useState("");
  const [nextKm, setNextKm] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const isChange = service === "oil_filter" || service === "oil_only";
  const interval = useMemo(() => OIL_PRODUCTS.find((p) => p.id === product) ?? OTHER_OIL, [product]);

  // Suggest the next change from the counter and the product interval; staff can edit it.
  useEffect(() => {
    const k = parseInt(km, 10);
    setNextKm(Number.isFinite(k) ? String(k + interval.km) : "");
    setNextDate(addMonths(new Date(), interval.months));
  }, [km, interval]);

  const save = async () => {
    const k = km ? parseInt(km, 10) : null;
    if (isChange && k == null) return setMsg({ text: "اكتب العداد.", ok: false });
    if (k != null && c.current_km && k < c.current_km && !confirm(`العداد (${k}) أقل من آخر عداد مسجّل (${c.current_km}). متأكد؟`)) return;
    const oil = product === "other" ? other.trim() || "غير محدد" : product;
    setBusy(true);
    const { error } = await getSupabase().rpc("record_visit", {
      p_customer_id: c.id,
      p_service: "oil",
      p_oil_product: service === "filter_only" ? null : oil,
      p_oil_service: service,
      p_oil_added_kg: service === "top_up" ? parseFloat(kg) || null : null,
      p_km: k,
      p_next_oil_km: isChange && nextKm ? parseInt(nextKm, 10) : null,
      p_next_oil_date: isChange && nextDate ? nextDate : null,
      p_notes: notes,
    });
    setBusy(false);
    if (error) return setMsg({ text: "ما زبط الحفظ، جرّب مرة تانية.", ok: false });
    setMsg({ text: `تسجّل: ${label(OIL_SERVICES, service)}.`, ok: true });
    setKm("");
    setNotes("");
    onSaved();
  };

  const chip = (on: boolean) => `py-2 px-1 rounded-xl font-black text-xs border-2 transition ${on ? "bg-[#F5B301] text-slate-900 border-[#F5B301]" : "bg-white text-slate-600 border-slate-200"}`;
  const input = "w-full bg-white border-2 border-amber-200 rounded-xl px-3 py-2 font-black outline-none focus:border-[#F5B301]";

  return (
    <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-5 space-y-4">
      <h3 className="font-black text-amber-800">زيت</h3>
      <div className="grid grid-cols-2 gap-2">
        {OIL_SERVICES.map((s) => (
          <button key={s.id} onClick={() => setService(s.id)} className={chip(service === s.id)}>{s.label}</button>
        ))}
      </div>

      {service !== "filter_only" && (
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-500">الزيت</span>
          <select value={product} onChange={(e) => setProduct(e.target.value)} className={input} dir="ltr">
            {OIL_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
            <option value="other">غيرو…</option>
          </select>
          {product === "other" && <input className={input} dir="ltr" placeholder="الماركة والدرجة" value={other} onChange={(e) => setOther(e.target.value)} />}
        </div>
      )}

      {service === "top_up" && (
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-500">كمية الزيادة (كيلو)</span>
          <input className={input} dir="ltr" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
        </div>
      )}

      <div className="space-y-2">
        <span className="text-xs font-black text-slate-500">العداد هلّق (آخر مسجّل: {fmtKm(c.current_km)})</span>
        <input className={input} dir="ltr" inputMode="numeric" placeholder="مثلاً 145200" value={km} onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))} />
      </div>

      {isChange && (
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1">
            <span className="text-xs font-black text-slate-500">الغيار الجاي (كم)</span>
            <input className={input} dir="ltr" inputMode="numeric" value={nextKm} onChange={(e) => setNextKm(e.target.value.replace(/\D/g, ""))} />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-black text-slate-500">أو بتاريخ</span>
            <input className={input} type="date" dir="ltr" value={nextDate} onChange={(e) => setNextDate(e.target.value)} />
          </label>
        </div>
      )}

      <input className={input} placeholder="ملاحظة (اختياري)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Msg m={msg} />
      <button onClick={save} disabled={busy} className="w-full bg-[#F5B301] text-slate-900 py-3 rounded-xl font-black text-lg disabled:opacity-60">
        {busy ? "..." : "حفظ الزيت ✓"}
      </button>
    </div>
  );
}

function WashForm({ c, onSaved }: { c: Customer; onSaved: () => void }) {
  const [type, setType] = useState<string>("normal");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const save = async () => {
    setBusy(true);
    const { error } = await getSupabase().rpc("record_visit", { p_customer_id: c.id, p_service: "wash", p_wash_type: type });
    setBusy(false);
    if (error) return setMsg({ text: "ما زبط الحفظ، جرّب مرة تانية.", ok: false });
    setMsg({ text: `تسجّل: ${label(WASH_TYPES, type)}.`, ok: true });
    onSaved();
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-5 space-y-4">
      <h3 className="font-black text-[#0B4F9F]">غسيل <span className="text-xs text-slate-500">(عدد الغسلات: {c.wash_count ?? 0})</span></h3>
      <div className="grid grid-cols-2 gap-2">
        {WASH_TYPES.map((w) => (
          <button
            key={w.id}
            onClick={() => setType(w.id)}
            className={`py-2 px-1 rounded-xl font-black text-xs border-2 transition ${type === w.id ? "bg-[#0B4F9F] text-white border-[#0B4F9F]" : "bg-white text-slate-600 border-slate-200"}`}
          >
            {w.label}
          </button>
        ))}
      </div>
      <Msg m={msg} />
      <button onClick={save} disabled={busy} className="w-full bg-[#0B4F9F] text-white py-3 rounded-xl font-black text-lg disabled:opacity-60">
        {busy ? "..." : "حفظ الغسيل ✓"}
      </button>
    </div>
  );
}

function History({ visits }: { visits: Visit[] }) {
  if (!visits.length) return <p className="text-sm text-slate-500 text-center">ما في زيارات مسجّلة بعد.</p>;
  return (
    <ul className="space-y-2">
      {visits.map((v) => (
        <li key={v.id} className="bg-white border border-slate-200 rounded-xl p-3 text-sm">
          <div className="flex justify-between font-black">
            <span>{v.service === "wash" ? label(WASH_TYPES, v.wash_type) : label(OIL_SERVICES, v.oil_service)}</span>
            <span className="text-slate-500" dir="ltr">{fmtDate(v.visited_at)}</span>
          </div>
          <div className="text-slate-600 mt-1 space-x-reverse space-x-2">
            {v.oil_product && <span dir="ltr">{v.oil_product}</span>}
            {v.oil_added_kg != null && <span>• {v.oil_added_kg} كيلو</span>}
            {v.km != null && <span>• {fmtKm(v.km)}</span>}
            {v.next_oil_km != null && <span>• الجاي {fmtKm(v.next_oil_km)}</span>}
          </div>
          {v.notes && <div className="text-slate-500 mt-1">{v.notes}</div>}
          {v.staff_email && <div className="text-[11px] text-slate-400 mt-1" dir="ltr">{v.staff_email}</div>}
        </li>
      ))}
    </ul>
  );
}

function StickerLink({ c, pending, onLinked }: { c: Customer; pending: string | null; onLinked: () => void }) {
  const [code, setCode] = useState(pending ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const replacing = !!c.sticker_code;

  const link = async () => {
    const k = stickerKey(code);
    if (!k) return setMsg({ text: "اكتب رقم الملصق (مثلاً AP-7K3Q9X).", ok: false });
    if (replacing && !confirm(`هالسيارة إلها ملصق ${c.sticker_code}. بدّك تبدّلو بـ ${k}؟`)) return;
    setBusy(true);
    const sb = getSupabase();
    const { data: st } = await sb.from("stickers").select("code").eq("code", k).maybeSingle();
    if (!st) {
      setBusy(false);
      return setMsg({ text: "هيدا الرقم مش من ملصقاتنا. شيّك عليه.", ok: false });
    }
    const { error } = await sb.from("customers").update({ sticker_code: k }).eq("id", c.id);
    setBusy(false);
    if (error) return setMsg({ text: error.code === "23505" ? "هيدا الملصق مربوط بسيارة تانية." : "ما زبط الربط، جرّب مرة تانية.", ok: false });
    setMsg({ text: `انربط الملصق ${k}.`, ok: true });
    onLinked();
  };

  return (
    <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 space-y-2">
      <p className="text-sm font-black text-slate-700">{replacing ? "تبديل الملصق" : "ربط ملصق QR بهالسيارة"}</p>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="AP-XXXXXX"
          dir="ltr"
          className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-3 py-2 font-black text-center uppercase outline-none focus:border-[#0B4F9F]"
        />
        <button onClick={link} disabled={busy} className="bg-slate-900 text-white px-4 rounded-xl font-black disabled:opacity-60">
          {busy ? "..." : "ربط"}
        </button>
      </div>
      <Msg m={msg} />
    </div>
  );
}

function CarCard({ c }: { c: Customer }) {
  const due =
    (c.next_oil_km != null && c.current_km != null && c.current_km >= c.next_oil_km) ||
    (c.next_oil_date != null && new Date(c.next_oil_date) <= new Date());
  const row = "flex justify-between items-center text-sm font-bold border-b border-slate-700 pb-2";
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2">
      <div className="text-2xl font-black tracking-widest border-b border-slate-700 pb-3" dir="ltr" style={{ fontFamily: "monospace" }}>
        {c.plate_number}
      </div>
      {(c.car || c.name) && <div className="text-slate-300 text-sm">{[c.car, c.name].filter(Boolean).join(" • ")}</div>}
      <div className="flex justify-between items-center text-sm font-bold border-b border-slate-700 pb-2"><span className="text-slate-400">الملصق</span><span dir="ltr" className={c.sticker_code ? "" : "text-slate-500"}>{c.sticker_code ?? "ما في"}</span></div>
      <div className={row}><span className="text-slate-400">آخر زيارة</span><span dir="ltr">{fmtDate(c.last_visit)}</span></div>
      <div className={row}><span className="text-slate-400">العداد</span><span>{fmtKm(c.current_km)}</span></div>
      <div className={row}><span className="text-slate-400">آخر زيت</span><span className="text-amber-400" dir="ltr">{c.oil_type || "غير محدد"}</span></div>
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="text-slate-400">الغيار الجاي</span>
        <span className={due ? "text-red-400" : "text-emerald-400"}>
          {c.next_oil_km != null ? fmtKm(c.next_oil_km) : "غير محدد"}
          {c.next_oil_date ? ` أو ${fmtDate(c.next_oil_date)}` : ""}
          {due ? " • صار وقتو" : ""}
        </span>
      </div>
      {c.whatsapp && (
        <a
          href={`https://wa.me/${c.whatsapp.startsWith("961") ? c.whatsapp : "961" + c.whatsapp.replace(/^0/, "")}`}
          target="_blank"
          rel="noopener"
          className="block text-center bg-emerald-600 rounded-xl py-2 font-black mt-2"
        >
          واتساب الزبون
        </a>
      )}
    </div>
  );
}

function AdminPanel() {
  const [plate, setPlate] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"oil" | "wash" | "history">("oil");
  // Sticker scanned but not yet linked to a car.
  const [pendingSticker, setPendingSticker] = useState<string | null>(null);
  const [showLink, setShowLink] = useState(false);

  const load = useCallback(async (p: string, by: "plate" | "sticker" = "plate") => {
    const key = by === "plate" ? plateKey(p) : stickerKey(p);
    if (!key) return;
    setLoading(true);
    setError("");
    setNotFound(false);
    const sb = getSupabase();
    const { data, error } = await sb
      .from("customers")
      .select(CUSTOMER_COLS)
      .eq(by === "plate" ? "plate_key" : "sticker_code", key)
      .maybeSingle();
    if (error) {
      setLoading(false);
      setCustomer(null);
      return setError("خطأ بالاتصال. تأكّد إنك مسجّل كموظف.");
    }
    if (!data && by === "sticker") {
      const { data: st } = await sb.from("stickers").select("code").eq("code", key).maybeSingle();
      setLoading(false);
      setCustomer(null);
      if (!st) return setError(`الملصق ${key} مش معروف.`);
      setPendingSticker(key);
      return;
    }
    setCustomer(data as Customer | null);
    setNotFound(!data);
    if (data) {
      const { data: v } = await sb
        .from("visits")
        .select("id,visited_at,service,wash_type,oil_product,oil_service,oil_added_kg,km,next_oil_km,next_oil_date,notes,staff_email")
        .eq("customer_id", (data as Customer).id)
        .order("visited_at", { ascending: false })
        .limit(20);
      setVisits((v as Visit[]) ?? []);
    }
    setLoading(false);
  }, []);

  // A scanned sticker opens /admin?sticker=AP-XXXXXX (older stickers: /admin?plate=...).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const st = q.get("sticker");
    const p = q.get("plate");
    if (st) load(st, "sticker");
    else if (p) {
      setPlate(p);
      load(p);
    }
  }, [load]);

  const tabBtn = (t: typeof tab, text: string) => (
    <button onClick={() => setTab(t)} className={`flex-1 py-2 rounded-xl font-black text-sm ${tab === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
      {text}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-slate-200">
        <div className="bg-[#071120] p-6 text-center border-b-4 border-[#F5B301]">
          <h1 className="text-2xl font-black text-white">لوحة الموظفين</h1>
          <p className="text-amber-400 text-xs mt-1 font-bold">زيت وغسيل • A.Petroleum</p>
          <InstallApp className="mt-3" />
        </div>

        <div className="p-5 space-y-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // The code printed under the QR (AP-XXXXXX) can be typed here too.
              const m = plate.trim().toUpperCase().match(/^AP[-\s]?([A-Z0-9]{6})$/);
              if (m) load(`AP-${m[1]}`, "sticker");
              else load(plate);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="رقم اللوحة أو كود الملصق"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-black text-center outline-none focus:border-[#0B4F9F] uppercase"
              dir="ltr"
            />
            <button type="submit" disabled={loading} className="bg-[#0B4F9F] text-white px-5 rounded-xl font-bold">
              {loading ? "..." : "بحث"}
            </button>
          </form>

          {error && <Msg m={{ text: error, ok: false }} />}

          {pendingSticker && !customer && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-sm font-bold text-amber-900">
              ملصق جديد <span dir="ltr">{pendingSticker}</span>. دوّر على اللوحة فوق: إذا السيارة مسجّلة منربطو فيها، وإذا لأ منسجّلها مع الملصق.
            </div>
          )}

          {notFound && !customer && (
            <>
              <p className="text-center text-sm font-bold text-slate-600">ما لقينا هيدي اللوحة. سجّلها:</p>
              <RegisterForm
                plate={plate}
                sticker={pendingSticker}
                onCreated={(c) => {
                  setPendingSticker(null);
                  setCustomer(c);
                  setNotFound(false);
                  setVisits([]);
                }}
              />
            </>
          )}

          {customer && (
            <>
              <CarCard c={customer} />
              {pendingSticker && customer.sticker_code !== pendingSticker ? (
                <StickerLink c={customer} pending={pendingSticker} onLinked={() => { setPendingSticker(null); load(customer.plate_number); }} />
              ) : !customer.sticker_code || showLink ? (
                <StickerLink c={customer} pending={null} onLinked={() => { setShowLink(false); load(customer.plate_number); }} />
              ) : (
                <button onClick={() => setShowLink(true)} className="text-xs font-bold text-slate-500 underline">تبديل الملصق</button>
              )}
              <div className="flex gap-2">
                {tabBtn("oil", "زيت")}
                {tabBtn("wash", "غسيل")}
                {tabBtn("history", `السجل (${visits.length})`)}
              </div>
              {tab === "oil" && <OilForm c={customer} onSaved={() => load(customer.plate_number)} />}
              {tab === "wash" && <WashForm c={customer} onSaved={() => load(customer.plate_number)} />}
              {tab === "history" && <History visits={visits} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGate>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black">جاري التحميل...</div>}>
        <AdminPanel />
      </Suspense>
    </AdminGate>
  );
}
