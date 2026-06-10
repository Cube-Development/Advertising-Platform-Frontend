const MENTION_REGEX = /^@([a-zA-Z0-9_]+)$/;
const NUMBERED_PREFIX_REGEX = /^\d+\.\s*/;
const PARSE_TRIGGER_REGEX = /https?:\/\/t\.me\/|@[a-zA-Z0-9_]+/i;
const TME_URL_MARKER = /https?:\/\/t\.me\//gi;
const GLOBAL_MENTION_REGEX = /@([a-zA-Z0-9_]+)/g;

function extractTmeUrls(text: string): string[] {
  const starts: number[] = [];
  let match: RegExpExecArray | null;

  while ((match = TME_URL_MARKER.exec(text)) !== null) {
    starts.push(match.index);
  }

  if (starts.length === 0) return [];

  return starts.map((start, index) => {
    const end = index + 1 < starts.length ? starts[index + 1] : text.length;
    return text.slice(start, end).trim();
  });
}

function extractMentions(text: string): string[] {
  const results: string[] = [];
  const lines = text.split(/\r?\n/);

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    line = line.replace(NUMBERED_PREFIX_REGEX, "").trim();
    if (!line) continue;

    if (MENTION_REGEX.test(line)) {
      results.push(line.slice(1));
    }
  }

  if (results.length > 0) return results;

  let match: RegExpExecArray | null;
  while ((match = GLOBAL_MENTION_REGEX.exec(text)) !== null) {
    results.push(match[1]);
  }

  return results;
}

export function parseCatalogSearchInput(
  input: string,
): string | string[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (!PARSE_TRIGGER_REGEX.test(trimmed)) {
    return trimmed;
  }

  const urls = extractTmeUrls(trimmed);
  if (urls.length > 0) return urls;

  const mentions = extractMentions(trimmed);
  if (mentions.length > 0) return mentions;

  return trimmed;
}

export function formatSearchDisplay(
  value: string | string[] | undefined,
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.map((v) => (v.startsWith("http") ? v : `@${v}`)).join("\n");
}
