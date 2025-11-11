import { FC } from "react";
import { Copy } from "lucide-react";
import TurndownService from "turndown";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useToast } from "@shared/ui";
import { isMarkdownText } from "@shared/utils";

interface CopyTextBtnProps {
  text?: string;
}

// Очищает HTML от лишних тегов и стилей
const cleanHtml = (html: string): string => {
  if (!html) return "";

  // Создаем временный div для парсинга
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Удаляем все meta, title, style теги
  const metaTags = tempDiv.querySelectorAll("meta, title, style");
  metaTags.forEach((tag) => tag.remove());

  // Обрабатываем underline теги ДО удаления стилей - заменяем на <u> для правильной конвертации
  const allSpans = tempDiv.querySelectorAll("span");
  allSpans.forEach((el) => {
    const element = el as HTMLElement;
    const style = element.getAttribute("style") || "";
    if (
      style.includes("underline") ||
      style.includes("text-decoration: underline")
    ) {
      const uTag = document.createElement("u");
      uTag.innerHTML = element.innerHTML;
      element.parentNode?.replaceChild(uTag, element);
    }
  });

  // Обрабатываем все элементы - удаляем стили и классы
  const allElements = tempDiv.querySelectorAll("*");
  allElements.forEach((el) => {
    const element = el as HTMLElement;

    // Удаляем все inline стили и классы
    element.removeAttribute("style");
    element.removeAttribute("class");

    // Сохраняем только нужные атрибуты для ссылок
    if (element.tagName === "A") {
      const href = element.getAttribute("href");
      if (href) {
        element.setAttribute("href", href);
      } else {
        // Если нет href, но есть текст, создаем ссылку из текста
        if (element.textContent) {
          element.setAttribute("href", element.textContent.trim());
        }
      }
    }
  });

  // Обрабатываем параграфы - заменяем <br> на переносы строк и удаляем пустые
  const paragraphs = tempDiv.querySelectorAll("p");
  paragraphs.forEach((p) => {
    // Проверяем, пустой ли параграф или содержит только <br>
    const textContent = p.textContent?.trim() || "";
    const hasOnlyBr =
      p.children.length === 0 && p.querySelectorAll("br").length > 0;

    if (textContent === "" || hasOnlyBr) {
      // Заменяем пустой параграф на <br>
      const br = document.createElement("br");
      p.parentNode?.replaceChild(br, p);
    } else {
      // Заменяем <br> внутри параграфов на переносы строк
      const brs = p.querySelectorAll("br");
      brs.forEach((br) => {
        const textNode = document.createTextNode("\n");
        br.parentNode?.replaceChild(textNode, br);
      });
    }
  });

  return tempDiv.innerHTML;
};

// Очищает Markdown от лишних пробелов и форматирует для Telegram
const cleanMarkdown = (markdown: string): string => {
  if (!markdown) return "";

  // Сначала базовая очистка
  const cleaned = markdown
    // Убираем множественные пробелы (но сохраняем один пробел)
    .replace(/[ \t]{2,}/g, " ")
    // Убираем пробелы в начале и конце строк
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    // Убираем пробелы перед переносами строк
    .replace(/[ \t]+\n/g, "\n")
    // Убираем пробелы после переносов строк
    .replace(/\n[ \t]+/g, "\n");

  // Обрабатываем строки для удаления лишних пустых строк
  const lines = cleaned.split("\n");
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const prevLine = result[result.length - 1]?.trim() || "";
    const nextLine = lines[i + 1]?.trim() || "";

    // Пропускаем пустые строки, если:
    // 1. Предыдущая строка пустая
    // 2. Следующая строка - элемент списка
    // 3. Следующая строка пустая
    // 4. Текущая строка пустая и предыдущая - элемент списка
    if (trimmed === "") {
      if (
        prevLine === "" ||
        nextLine.match(/^[*•\-+]/) ||
        nextLine === "" ||
        prevLine.match(/^[*•\-+]/)
      ) {
        continue; // Пропускаем эту пустую строку
      }
    }

    result.push(line);
  }

  return (
    result
      .join("\n")
      // Убираем множественные пустые строки (максимум 1 пустая строка)
      .replace(/\n{3,}/g, "\n\n")
      // Убираем пустые строки в начале и конце
      .trim()
  );
};

export const CopyTextBtn: FC<CopyTextBtnProps> = ({ text }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyText = () => {
    if (text) {
      let textToCopy = text;

      // Если текст уже в Markdown формате, очищаем и копируем
      if (isMarkdownText(text)) {
        textToCopy = cleanMarkdown(text);
      } else {
        // Если это HTML, сначала очищаем, потом конвертируем в Markdown
        const cleanedHtml = cleanHtml(text);

        const turndownService = new TurndownService({
          headingStyle: "atx",
          bulletListMarker: "*", // Используем * для списков
          codeBlockStyle: "fenced",
          linkStyle: "inlined",
          emDelimiter: "*", // Используем * для курсива
          strongDelimiter: "**", // Используем ** для жирного
        });

        // Добавляем правила для underline (Telegram использует __)
        turndownService.addRule("underline", {
          filter: ["u", "ins"],
          replacement: (content) => {
            return `__${content}__`;
          },
        });

        // Добавляем правила для strikethrough (Telegram использует ~)
        turndownService.addRule("strikethrough", {
          filter: ["del", "s"],
          replacement: (content) => {
            return `~${content}~`;
          },
        });

        // Добавляем правило для <br> - конвертируем в перенос строки
        turndownService.addRule("lineBreak", {
          filter: "br",
          replacement: () => {
            return "\n";
          },
        });

        // Конвертируем очищенный HTML в Markdown
        textToCopy = turndownService.turndown(cleanedHtml);

        // Очищаем результат от лишних пробелов
        textToCopy = cleanMarkdown(textToCopy);
      }

      // Копируем текст в буфер обмена
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          toast({
            variant: "success",
            title: t("toasts.post.copy_text"),
          });
        },
        (err) => {
          console.error("Ошибка при копировании текста: ", err);
        },
      );
    }
  };

  return (
    <div>
      {text && (
        <div onClick={copyText} className={`${styles.download_btn} `}>
          <div className={styles.download_btn__title}>
            {t("copy_post_text")}
          </div>
          <span className={styles.download_btn__icon}>
            <Copy width={20} height={20} stroke="#2d2d2d" />
          </span>
        </div>
      )}
    </div>
  );
};
