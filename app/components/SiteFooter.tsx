import Link from "next/link";
import Logo from "./Logo";
import { ADDRESS_AR, MAPS_URL, PHONE_DISPLAY, PHONE_E164, SOCIAL } from "@/lib/site";
import { SERVICES } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-[#071120] text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="bg-white inline-block rounded-2xl px-3 py-2"><Logo small /></div>
          <p className="text-sm leading-7">محطة IPT بالمنية: وقود، توصيل مازوت وغاز، زيوت ELF، غسيل VIP، شحن سيارات كهربائية ونيتروجين.</p>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-white font-extrabold mb-2">صفحات</h2>
          <Link href="/fuel-prices" className="block hover:text-white">أسعار المحروقات اليوم في لبنان</Link>
          <Link href="/#services" className="block hover:text-white">الخدمات</Link>
          <Link href="/#order" className="block hover:text-white">اطلب مازوت أو غاز</Link>
          <Link href="/tips" className="block hover:text-white">نصائح لسيارتك</Link>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-white font-extrabold mb-2">الخدمات</h2>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="block hover:text-white">{s.name}</Link>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-white font-extrabold mb-2">تواصل</h2>
          <p>{ADDRESS_AR}</p>
          <a href={`tel:${PHONE_E164}`} className="block num hover:text-white text-right">{PHONE_DISPLAY}</a>
          <a href={MAPS_URL} target="_blank" rel="noopener" className="block hover:text-white">الموقع على الخريطة</a>
          <div className="flex gap-4 pt-2" dir="ltr">
            <a href={SOCIAL.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="hover:text-white">Instagram</a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener" className="hover:text-white">TikTok</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center text-xs py-4 text-slate-500" dir="ltr">© A.Petroleum, Minieh, Lebanon</div>
    </footer>
  );
}
