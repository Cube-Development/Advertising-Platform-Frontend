import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PostGenerationAbortError,
  PostGenerationStreamError,
  generatePostStream,
} from "./generatePost.service";

const analytics = vi.hoisted(() => ({ track: vi.fn() }));

vi.mock("@shared/lib/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/lib/analytics")>()),
  getAnalytics: () => ({
    track: analytics.track,
    page: vi.fn(),
    identify: vi.fn(),
    logout: vi.fn(),
    flush: vi.fn(),
    destroy: vi.fn(),
  }),
}));

const PAYLOAD = {} as Parameters<typeof generatePostStream>[0];

const stubFetch = (respond: () => Promise<Response>) =>
  vi.stubGlobal("fetch", vi.fn(respond));

const generated = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t === "post_ai_generate");

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("generatePostStream analytics (спека 005 Q17)", () => {
  it("a finished stream: post_ai_generate ok with the duration in ms; a cancelled one after it sends nothing", async () => {
    stubFetch(() =>
      Promise.resolve(
        new Response('data: "Привет"\n\ndata: [DONE]\n\n', {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        }),
      ),
    );
    await expect(
      generatePostStream(PAYLOAD, { onChunk: vi.fn() }),
    ).resolves.toBe("Привет");
    expect(generated()).toEqual([
      { t: "post_ai_generate", ok: true, num: expect.any(Number) },
    ]);

    // Остановка пользователем — не событие (fetch при abort() — AbortError)
    stubFetch(() =>
      Promise.reject(
        Object.assign(new Error("aborted"), { name: "AbortError" }),
      ),
    );
    await expect(
      generatePostStream(PAYLOAD, { onChunk: vi.fn() }),
    ).rejects.toBeInstanceOf(PostGenerationAbortError);
    expect(generated()).toHaveLength(1);
  });

  it("a failed stream: post_ai_generate ok=false", async () => {
    stubFetch(() => Promise.resolve(new Response("boom", { status: 500 })));

    await expect(
      generatePostStream(PAYLOAD, { onChunk: vi.fn() }),
    ).rejects.toBeInstanceOf(PostGenerationStreamError);
    expect(generated()).toEqual([
      { t: "post_ai_generate", ok: false, num: expect.any(Number) },
    ]);
  });
});
