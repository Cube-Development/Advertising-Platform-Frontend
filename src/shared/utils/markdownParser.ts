import MarkdownIt from "markdown-it";

// Создаем экземпляр markdown-it с настройками
const md = new MarkdownIt({
  html: true, // Разрешаем HTML теги
  linkify: true, // Автоматически преобразуем ссылки
  breaks: true, // Преобразуем переносы строк в <br>
  typographer: true, // Включаем типографические замены
});

/**
 * Парсит Markdown текст в HTML
 * @param markdownText - Текст в формате Markdown
 * @returns HTML строка
 */
export const parseMarkdownToHtml = (markdownText: string): string => {
  if (!markdownText) return "";

  try {
    return md.render(markdownText);
  } catch (error) {
    console.error("Ошибка при парсинге Markdown:", error);
    return markdownText; // Возвращаем исходный текст в случае ошибки
  }
};

/**
 * Проверяет, содержит ли текст Markdown разметку
 * @param text - Текст для проверки
 * @returns true, если текст содержит Markdown разметку
 */
export const isMarkdownText = (text: string): boolean => {
  if (!text) return false;

  // Проверяем наличие основных Markdown элементов
  const markdownPatterns = [
    /\[.*?\]\(.*?\)/, // Ссылки [text](url)
    /\*\*.*?\*\*/, // Жирный текст **text**
    /\*.*?\*/, // Курсив *text*
    /__.*?__/, // Жирный текст __text__
    /_.*?_/, // Курсив _text_
    /~~.*?~~/, // Зачеркнутый текст ~~text~~
    /`.*?`/, // Код `code`
    /^#{1,6}\s/m, // Заголовки # ## ###
    /^\*\s/m, // Маркированные списки
    /^-\s/m, // Маркированные списки
    /^\+\s/m, // Маркированные списки
    /^\d+\.\s/m, // Нумерованные списки
  ];

  return markdownPatterns.some((pattern) => pattern.test(text));
};

/**
 * Очищает HTML от лишних тегов, оставляя только нужные для Tiptap
 * @param html - HTML строка
 * @returns Очищенная HTML строка
 */
export const cleanHtmlForTiptap = (html: string): string => {
  if (!html) return "";

  // Удаляем лишние теги и оставляем только те, что поддерживает Tiptap
  return html
    .replace(/<div>/g, "<p>")
    .replace(/<\/div>/g, "</p>")
    .replace(/<br\s*\/?>/g, "<br>")
    .replace(/\s+/g, " ") // Убираем лишние пробелы
    .trim();
};
