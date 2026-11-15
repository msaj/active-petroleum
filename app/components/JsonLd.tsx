import { PHONE_E164, SITE_URL, SOCIAL } from "@/lib/site";

// Structured data describing the station for Google, Bing and AI assistants.
// Add "openingHoursSpecification" and "geo" once the exact hours and map pin are confirmed.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "A.Petroleum",
        alternateName: ["A Petroleum", "Active Petroleum", "اي بتروليوم"],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpg`,
        telephone: PHONE_E164,
        sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.tiktok],
      },
      {
        "@type": "GasStation",
        "@id": `${SITE_URL}/#station`,
        name: "A.Petroleum, محطة IPT المنية",
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        url: SITE_URL,
        image: `${SITE_URL}/station-day.jpg`,
        telephone: PHONE_E164,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Minieh",
          addressRegion: "North Lebanon",
          addressCountry: "LB",
        },
        areaServed: ["Minieh", "Danniyeh", "Tripoli", "North Lebanon"],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "EV charging", value: true },
          { "@type": "LocationFeatureSpecification", name: "Nitrogen tyre inflation", value: true },
          { "@type": "LocationFeatureSpecification", name: "Car wash", value: true },
          { "@type": "LocationFeatureSpecification", name: "Oil change", value: true },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
