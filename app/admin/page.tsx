"use client";

import React, { useState, useEffect, Suspense } from "react";

function AdminPanel() {
  const [plate, setPlate] = useState("");
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [newKm, setNewKm] = useState("");
  
  // State jadide lal zrar l-saree3a
  const [serviceType, setServiceType] = useState("oil_only");
  const [otherService, setOtherService] = useState("add_1l");

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plateParam = params.get("plate");
    if (plateParam) {
      setPlate(plateParam);
      fetchCustomer(plateParam);
    }
  }, []);

  const fetchCustomer = async (searchPlate: string) => {
    if (!searchPlate) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    setCustomer(null);

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/customers?plate_number=eq.${encodeURIComponent(searchPlate)}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY || "",
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      const data = await res.json();
      
      if (data && data.length > 0) {
        setCustomer(data[0]);
      } else {
        setMessage({ text: "السيارة غير مسجلة بالنظام. يرجى تسجيلها أولاً.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "خطأ بالاتصال بقاعدة البيانات.", type: "error" });
    }
    setLoading(false);
  };

  const updateWashCount = async () => {
    if (!customer) return;
    setLoading(true);
    let newCount = customer.wash_count + 1;
    let alertMsg = "تم إضافة ختم غسيل بنجاح!";
    
    if (newCount >= 6) {
      newCount = 0; 
      alertMsg = "مبروك! هذه الغسلة مجانية بالكامل. تم تصفير العداد للبدء من جديد.";
    }

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY || "",
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ wash_count: newCount, last_visit: new Date().toISOString() })
      });
      setCustomer({ ...customer, wash_count: newCount });
      setMessage({ text: alertMsg, type: "success" });
    } catch (err) {
      setMessage({ text: "فشل التحديث، حاول مجدداً.", type: "error" });
    }
    setLoading(false);
  };

  const updateOil = async () => {
    if (!customer || !newKm) {
        setMessage({ text: "الرجاء إدخال العداد الجديد أولاً.", type: "error" });
        return;
    }
    setLoading(true);
    
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY || "",
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ current_km: parseInt(newKm), last_visit: new Date().toISOString() })
      });
      setCustomer({ ...customer, current_km: parseInt(newKm) });
      
      let serviceName = serviceType === "oil_only" ? "غيار زيت" : serviceType === "oil_filter" ? "زيت مع فلتر" : "خدمات أخرى";

      setMessage({ text: `تم تسجيل خدمة (${serviceName}) وتحديث العداد بنجاح!`, type: "success" });
      setNewKm("");
    } catch (err) {
      setMessage({ text: "فشل التحديث، حاول مجدداً.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-slate-200">
        
        <div className="bg-[#071120] p-6 text-center border-b-4 border-[#F5B301]">
          <h1 className="text-2xl font-black text-white">لوحة الموظفين المخفية</h1>
          <p className="text-amber-400 text-xs mt-1 font-bold">A.Petroleum VIP System</p>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="رقم اللوحة (مثال: M 458921)" 
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-black text-center text-slate-900 outline-none focus:border-[#0B4F9F] transition uppercase"
              dir="ltr"
            />
            <button 
              onClick={() => fetchCustomer(plate)}
              disabled={loading}
              className="bg-[#0B4F9F] text-white px-5 rounded-xl font-bold shadow-md"
            >
              {loading ? "..." : "بحث"}
            </button>
          </div>

          {message.text && (
            <div className={`p-3 rounded-xl text-sm font-bold text-center mb-6 ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
              {message.text}
            </div>
          )}

          {customer && (
            <div className="space-y-6 animate-fade-in">
              {/* Bataka M3loumat l-Siyara */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-inner">
                <div className="text-amber-400 text-[10px] font-black tracking-widest uppercase mb-1">VIP Customer</div>
                <div className="text-2xl font-black tracking-widest border-b border-slate-700 pb-3 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }} dir="ltr">
                  {customer.plate_number}
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">آخر زيارة:</span>
                  <span>{new Date(customer.last_visit).toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              {/* T7akkom l-Ghasil */}
              <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-5">
                <h3 className="font-black text-[#0B4F9F] mb-3">ولاء الغسيل (VIP Wash)</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-slate-600">رصيد الأختام الحالي:</span>
                  <span className="bg-white border-2 border-[#F5B301] text-slate-900 px-3 py-1 rounded-lg font-black text-lg">
                    {customer.wash_count} / 5
                  </span>
                </div>
                <button 
                  onClick={updateWashCount}
                  disabled={loading}
                  className="w-full bg-[#0B4F9F] hover:bg-[#083B78] text-white py-3 rounded-xl font-black text-lg shadow-md transition"
                >
                  + إضافة ختم غسيل 🧼
                </button>
              </div>

              {/* T7akkom l-Zayt w l-Khedamat */}
              <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-5">
                <h3 className="font-black text-amber-800 mb-3">سجل الزيوت والخدمات</h3>
                
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm font-bold text-slate-600">آخر عداد للسيارة:</span>
                  <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-amber-200" dir="ltr">
                    {customer.current_km.toLocaleString()} KM
                  </span>
                </div>

                <div className="space-y-4">
                  
                  {/* Zrar l-Khedamat l-Saree3a (Buttons) */}
                  <div className="bg-white p-3 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-black text-slate-400 block mb-2 uppercase tracking-wider">1. اختر الخدمة:</span>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button 
                        onClick={() => setServiceType("oil_only")}
                        className={`py-2.5 px-2 rounded-xl font-black text-sm border-2 transition ${serviceType === "oil_only" ? "bg-[#0B4F9F] text-white border-[#0B4F9F] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        غيار زيت 🛢️
                      </button>
                      <button 
                        onClick={() => setServiceType("oil_filter")}
                        className={`py-2.5 px-2 rounded-xl font-black text-sm border-2 transition ${serviceType === "oil_filter" ? "bg-[#0B4F9F] text-white border-[#0B4F9F] shadow-md" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        زيت + فلتر ⚙️
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setServiceType("other")}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-sm border-2 transition flex justify-between items-center ${serviceType === "other" ? "bg-amber-100 text-amber-900 border-amber-400 shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                    >
                      <span>خدمات أخرى (Others) ➕</span>
                      <span className="text-[10px]">{serviceType === "other" ? "▼" : "▶"}</span>
                    </button>

                    {/* La2i7at l-Others (Btebayan bas lama tekbos Others) */}
                    {serviceType === "other" && (
                      <div className="mt-2 animate-fade-in">
                        <select 
                          value={otherService}
                          onChange={(e) => setOtherService(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-amber-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-800 outline-none focus:border-amber-500"
                        >
                          <option value="add_1l">إضافة 1 كيلو زيت</option>
                          <option value="add_2l">إضافة 2 كيلو زيت</option>
                          <option value="add_3l">إضافة 3 كيلو زيت</option>
                          <option value="filter_only">تغيير فلتر فقط</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Idkhal l-KM w l-7ofoz */}
                  <div className="pt-1">
                    <span className="text-[11px] font-black text-slate-400 block mb-2 uppercase tracking-wider">2. حدّث العداد:</span>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="العداد الجديد..." 
                        value={newKm}
                        onChange={(e) => setNewKm(e.target.value)}
                        className="flex-1 bg-white border-2 border-amber-200 rounded-xl px-3 py-2 font-black text-center text-lg outline-none focus:border-[#F5B301] shadow-inner"
                        dir="ltr"
                      />
                      <button 
                        onClick={updateOil}
                        disabled={loading}
                        className="bg-[#F5B301] text-slate-900 px-5 py-2 rounded-xl font-black text-lg shadow-md hover:bg-amber-400 transition"
                      >
                        حفظ ✓
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black">جاري التحميل...</div>}>
      <AdminPanel />
    </Suspense>
  );
}
