import { vi } from "vitest";

// pdfjs in react-pdf expects browser APIs
// @ts-expect-error test polyfill
globalThis.DOMMatrix ??= class DOMMatrix {};

vi.mock("react-pdf", () => ({
  Document: () => null,
  Page: () => null,
  pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "ru", changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: "3rdParty", init: () => undefined },
  Trans: ({ children }: { children?: unknown }) => children,
}));

vi.mock("@shared/config/i18n", () => ({
  default: {
    t: (key: string) => key,
    language: "ru",
    changeLanguage: vi.fn(),
  },
}));
