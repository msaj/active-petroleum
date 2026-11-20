// Basic business facts used across the site. Change them here only.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://apetroleumlb.com").replace(/\/$/, "");

export const BRAND = "A.Petroleum";
export const BRAND_AR = "محطة A.Petroleum";
export const STATION_AR = "محطة IPT المنية";

export const PHONE_DISPLAY = "03 562 534";
export const PHONE_E164 = "+9613562534";
// WhatsApp number in international format without "+". Confirm it is the WhatsApp line.
export const WHATSAPP = "9613562534";

export const ADDRESS_AR = "المنية، شمال لبنان";
// Replace with the exact Google Maps link of the station when available.
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=A.Petroleum+IPT+Minieh+Lebanon";

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=100063526782499",
  instagram: "https://www.instagram.com/a.petroleum_/",
  tiktok: "https://www.tiktok.com/@a.petroleum",
};

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}
