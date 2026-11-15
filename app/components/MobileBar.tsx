import { MAPS_URL, PHONE_E164, waLink } from "@/lib/site";

export default function MobileBar() {
  return (
    <nav aria-label="تواصل سريع" className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 px-3 pt-2 pb-3 grid grid-cols-3 gap-2">
      <a href={waLink("مرحبا محطة A.Petroleum المنية، بدي استفسر عن:")} target="_blank" rel="noopener" className="bg-[#F5B301] text-slate-950 rounded-xl py-2 flex flex-col items-center text-xs font-extrabold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>
        واتساب
      </a>
      <a href={`tel:${PHONE_E164}`} className="bg-[#0B4F9F] text-white rounded-xl py-2 flex flex-col items-center text-xs font-extrabold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
        اتصل
      </a>
      <a href={MAPS_URL} target="_blank" rel="noopener" className="bg-slate-100 text-slate-900 rounded-xl py-2 flex flex-col items-center text-xs font-extrabold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
        خدني عالمحطة
      </a>
    </nav>
  );
}
