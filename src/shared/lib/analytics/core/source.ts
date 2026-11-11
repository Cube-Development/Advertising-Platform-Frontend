// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Source of the first page_view of a visit opened by a page load (FR-016, FR-017; data-model
// «Источник»). Only utm_*, click ids and tgWebAppStartParam are read from the query; the hash never.
import {
  LIMITS,
  type ClickIdType,
  type SourceFields,
  type Utm,
} from "./generated/contract-lite";
import { clip, hostOf } from "./url";

/** Return hosts, plan 10.6 (checked 2026-11-11, research R10); `*.didox.uz` as a suffix. */
export const RETURN_HOSTS: readonly string[] = [
  "accounts.google.com",
  "checkout.paycom.uz",
  "payme.uz",
  "my.click.uz",
  "click.uz",
  "didox.uz",
];

const UTM: ReadonlyArray<readonly [keyof Utm, string]> = [
  ["s", "utm_source"],
  ["m", "utm_medium"],
  ["c", "utm_campaign"],
  ["ct", "utm_content"],
  ["t", "utm_term"],
];
const CLICK_IDS: readonly ClickIdType[] = ["gclid", "fbclid", "yclid"];

export function isReturnHost(host: string): boolean {
  return RETURN_HOSTS.indexOf(host) >= 0 || host.endsWith(".didox.uz");
}

/** Source fields of a visit opened by a page load: `href` of the page, `document.referrer`. */
export function landingSource(href: string, referrer: string): SourceFields {
  const page = href.split("#")[0] ?? "";
  const query = new URLSearchParams(
    page.indexOf("?") >= 0 ? page.slice(page.indexOf("?") + 1) : "",
  );
  const source: SourceFields = {};
  const utm: Utm = {};
  let marked = false;
  for (const [key, param] of UTM) {
    const value = query.get(param);
    if (value) {
      utm[key] = clip(value, LIMITS.UTM_FIELD_MAX);
      source.utm = utm;
      marked = true;
    }
  }
  for (const id of CLICK_IDS) {
    if (query.get(id) !== null) {
      source.ck = id;
      marked = true;
      break;
    }
  }
  const tgs = query.get("tgWebAppStartParam");
  if (tgs) {
    source.tgs = clip(tgs, LIMITS.TGS_MAX);
    marked = true;
  }
  const ref = hostOf(referrer);
  const own =
    ref === hostOf(href) || ref === "blogix.uz" || ref.endsWith(".blogix.uz");
  if (ref && !own && !isReturnHost(ref)) source.ref = clip(ref, LIMITS.REF_MAX);
  else if (ref && !marked) source.ret = true;
  return source;
}
