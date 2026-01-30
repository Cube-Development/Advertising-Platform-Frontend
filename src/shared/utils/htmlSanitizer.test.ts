import { describe, test, expect } from "vitest";
import { sanitizePostHtml } from "./htmlSanitizer";

describe("sanitizePostHtml", () => {
  test("Сохраняет перенос строки между блоками", () => {
    const input = "<div>Line 1</div><div>Line 2</div>";
    expect(sanitizePostHtml(input)).toBe("Line 1<br>Line 2");
  });

  test("Сохраняет пустые строки (двойной перенос) для абзацев", () => {
    const input = "Line 1\n\nLine 2";
    expect(sanitizePostHtml(input)).toBe("Line 1<br><br>Line 2");
  });

  test("Корректно обрабатывает сложную вставку с тегами и текстом", () => {
    const input = "<b>Bold</b>\n\n<i>Italic</i>";
    expect(sanitizePostHtml(input)).toBe("<b>Bold</b><br><br><i>Italic</i>");
  });

  test("Удаляет лишние переносы в начале и конце", () => {
    const input = "<br><br>Text<br>";
    expect(sanitizePostHtml(input)).toBe("Text");
  });

  test("Схлопывает тройные переносы в двойные", () => {
    const input = "Part 1<br><br><br>Part 2";
    expect(sanitizePostHtml(input)).toBe("Part 1<br><br>Part 2");
  });
});
