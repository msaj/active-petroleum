import Link from "next/link";
import type { Block, Faq } from "@/lib/content";

/** Renders the editorial blocks defined in lib/content.ts. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-[17px] leading-9 text-slate-700">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="text-2xl font-black text-slate-900 pt-4">
                {b.text}
              </h2>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "list":
            return (
              <ul key={i} className="list-disc pr-6 space-y-1.5">
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="list-decimal pr-6 space-y-1.5">
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>
            );
          case "note":
            return (
              <p key={i} className="bg-amber-50 border-r-4 border-amber-400 rounded-xl px-4 py-3 text-slate-800 font-semibold">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export function FaqList({ faq }: { faq: Faq[] }) {
  if (!faq.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-black">أسئلة متكررة</h2>
      {faq.map((f, i) => (
        <details key={i} className="bg-white border border-slate-200 rounded-2xl p-4 group" open={i === 0}>
          <summary className="font-extrabold text-lg cursor-pointer list-none">{f.q}</summary>
          <p className="text-slate-600 leading-8 mt-2">{f.a}</p>
        </details>
      ))}
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="مسار الصفحة" className="text-sm text-slate-500">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && " / "}
          {it.href ? (
            <Link href={it.href} className="hover:underline">
              {it.label}
            </Link>
          ) : (
            it.label
          )}
        </span>
      ))}
    </nav>
  );
}

export function LdJson({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
