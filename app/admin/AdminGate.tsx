"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let client: SupabaseClient | null = null;
/** Created on first use in the browser, so the page can be prerendered without keys. */
function getSupabase() {
  if (!client) {
    client = createClient(SB_URL, KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" },
    });
  }
  return client;
}

const TokenContext = createContext<string>("");

/** Access token of the signed-in staff member, to send as Authorization to Supabase. */
export function useStaffToken() {
  return useContext(TokenContext);
}

/** Shows a sign-in form (email link, no password) until a staff member is signed in. */
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!SB_URL || !KEY) {
      setReady(true);
      return;
    }
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    const { error } = await getSupabase().auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/admin${window.location.search}` },
    });
    if (error) {
      setState("error");
      setError("ما قدرنا نبعت الرابط. تأكد إنو الإيميل مسجّل كموظف.");
    } else {
      setState("sent");
    }
  };

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center font-black">جاري التحميل...</div>;
  }

  if (!session) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <form onSubmit={sendLink} className="w-full max-w-sm bg-white rounded-2xl shadow p-6 space-y-4">
          <h1 className="text-xl font-black">دخول الموظفين</h1>
          <p className="text-sm text-slate-600 leading-6">اكتب إيميلك المسجّل، ومنبعتلك رابط دخول. ما في كلمة سر.</p>
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full border border-slate-300 rounded-xl px-3 py-2.5"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="w-full bg-[#0B4F9F] text-white font-extrabold rounded-xl py-2.5 disabled:opacity-60"
          >
            {state === "sending" ? "عم نبعت..." : "ابعتلي رابط الدخول"}
          </button>
          {state === "sent" && <p className="text-sm font-bold text-emerald-700">بعتنالك رابط عالإيميل. افتحه من نفس الجهاز.</p>}
          {state === "error" && <p className="text-sm font-bold text-red-600">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <TokenContext.Provider value={session.access_token}>
      <div dir="rtl" className="bg-slate-900 text-white text-xs px-4 py-2 flex justify-between items-center">
        <span>مسجّل: {session.user.email}</span>
        <button onClick={() => getSupabase().auth.signOut()} className="underline">تسجيل خروج</button>
      </div>
      {children}
    </TokenContext.Provider>
  );
}
