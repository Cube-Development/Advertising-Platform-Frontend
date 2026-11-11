// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// UUIDv7 (specs/004-tracker FR-004, research R7): 48 bits of milliseconds, a 12-bit counter in
// rand_a (RFC 9562, method 1), variant 10, 62 random bits. Random bits come from
// crypto.getRandomValues, without it from Math.random (old WebViews); crypto.randomUUID is not used:
// it is missing outside a secure context.
import { safe } from "./storage";

const UUID_V7 =
  /^[\da-f]{8}-[\da-f]{4}-7[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

let lastMs = -1;
let seq = 0;

const hex = (value: number, length: number) =>
  value.toString(16).padStart(length, "0");

function randomBytes(count: number): number[] {
  const crypted = safe(
    () => crypto.getRandomValues(new Uint8Array(count)),
    null,
  );
  const bytes: number[] = [];
  for (let i = 0; i < count; i++)
    bytes.push(crypted ? (crypted[i] ?? 0) : (Math.random() * 256) | 0);
  return bytes;
}

/** A new UUIDv7; ids of one page grow strictly, even if the clock goes back. */
export function uuidv7(): string {
  const bytes = randomBytes(10);
  const now = Date.now();
  if (now > lastMs) {
    lastMs = now;
    // A new millisecond starts the counter at a random value in the lower half.
    seq = (((bytes[0] ?? 0) << 8) | (bytes[1] ?? 0)) & 0x7ff;
  } else if (++seq > 0xfff) {
    lastMs++;
    seq = 0;
  }
  const time = hex(lastMs, 12);
  const tail = bytes
    .slice(2)
    .map((byte, i) => hex(i === 0 ? (byte & 0x3f) | 0x80 : byte, 2))
    .join("");
  return `${time.slice(0, 8)}-${time.slice(8)}-7${hex(seq, 3)}-${tail.slice(0, 4)}-${tail.slice(4)}`;
}

/** True for a UUIDv7 string (version 7, variant 10). */
export function isUuidV7(value: unknown): value is string {
  return typeof value === "string" && UUID_V7.test(value);
}
