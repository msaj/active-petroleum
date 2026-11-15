/**
 * Headers for Supabase REST calls. Works with both key formats:
 * legacy keys (anon, service_role) are JWTs and also go in Authorization;
 * new keys (sb_publishable_..., sb_secret_...) are not JWTs and go in apikey only.
 */
export function supabaseHeaders(key: string): Record<string, string> {
  return key.startsWith("sb_") ? { apikey: key } : { apikey: key, Authorization: `Bearer ${key}` };
}
