import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "A.Petroleum | محطة IPT المنية: وقود، مازوت، غاز، زيت وغسيل",
    template: "%s | A.Petroleum المنية",
  },
  description:
    "محطة A.Petroleum بالمنية، شمال لبنان: أسعار المحروقات اليوم، توصيل مازوت التدفئة والغاز، تغيير زيت ELF، غسيل VIP، شحن السيارات الكهربائية ونيتروجين للدواليب.",
  applicationName: "A.Petroleum",
  keywords: ["A.Petroleum", "محطة بنزين المنية", "IPT المنية", "أسعار المحروقات اليوم لبنان", "مازوت تدفئة", "تغيير زيت", "غسيل سيارات المنية"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_LB",
    siteName: "A.Petroleum",
    url: "/",
    title: "A.Petroleum | محطة IPT المنية",
    description: "أسعار المحروقات اليوم، توصيل مازوت وغاز، زيوت ELF وغسيل VIP بالمنية.",
    images: [{ url: "/station-day.jpg", width: 1200, height: 630, alt: "محطة A.Petroleum بالمنية" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B4F9F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A]">{children}</body>
    </html>
  );
}
