// @vitest-environment node
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Копия ядра трекера из blogix-analytics (pnpm sync:tracker) не правится руками:
 * файлы совпадают с .sync.json (спека 005 FR-001, 004 FR-028)
 */
const CORE_DIR = path.join(import.meta.dirname, "core");
const MANIFEST = path.join(CORE_DIR, ".sync.json");

interface SyncManifest {
  commit: string;
  files: Record<string, { source: string; copy: string }>;
}

const hash = (text: string) =>
  createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");

const listFiles = (dir: string, prefix = ""): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`)
      : [`${prefix}${entry.name}`],
  );

describe("analytics core copy", () => {
  it("has .sync.json from pnpm sync:tracker", () => {
    expect(existsSync(MANIFEST)).toBe(true);
  });

  it("matches .sync.json: the same files, no hand edits", () => {
    expect(existsSync(MANIFEST)).toBe(true);
    const manifest = JSON.parse(readFileSync(MANIFEST, "utf8")) as SyncManifest;
    const files = listFiles(CORE_DIR)
      .filter((file) => file !== ".sync.json")
      .sort();

    expect(files).toEqual(Object.keys(manifest.files).sort());
    for (const file of files) {
      expect(hash(readFileSync(path.join(CORE_DIR, file), "utf8")), file).toBe(
        manifest.files[file]?.copy,
      );
    }
  });
});
