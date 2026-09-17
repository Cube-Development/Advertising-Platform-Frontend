import { parse as parseUuid, validate as isValidUuid } from "uuid";

export const BLOGIX_BOT_URL = "https://t.me/blogix_bot";
export const TELEGRAM_START_MAX_LENGTH = 64;
export const COLLECT_PAYLOAD_VERSION = 1;

export const uuidToBytes = (id: string): Uint8Array => {
  if (!isValidUuid(id)) {
    throw new Error("Invalid UUID");
  }
  return parseUuid(id);
};

const encodeCborArray = (items: Array<number | Uint8Array>): Uint8Array => {
  const bytes: number[] = [0x80 | items.length];

  for (const item of items) {
    if (typeof item === "number") {
      bytes.push(item);
      continue;
    }

    bytes.push(0x40 | item.length);
    for (let i = 0; i < item.length; i++) {
      bytes.push(item[i]);
    }
  }

  return Uint8Array.from(bytes);
};

export const bytesToBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

interface IEncodeTelegramCollectStart {
  projectId: string;
  orderId?: string;
}

export const encodeTelegramCollectStart = ({
  projectId,
  orderId,
}: IEncodeTelegramCollectStart): string => {
  const items: Array<number | Uint8Array> = [
    COLLECT_PAYLOAD_VERSION,
    uuidToBytes(projectId),
  ];

  if (orderId) {
    items.push(uuidToBytes(orderId));
  }

  const payload = bytesToBase64Url(encodeCborArray(items));
  if (payload.length > TELEGRAM_START_MAX_LENGTH) {
    throw new Error("Telegram start payload exceeds 64 characters");
  }

  return payload;
};

export const buildTelegramCollectUrl = (startPayload: string): string =>
  `${BLOGIX_BOT_URL}?start=${startPayload}`;
