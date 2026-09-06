/**
 * Уведомление приходит с бэкенда как готовое HTML-письмо: обёртки с инлайн-
 * стилями и фиксированной `max-width: 600px`. В ряд панели шириной ~340px его
 * вставлять нельзя, а показать как есть — значит показать разметку.
 *
 * Разбираем так же, как список уведомлений в приложении
 * (`features/communication/notification/notificationCard`): заголовок берём из
 * `h2.title`, остальное превращаем в обычный текст.
 *
 * DOMParser с "text/html" не исполняет скрипты, и мы читаем только textContent.
 */
export interface IParsedNotification {
  title: string;
  preview: string;
}

export const parseNotification = (html?: string): IParsedNotification => {
  const source = html ?? "";
  if (!source.trim()) return { title: "", preview: "" };

  const collapse = (value: string) => value.replace(/\s+/g, " ").trim();

  let title = "";
  let body = "";
  try {
    const doc = new DOMParser().parseFromString(source, "text/html");
    title = collapse(doc.querySelector("h2.title")?.textContent ?? "");
    body = collapse(doc.body?.textContent ?? "");
  } catch {
    body = collapse(source.replace(/<\/?[^>]+(>|$)/g, " "));
  }

  // Заголовок уже показан отдельной строкой — не повторяем его в превью.
  const preview =
    title && body.startsWith(title) ? body.slice(title.length).trim() : body;

  return { title: title || preview.slice(0, 80), preview };
};
