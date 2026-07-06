export const TRACK_ORDERS_ALLOWED_EMAILS = [
  "eleonorakulimova@gmail.com"
] as const;

export const isEmailInAllowlist = (
  email: string | undefined,
  allowlist: readonly string[],
) => {
  if (!email || !allowlist.length) return false;

  const normalized = email.toLowerCase().trim();

  return allowlist.some((item) => item.toLowerCase().trim() === normalized);
};
