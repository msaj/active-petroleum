"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { PHONE_DISPLAY, PHONE_E164, ADDRESS_AR, waLink } from "@/lib/site";

const NAV = [
  { href: "/fuel-prices", label: "أسعار المحروقات" },
  { href: "/#services", label: "الخدمات" },
  { href: "/#order", label: "اطلب مازوت أو غاز" },
  { href: "/#oils", label: "الزيوت" },
  { href: "/tips", label: "نصائح" },
  { href: "/#contact", label: "تواصل" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#071120] text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap justify-between items-center gap-2">
          <span className="font-semibold">{ADDRESS_AR} • <a href={`tel:${PHONE_E164}`} className="num hover:text-white">{PHONE_DISPLAY}</a></span>
          <span className="hidden md:flex items-center gap-4 font-bold tracking-wide">
            <span className="text-amber-400">IPT OFFICIAL PARTNER</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">QUANTUM FUELS</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400">ELF LUBRICANTS</span>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" aria-label="A.Petroleum الصفحة الرئيسية">
            <Logo />
          </Link>

          <nav aria-label="القائمة الرئيسية" className="hidden lg:flex items-center gap-6 text-[15px] font-bold text-slate-700">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-[#0B4F9F]">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink("مرحبا محطة A.Petroleum المنية، بدي استفسر عن:")}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-extrabold text-sm px-4 py-2.5 rounded-xl"
            >
              اطلب عالواتساب
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "سكّر القائمة" : "افتح القائمة"}
              className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="القائمة" className="lg:hidden border-t border-slate-200 bg-white">
            <ul className="max-w-7xl mx-auto px-4 py-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base font-bold text-slate-800 border-b border-slate-100">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
