import { sanitizePostHtml } from "./htmlSanitizer";

/**
 * Ручной тест-драйвер для проверки логики санитайзера прямо в браузере.
 * Результаты выводятся в консоль разработчика (F12).
 */
export const runSanitizerTests = () => {
  if (process.env.NODE_ENV !== "development") return;

  console.group(
    "%c🧪 Sanitizer Validation Tests",
    "color: #8936FF; font-weight: bold; font-size: 12px;",
  );

  const cases = [
    {
      name: "Обычный текст с переносами (\\n)",
      input: "😉 Yangi yilga...\n🚀 Bayram xaridlarini...",
      expected: "😉 Yangi yilga...<br>🚀 Bayram xaridlarini...",
    },
    {
      name: "HTML блоки (div/p) из внешних источников",
      input: "<div>Line 1</div><p>Line 2</p>",
      expected: "Line 1<br>Line 2",
    },
    {
      name: "Кейс с двойным переносом (сохранение структуры)",
      input: "Part 1<br><br>Part 2",
      expected: "Part 1<br><br>Part 2",
    },
    {
      name: "Очистка лишних пробелов между тегами",
      input: "<b>Text</b>    \n    <i>Italic</i>",
      expected: "<b>Text</b> <i>Italic</i>",
    },
    {
      name: "Схлопывание тройных <br> в двойные",
      input: "One<br><br><br>Two",
      expected: "One<br><br>Two",
    },
  ];

  let passedAll = true;

  cases.forEach((c, index) => {
    const result = sanitizePostHtml(c.input);
    const passed = result === c.expected;
    if (!passed) passedAll = false;

    console.log(
      `${passed ? "✅" : "❌"} %cTest ${index + 1}: ${c.name}`,
      passed ? "color: green" : "color: red; font-weight: bold",
    );

    if (!passed) {
      console.log("   Input:", JSON.stringify(c.input));
      console.log("   Expected:", JSON.stringify(c.expected));
      console.log("   Got:", JSON.stringify(result));
    }
  });

  if (passedAll) {
    console.log(
      "%c✨ ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО",
      "color: #008000; font-weight: bold; background: #e6fffa; padding: 4px;",
    );
  } else {
    console.log(
      "%c⚠️ ЕСТЬ ОШИБКИ В ТЕСТАХ",
      "color: #ff0000; font-weight: bold; background: #fff5f5; padding: 4px;",
    );
  }

  console.groupEnd();
};
