export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`${small ? "w-10 h-10" : "w-12 h-12"} rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center p-1.5`}>
        <svg viewBox="0 0 120 100" className="w-full h-full" aria-hidden="true">
          <path d="M62 8 L30 72 L45 72 L62 36 L70 52 L79 42 Z" fill="#F5B301" />
          <path d="M28 74 C52 68, 75 50, 96 22 C82 52, 60 70, 28 74 Z" fill="#F5B301" />
          <path d="M15 88 C45 84, 68 70, 84 48 L108 88 L48 88 L56 77 L86 77 L78 62 C62 77, 40 86, 15 88 Z" fill="#0B4F9F" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span dir="ltr" className={`${small ? "text-xl" : "text-2xl"} font-black tracking-tight`}>
          <span className="text-[#F5B301]">A.</span>
          <span className="text-[#0B4F9F]">Petroleum</span>
        </span>
        <span className="text-[11px] font-bold text-slate-500">محطة IPT المنية</span>
      </span>
    </span>
  );
}
