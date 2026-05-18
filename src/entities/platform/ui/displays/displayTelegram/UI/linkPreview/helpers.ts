export interface TelegramPostRef {
  /** Format: "username" or "username/postId" */
  post: string;
  username: string;
  postId?: string;
}

/**
 * Returns the URL if the given content is essentially a single URL
 * (no other text, no other meaningful elements). Otherwise returns null.
 *
 * Tolerates many input formats:
 *   - plain "https://t.me/x/1"
 *   - "<p>https://t.me/x/1</p>"
 *   - "<p><a href=\"https://t.me/x/1\">https://t.me/x/1</a></p>"
 *   - trailing <br>, &nbsp;, whitespace, newlines, zero-width chars
 *   - tiptap "empty" markers like "<p></p>" around the link
 */
export const extractSoleLink = (
  content: string | undefined | null,
): string | null => {
  if (!content) return null;

  let text: string;
  if (typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(content, "text/html");
    text = doc.body.textContent || "";
  } else {
    text = content.replace(/<[^>]+>/g, "");
  }

  // Normalize: nbsp -> space, zero-width chars dropped, collapse whitespace, trim
  text = text
    .replace(/\u00a0/g, " ")
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return null;

  // Strip surrounding noise punctuation a user might accidentally have
  text = text.replace(/^[\s"'(\[<]+|[\s"')\]>]+$/g, "");
  // Trim trailing sentence punctuation that's not part of the URL
  text = text.replace(/[.,;:!?]+$/u, "");

  // Must be exactly one URL with no whitespace inside
  const urlRegex = /^https?:\/\/[^\s<>"']+$/i;
  if (!urlRegex.test(text)) return null;

  return text;
};

export const parseTelegramLink = (url: string): TelegramPostRef | null => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host !== "t.me" && host !== "telegram.me") return null;

    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return null;

    // t.me/s/username — preview page, normalize to /username
    if (parts[0] === "s" && parts.length > 1) parts.shift();

    // Invite links and bot starts have no embeddable preview
    if (parts[0].startsWith("+") || parts[0] === "joinchat") return null;

    const username = parts[0];
    const postId = parts[1] && /^\d+$/.test(parts[1]) ? parts[1] : undefined;
    const post = postId ? `${username}/${postId}` : username;
    return { post, username, postId };
  } catch {
    return null;
  }
};
