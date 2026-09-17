import { describe, expect, it } from "vitest";
import { parse as parseUuid } from "uuid";
import {
  BLOGIX_BOT_URL,
  COLLECT_PAYLOAD_VERSION,
  TELEGRAM_START_MAX_LENGTH,
  buildTelegramCollectUrl,
  encodeTelegramCollectStart,
  uuidToBytes,
} from "./encodeTelegramCollectStart";

const PROJECT_ID = "201dc6f5-4deb-4f62-b245-4b8b1fa7223f";
const ORDER_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const decodeBase64Url = (value: string): Uint8Array => {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

describe("uuidToBytes", () => {
  it("конвертирует UUID в 16 raw bytes", () => {
    const bytes = uuidToBytes(PROJECT_ID);
    expect(bytes).toHaveLength(16);
    expect(Array.from(bytes)).toEqual(Array.from(parseUuid(PROJECT_ID)));
  });

  it("бросает ошибку на невалидный UUID", () => {
    expect(() => uuidToBytes("not-a-uuid")).toThrow("Invalid UUID");
  });
});

describe("encodeTelegramCollectStart", () => {
  it("Universal: CBOR [1, project_id_bytes] без order_id", () => {
    const payload = encodeTelegramCollectStart({ projectId: PROJECT_ID });
    const decoded = decodeBase64Url(payload);
    const projectBytes = parseUuid(PROJECT_ID);

    expect(decoded[0]).toBe(0x82);
    expect(decoded[1]).toBe(COLLECT_PAYLOAD_VERSION);
    expect(decoded[2]).toBe(0x50);
    expect(Array.from(decoded.slice(3, 19))).toEqual(Array.from(projectBytes));
    expect(decoded).toHaveLength(19);
    expect(payload.includes("=")).toBe(false);
    expect(payload.length).toBeLessThanOrEqual(TELEGRAM_START_MAX_LENGTH);
  });

  it("Unique: CBOR [1, project_id_bytes, order_id_bytes]", () => {
    const payload = encodeTelegramCollectStart({
      projectId: PROJECT_ID,
      orderId: ORDER_ID,
    });
    const decoded = decodeBase64Url(payload);
    const projectBytes = parseUuid(PROJECT_ID);
    const orderBytes = parseUuid(ORDER_ID);

    expect(decoded[0]).toBe(0x83);
    expect(decoded[1]).toBe(COLLECT_PAYLOAD_VERSION);
    expect(decoded[2]).toBe(0x50);
    expect(Array.from(decoded.slice(3, 19))).toEqual(Array.from(projectBytes));
    expect(decoded[19]).toBe(0x50);
    expect(Array.from(decoded.slice(20, 36))).toEqual(Array.from(orderBytes));
    expect(decoded).toHaveLength(36);
    expect(payload.includes("=")).toBe(false);
    expect(payload.length).toBeLessThanOrEqual(TELEGRAM_START_MAX_LENGTH);
  });

  it("не кладёт tab/mode/is_unique/post_type в payload", () => {
    const payload = encodeTelegramCollectStart({
      projectId: PROJECT_ID,
      orderId: ORDER_ID,
    });
    const decoded = decodeBase64Url(payload);
    const asText = Array.from(decoded)
      .map((byte) => String.fromCharCode(byte))
      .join("");

    expect(asText.includes("tab")).toBe(false);
    expect(asText.includes("mode")).toBe(false);
    expect(asText.includes("is_unique")).toBe(false);
    expect(asText.includes("post_type")).toBe(false);
  });

  it("Universal и Unique payload помещаются в Telegram start <= 64", () => {
    const universal = encodeTelegramCollectStart({ projectId: PROJECT_ID });
    const unique = encodeTelegramCollectStart({
      projectId: PROJECT_ID,
      orderId: ORDER_ID,
    });

    expect(universal.length).toBeLessThanOrEqual(TELEGRAM_START_MAX_LENGTH);
    expect(unique.length).toBeLessThanOrEqual(TELEGRAM_START_MAX_LENGTH);
    expect(universal.includes("=")).toBe(false);
    expect(unique.includes("=")).toBe(false);
  });

  it("собирает URL t.me/blogix_bot?start=", () => {
    const payload = encodeTelegramCollectStart({ projectId: PROJECT_ID });
    expect(buildTelegramCollectUrl(payload)).toBe(
      `${BLOGIX_BOT_URL}?start=${payload}`,
    );
  });
});
