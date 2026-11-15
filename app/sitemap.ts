import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPriceHistory } from "@/lib/fuel";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const history = await getPriceHistory();
  const latest = history[0]?.table_date;
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/fuel-prices`, lastModified: latest, changeFrequency: "daily", priority: 0.9 },
    ...history.map((r) => ({
      url: `${SITE_URL}/fuel-prices/${r.table_date}`,
      lastModified: r.table_date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
