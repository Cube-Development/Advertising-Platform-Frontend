// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Addresses: pathname only, string limits of the contract (FR-016).
import { LIMITS } from "./generated/contract-lite";

/** `value` cut to `max` UTF-16 units without splitting a surrogate pair. */
export function clip(value: string, max: number): string {
  if (value.length <= max) return value;
  const last = value.charCodeAt(max - 1);
  return value.slice(0, last >= 0xd800 && last <= 0xdbff ? max - 1 : max);
}

/** The part of `path` before `?` and `#`, clipped to LIMITS.P_MAX. */
export function pathOnly(path: string): string {
  return clip(path.split(/[?#]/)[0] ?? "", LIMITS.P_MAX);
}

/** Host of an absolute URL in lower case; '' when there is none. */
export function hostOf(url: string): string {
  const match = /^[a-z][\w+.-]*:\/\/(?:[^/?#@]*@)?([^/?#:]+)/i.exec(url);
  return match?.[1] ? match[1].toLowerCase() : "";
}
