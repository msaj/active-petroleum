"use client";

import { useEffect, useState } from "react";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Offers "add to home screen": the native prompt on Android/Chrome, short instructions on iPhone.
export default function InstallApp({ className = "" }: { className?: string }) {
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as PromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || (!prompt && !ios)) return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={async () => {
          if (prompt) {
            await prompt.prompt();
            await prompt.userChoice;
            setPrompt(null);
          } else setHelp((h) => !h);
        }}
        className="text-xs font-bold bg-[#F5B301] text-slate-900 px-3 py-1.5 rounded-full"
      >
        ثبّت التطبيق على الموبايل
      </button>
      {help && (
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          من Safari: اكبس زر المشاركة تحت، بعدين &quot;Add to Home Screen&quot; أو &quot;إضافة إلى الشاشة الرئيسية&quot;.
        </p>
      )}
    </div>
  );
}
