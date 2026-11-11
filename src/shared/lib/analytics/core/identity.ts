// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Visitor bx_vid (FR-005) and the identify mark bx_uid (FR-008).
import {
  getCookie,
  readJson,
  setCookie,
  writeJson,
  type Store,
} from "./storage";
import { isUuidV7, uuidv7 } from "./uuid";

/** 400 days in seconds (plan 7.3, 10.2). */
export const VID_MAX_AGE_SEC = 34_560_000;

const VID = "bx_vid";

/** bx_vid: cookie → localStorage → new UUIDv7; written to both (the cookie first of all). */
export function visitorId(store: Store, secure: boolean): string {
  const fromCookie = getCookie(VID);
  const fromStore = store.get(VID);
  const vid = isUuidV7(fromCookie)
    ? fromCookie
    : isUuidV7(fromStore)
      ? fromStore
      : uuidv7();
  setCookie(VID, vid, VID_MAX_AGE_SEC, secure);
  store.set(VID, vid);
  return vid;
}

export interface UidMark {
  uid: string;
  sid: string;
}

const UID = "bx_uid";

/** The last identify: `uid` and the visit it was sent in. */
export function readUid(store: Store): UidMark | null {
  const mark = readJson<UidMark>(store, UID);
  return mark && typeof mark.uid === "string" && typeof mark.sid === "string"
    ? mark
    : null;
}

export function writeUid(store: Store, mark: UidMark): void {
  writeJson(store, UID, mark);
}

export function clearUid(store: Store): void {
  store.del(UID);
}
