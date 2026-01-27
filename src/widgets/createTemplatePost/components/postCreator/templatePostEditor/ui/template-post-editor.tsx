import { ContentType, IPostData, POST } from "@entities/project";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  parseMarkdownToHtml,
  isMarkdownText,
} from "@shared/utils/markdownParser";
import { sanitizePostHtml } from "@shared/utils/htmlSanitizer";
import styles from "./styles.module.scss";
import { Toolbar } from "./toolbar";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";
import { useTranslation } from "react-i18next";
import { toast } from "@shared/ui";

interface TextFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  monospace?: boolean;
}

interface TemplatePostEditorProps {
  setValue: UseFormSetValue<CreateTemplateFormData>;
  formState: CreateTemplateFormData;
}

export const TemplatePostEditor: FC<TemplatePostEditorProps> = ({
  setValue,
  formState,
}) => {
  const { t } = useTranslation();
  const currentTemplateText = formState?.files?.find(
    (file) => file.content_type === ContentType.text,
  ) || {
    content_type: ContentType.text,
    content: "",
  };

  const startContent = currentTemplateText?.content || "";
  const [format, setFormat] = useState<TextFormat>({});
  const editorRef = useRef<HTMLDivElement>(null);
  const lastContentRef = useRef<string>("");
  const filesRef = useRef<IPostData[]>(formState.files);
  const savedSelectionRef = useRef<Range | null>(null);
  const limit = POST.POST_LENGTH;

  // Обновляем ref при изменении formState.files
  useEffect(() => {
    filesRef.current = formState.files;
  }, [formState.files]);

  const updateFormValue = useCallback(() => {
    if (!editorRef.current) return;

    const content = editorRef.current.innerHTML;
    const cleanedContent = sanitizePostHtml(content);

    // Проверяем, изменился ли контент
    if (lastContentRef.current === cleanedContent) {
      return; // Не обновляем, если контент не изменился
    }

    // Проверяем длину текста без HTML тегов
    const textLength = cleanedContent.replace(/<[^>]*>/g, "").length;

    if (textLength > limit) {
      // Обрезаем контент до лимита
      const truncatedContent = cleanedContent.substring(0, limit);
      if (editorRef.current) {
        editorRef.current.innerHTML = truncatedContent;
      }
      lastContentRef.current = truncatedContent;
      return;
    }

    // Обновляем только если контент действительно изменился
    lastContentRef.current = cleanedContent;

    const currentFiles = filesRef.current;
    const existingTextFile = currentFiles.find(
      (file) => file.content_type === ContentType.text,
    );

    let updatedFiles: IPostData[];
    if (existingTextFile) {
      updatedFiles = currentFiles.map((file) =>
        file.content_type === ContentType.text
          ? { ...file, content: cleanedContent }
          : file,
      );
    } else {
      const newTextFile: IPostData = {
        content_type: ContentType.text,
        content: cleanedContent,
      };
      updatedFiles = [...currentFiles, newTextFile];
    }

    filesRef.current = updatedFiles;
    setValue("files", updatedFiles);
  }, [setValue, limit]);

  // Инициализация контента
  useEffect(() => {
    if (
      editorRef.current &&
      startContent &&
      editorRef.current.innerHTML !== startContent
    ) {
      // Проверяем, является ли контент Markdown
      if (isMarkdownText(startContent)) {
        const htmlContent = parseMarkdownToHtml(startContent);
        if (editorRef.current.innerHTML !== htmlContent) {
          editorRef.current.innerHTML = htmlContent;
        }
      } else {
        if (editorRef.current.innerHTML !== startContent) {
          editorRef.current.innerHTML = startContent;
        }
      }
    }
  }, [startContent]);

  const toggleFormat = (key: keyof TextFormat) => {
    setFormat((prev) => {
      const newFormat = { ...prev, [key]: !prev[key] };

      // Применяем форматирование к выделенному тексту
      if (document.getSelection()?.toString()) {
        applyFormatToSelection(key);
      }

      return newFormat;
    });
  };

  const applyFormatToSelection = (formatType: keyof TextFormat) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    let command = "";
    switch (formatType) {
      case "bold":
        command = "bold";
        break;
      case "italic":
        command = "italic";
        break;
      case "underline":
        command = "underline";
        break;
      case "strikethrough":
        command = "strikeThrough";
        break;
      case "monospace": {
        const selectedText = selection.toString();
        if (!selectedText) return;
        const code = document.createElement("code");
        code.textContent = selectedText;
        range.deleteContents();
        range.insertNode(code);
        updateFormValue();
        return;
      }
    }

    if (command) {
      document.execCommand(command, false);
      updateFormValue();
    }
  };

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (savedSelectionRef.current && editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRef.current);
      }
    }
  }, []);

  const addLink = (url: string) => {
    if (!url || !editorRef.current) return;

    // Восстанавливаем сохраненное выделение
    restoreSelection();

    const selection = window.getSelection();
    if (!selection) return;

    // Если нет выделения, пытаемся использовать сохраненное
    if (selection.rangeCount === 0 && savedSelectionRef.current) {
      selection.addRange(savedSelectionRef.current);
    }

    if (selection.rangeCount === 0 || !selection.toString()) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    document.execCommand("createLink", false, url);

    // Добавляем стили к созданной ссылке
    const links = editorRef.current.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    updateFormValue();
    savedSelectionRef.current = null;
  };

  const handleInput = () => {
    updateFormValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Применяем текущий формат при вводе текста
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const hasFormat = Object.values(format).some((v) => v);
      if (hasFormat) {
        e.preventDefault();
        insertFormattedText(e.key);
      }
    }
  };

  const insertFormattedText = (text: string) => {
    let el: Node;

    if (format.bold) {
      const b = document.createElement("b");
      b.textContent = text;
      el = b;
    } else if (format.italic) {
      const i = document.createElement("i");
      i.textContent = text;
      el = i;
    } else if (format.underline) {
      const u = document.createElement("u");
      u.textContent = text;
      el = u;
    } else if (format.strikethrough) {
      const s = document.createElement("s");
      s.textContent = text;
      el = s;
    } else if (format.monospace) {
      const code = document.createElement("code");
      code.textContent = text;
      el = code;
    } else {
      el = document.createTextNode(text);
    }

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(el);

      // Перемещаем курсор после вставленного текста
      range.setStartAfter(el);
      range.setEndAfter(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    updateFormValue();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    // Запрещаем вставку файлов и медиа
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          e.preventDefault();
          return;
        }
      }
    }

    e.preventDefault();
    const pastedText = e.clipboardData?.getData("text/plain");

    if (!pastedText) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    toast({
      variant: "warning",
      title: t("create_order.create.paste_text"),
    });

    const htmlContent = sanitizePostHtml(
      e.clipboardData?.getData("text/html") || pastedText,
    );
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    range.insertNode(fragment);

    // Перемещаем курсор в конец вставленного контента
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    updateFormValue();
  };

  // Проверяем активные форматы для тулбара

  const checkActiveFormats = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      // Если нет селекции, сбрасываем формат
      setFormat((prev) => {
        const isEmpty =
          !prev.bold &&
          !prev.italic &&
          !prev.underline &&
          !prev.strikethrough &&
          !prev.monospace;
        return isEmpty ? prev : {};
      });
      return;
    }

    const range = selection.getRangeAt(0);

    // Проверяем, находится ли селекция внутри нашего редактора
    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      return;
    }

    const newFormat = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      monospace: false, // Нужна дополнительная проверка для monospace
    };

    // Обновляем только если формат действительно изменился
    setFormat((prev) => {
      if (
        prev.bold === newFormat.bold &&
        prev.italic === newFormat.italic &&
        prev.underline === newFormat.underline &&
        prev.strikethrough === newFormat.strikethrough &&
        prev.monospace === newFormat.monospace
      ) {
        return prev; // Не обновляем, если ничего не изменилось
      }
      return newFormat;
    });
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    let timeoutId: NodeJS.Timeout;
    const handleSelectionChange = () => {
      // Debounce проверки форматов, чтобы не вызывать слишком часто
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkActiveFormats();
      }, 50);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    editor.addEventListener("mouseup", handleSelectionChange);
    editor.addEventListener("keyup", handleSelectionChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("selectionchange", handleSelectionChange);
      editor.removeEventListener("mouseup", handleSelectionChange);
      editor.removeEventListener("keyup", handleSelectionChange);
    };
  }, [checkActiveFormats]);

  return (
    <div className={styles.editor}>
      <div className="relative pt-3 pb-12 h-[200px]">
        <div
          ref={editorRef}
          contentEditable
          className={`h-full px-4 overflow-auto bg-transparent focus:outline-none text-base template-editor-content post-content post_pasted_link ${styles.content}`}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          suppressContentEditableWarning
          data-placeholder={t("create_order.create.start_typing")}
        />
        <Toolbar
          format={format}
          onToggleFormat={toggleFormat}
          onAddLink={addLink}
          onLinkButtonClick={saveSelection}
        />
      </div>
    </div>
  );
};
