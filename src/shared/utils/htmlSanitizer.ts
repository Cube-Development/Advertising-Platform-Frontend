/**
 * Очищает HTML и нормализует переносы строк для корректного отображения в pre-wrap.
 */
export const sanitizePostHtml = (html: string): string => {
  if (!html) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Превращаем физические переносы в <br> для унификации
      // Но НЕ схлопываем их все в один пробел, чтобы сохранить абзацы
      return (node.textContent || "").replace(/\r?\n/g, "<br>");
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "br") return "<br>";

    let content = "";
    for (const child of Array.from(el.childNodes)) {
      content += walk(child);
    }

    const isBlock = ["div", "p", "section", "article"].includes(tag);
    if (isBlock) {
      if (!content || content === "<br>") return "<br>";
      // Если блок не пустой, гарантируем перенос после него
      return content.endsWith("<br>") ? content : content + "<br>";
    }

    // Разрешенные теги
    const allowedTags: Record<string, string> = {
      strong: "b",
      em: "i",
      strike: "s",
      b: "b",
      i: "i",
      u: "u",
      s: "s",
      code: "code",
    };

    if (allowedTags[tag]) {
      const finalTag = allowedTags[tag];
      return `<${finalTag}>${content}</${finalTag}>`;
    }

    if (tag === "a") {
      const href = el.getAttribute("href");
      return href ? `<a href="${href}">${content}</a>` : content;
    }

    if (tag === "span") {
      if (el.style.fontWeight === "bold" || el.style.fontWeight === "700") {
        return `<b>${content}</b>`;
      }
      if (el.style.fontStyle === "italic") {
        return `<i>${content}</i>`;
      }
      // ... прочие стили в один ряд для краткости ...
      if (el.style.fontFamily?.includes("monospace"))
        return `<code>${content}</code>`;
      if (el.style.textDecoration?.includes("underline"))
        return `<u>${content}</u>`;
      if (el.style.textDecoration?.includes("line-through"))
        return `<s>${content}</s>`;
    }

    return content;
  };

  let result = walk(tempDiv);

  // Удаляем повторяющиеся пробелы (но не переносы)
  result = result.replace(/[ ]{2,}/g, " ");

  return result
    .replace(/(<br\s*\/?>){3,}/g, "<br><br>") // Схлопываем 3+ переноса в 2 (одна пустая строка)
    .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/g, "") // Убираем переносы по краям
    .trim();
};
