import i18n from "@shared/config/i18n";
import { toast } from "@shared/ui";

import { AI_POST_BASE_URL, GENERATE_POST_ENDPOINT } from "../config";
import { IGeneratePostRequest, IGenerationStreamHandlers } from "../types";

const HTTP_TOO_MANY_REQUESTS = 429;

const BASE_URL =
  (import.meta.env.VITE_AI_BASE_URL as string | undefined) || AI_POST_BASE_URL;

const SSE_DELIMITER = "\n\n";
const SSE_DATA_PREFIX = "data: ";
const SSE_DONE_TOKEN = "[DONE]";

const stripCodeFences = (raw: string): string =>
  raw
    .replace(/^```[a-zA-Z]*\r?\n?/, "")
    .replace(/\r?\n?```\s*$/, "")
    .trim();

export class PostGenerationAbortError extends Error {
  constructor() {
    super("Post generation aborted");
    this.name = "PostGenerationAbortError";
  }
}

export class PostGenerationStreamError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "PostGenerationStreamError";
    this.status = status;
  }
}

const showGenerationErrorToast = (status?: number) => {
  const title =
    status === HTTP_TOO_MANY_REQUESTS
      ? i18n.t("create_order.generation.errors.too_many_requests")
      : i18n.t("create_order.generation.errors.unavailable");

  toast({
    variant: "warning",
    title,
  });
};

/**
 * Стримит ответ AI генерации поста по SSE.
 * Каждый chunk возвращается через onChunk колбэк.
 * Контракт: `data: "<chunk>"\n\n` ... `data: [DONE]\n\n`.
 */
export const generatePostStream = async (
  payload: IGeneratePostRequest,
  { onChunk, onDone, onError, signal }: IGenerationStreamHandlers,
): Promise<string> => {
  let accumulated = "";

  try {
    const response = await fetch(`${BASE_URL}${GENERATE_POST_ENDPOINT}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok || !response.body) {
      const text = await response.text().catch(() => "");
      throw new PostGenerationStreamError(
        text || `Generation request failed with status ${response.status}`,
        response.status,
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split(SSE_DELIMITER);
        buffer = events.pop() ?? "";

        for (const event of events) {
          for (const line of event.split("\n")) {
            if (!line.startsWith(SSE_DATA_PREFIX)) continue;
            const data = line.slice(SSE_DATA_PREFIX.length);

            if (data === SSE_DONE_TOKEN) {
              const final = stripCodeFences(accumulated);
              onDone?.();
              return final;
            }

            try {
              const parsed = JSON.parse(data);
              if (typeof parsed === "string") {
                accumulated += parsed;
                onChunk(parsed);
              } else if (parsed && typeof parsed === "object") {
                if ("error" in parsed && parsed.error) {
                  throw new PostGenerationStreamError(String(parsed.error));
                }
              }
            } catch (parseError) {
              if (parseError instanceof PostGenerationStreamError) {
                throw parseError;
              }
              // тихо пропускаем кривые SSE-куски, парсер устойчив к шуму
            }
          }
        }
      }
    } finally {
      try {
        reader.releaseLock();
      } catch {
        // noop
      }
    }

    const final = stripCodeFences(accumulated);
    onDone?.();
    return final;
  } catch (error) {
    if (
      (error instanceof DOMException && error.name === "AbortError") ||
      (error as Error)?.name === "AbortError"
    ) {
      const abortError = new PostGenerationAbortError();
      onError?.(abortError);
      throw abortError;
    }

    const normalized =
      error instanceof PostGenerationStreamError
        ? error
        : error instanceof Error
          ? error
          : new PostGenerationStreamError(String(error));

    const status =
      normalized instanceof PostGenerationStreamError
        ? normalized.status
        : undefined;

    showGenerationErrorToast(status);
    onError?.(normalized);
    throw normalized;
  }
};
