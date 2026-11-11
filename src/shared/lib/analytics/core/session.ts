// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Visit bx_sid (FR-006) and the visit fraction for `sample` (FR-011, research R8). The visit is read
// from localStorage on every event, so tabs of one browser share it.
import { readJson, writeJson, type Store } from "./storage";
import { isUuidV7, uuidv7 } from "./uuid";

export const VISIT_TIMEOUT_MS = 1_800_000;

const SID = "bx_sid";

export interface Visit {
  id: string;
  start: number;
  last: number;
  /** The first page_view of the visit was sent (FR-017). */
  src?: true;
}

export interface Touch {
  visit: Visit;
  isNew: boolean;
}

function isVisit(value: Visit | null): value is Visit {
  return (
    value !== null &&
    isUuidV7(value.id) &&
    typeof value.start === "number" &&
    typeof value.last === "number"
  );
}

/** Reads bx_sid, opens a new visit when there is none or it is idle > 30 min, updates `last`. */
export function touchSession(store: Store, now: number): Touch {
  const saved = readJson<Visit>(store, SID);
  const alive = isVisit(saved) && now - saved.last <= VISIT_TIMEOUT_MS;
  const visit: Visit = alive
    ? { ...saved, last: now }
    : { id: uuidv7(), start: now, last: now };
  writeJson(store, SID, visit);
  return { visit, isNew: !alive };
}

/** Marks that the first page_view of the visit was sent (FR-017). */
export function markSourced(store: Store, visit: Visit): void {
  const saved = readJson<Visit>(store, SID);
  visit.src = true;
  writeJson(
    store,
    SID,
    isVisit(saved) && saved.id === visit.id ? { ...saved, src: true } : visit,
  );
}

/** Share of the visit in [0, 1): the last 32 random bits of the UUIDv7 (R8). */
export function visitFraction(sid: string): number {
  return parseInt(sid.slice(-8), 16) / 4294967296;
}
