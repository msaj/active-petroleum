import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService, getTip } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_E164, SITE_URL, waLink } from "@/lib/site";
import { Blocks, Breadcrumbs, FaqList, LdJson } from "../../../components/ContentBlocks";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "website",
      locale: "ar_LB",
      siteName: "A.Petroleum",
      url: `/services/${s.slug}`,
      title: s.title,
      description: s.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

async function ServiceContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = s.related.map(getTip).filter((t) => t !== undefined);
  const url = `${SITE_URL}/services/${s.slug}`;

  return (
    <>
      <LdJson
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.title,
              serviceType: s.name,
              description: s.description,
              url,
              provider: { "@id": `${SITE_URL}/#station` },
              areaServed: { "@type": "Place", name: "المنية، شمال لبنان" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "الخدمات", item: `${SITE_URL}/#services` },
                { "@type": "ListItem", position: 3, name: s.name, item: url },
              ],
            },
          ],
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { href: "/#services", label: "الخدمات" }, { label: s.name }]} />
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">{s.title}</h1>
        <p className="text-lg leading-9 text-slate-700">{s.intro}</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a href={waLink(s.cta.message)} target="_blank" rel="noopener" className="bg-[#F5B301] hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl">
            {s.cta.label}
          </a>
          <a href={`tel:${PHONE_E164}`} className="border-2 border-[#0B4F9F] text-[#0B4F9F] font-extrabold px-5 py-2.5 rounded-xl">
            اتصل: <span className="num">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <Blocks blocks={s.body} />

      {(s.slug === "heating-diesel" || s.slug === "gas") && (
        <p className="text-slate-700">
          <Link href="/fuel-prices" className="font-extrabold text-[#0B4F9F] underline">
            شوف أسعار المحروقات اليوم
          </Link>
        </p>
      )}

      <FaqList faq={s.faq} />

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-black">اقرأ كمان</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {related.map((t) => (
              <li key={t.slug}>
                <Link href={`/tips/${t.slug}`} className="block bg-white border border-slate-200 rounded-2xl p-4 font-extrabold hover:border-[#0B4F9F]">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <ServiceContent params={props.params} />
    </article>
  );
}
