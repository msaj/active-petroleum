import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة الموظفين",
  robots: { index: false, follow: false },
  manifest: "/admin.webmanifest",
  appleWebApp: { capable: true, title: "AP الموظفين", statusBarStyle: "default" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
