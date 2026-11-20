import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TIPS, getService, getTip } from "@/lib/content";
import { formatArabicDate } from "@/lib/fuel";
import { SITE_URL, waLink } from "@/lib/site";
import { Blocks, Breadcrumbs, FaqList, LdJson } from "../../../components/ContentBlocks";

export function generateStaticParams() {
  return TIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTip(slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/tips/${t.slug}` },
    openGraph: {
      type: "article",
      locale: "ar_LB",
      siteName: "A.Petroleum",
      url: `/tips/${t.slug}`,
      title: t.title,
      description: t.description,
      publishedTime: t.published,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

async function TipContent({ params }: { params: PageProps<"/tips/[slug]">["params"] }) {
  const { slug } = await params;
  const t = getTip(slug);
  if (!t) notFound();
  const services = t.related.map(getService).filter((s) => s !== undefined);
  const others = TIPS.filter((x) => x.slug !== t.slug).slice(0, 4);
  const url = `${SITE_URL}/tips/${t.slug}`;

  return (
    <>
      <LdJson
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: t.title,
              description: t.description,
              inLanguage: "ar",
              datePublished: t.published,
              dateModified: t.published,
              mainEntityOfPage: url,
              image: `${SITE_URL}/og.jpg`,
              author: { "@id": `${SITE_URL}/#org` },
              publisher: { "@id": `${SITE_URL}/#org` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "نصائح", item: `${SITE_URL}/tips` },
                { "@type": "ListItem", position: 3, name: t.title, item: url },
              ],
            },
          ],
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { href: "/tips", label: "نصائح" }, { label: t.title }]} />
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.4]">{t.title}</h1>
        <p className="text-sm text-slate-500">A.Petroleum، محطة IPT المنية • {formatArabicDate(t.published)}</p>
        <p className="text-lg leading-9 text-slate-800 bg-white border border-slate-200 rounded-2xl p-5 font-semibold">{t.summary}</p>
      </header>

      <Blocks blocks={t.body} />

      {t.slug === "95-or-98" && (
        <p>
          <Link href="/fuel-prices" className="font-extrabold text-[#0B4F9F] underline">
            سعر البنزين 95 و98 اليوم
          </Link>
        </p>
      )}

      <FaqList faq={t.faq} />

      <section className="bg-[#0B4F9F] text-white rounded-2xl p-5 space-y-3">
        <p className="font-extrabold text-lg">عندك سؤال عن سيارتك؟</p>
        <p className="text-blue-100">ابعتلنا عالواتساب ومنجاوبك.</p>
        <div className="flex flex-wrap gap-3">
          <a href={waLink(`مرحبا A.Petroleum، عندي سؤال عن: ${t.title}`)} target="_blank" rel="noopener" className="bg-[#F5B301] text-slate-950 font-black px-5 py-2.5 rounded-xl">
            اسألنا عالواتساب
          </a>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="border-2 border-white/70 font-extrabold px-5 py-2 rounded-xl">
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black">نصائح تانية</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/tips/${o.slug}`} className="block bg-white border border-slate-200 rounded-2xl p-4 font-extrabold hover:border-[#0B4F9F]">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function TipPage(props: PageProps<"/tips/[slug]">) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Suspense fallback={<p className="text-slate-500">جاري التحميل...</p>}>
        <TipContent params={props.params} />
      </Suspense>
    </article>
  );
}
