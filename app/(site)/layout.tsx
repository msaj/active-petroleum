import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import MobileBar from "../components/MobileBar";
import JsonLd from "../components/JsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full pb-20 md:pb-0">
      <JsonLd />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileBar />
    </div>
  );
}
