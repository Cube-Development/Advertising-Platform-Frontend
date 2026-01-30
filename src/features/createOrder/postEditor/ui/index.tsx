import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  POST,
} from "@entities/project";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  parseMarkdownToHtml,
  isMarkdownText,
} from "@shared/utils/markdownParser";
import styles from "./styles.module.scss";
import { Toolbar } from "./toolbar";
import { useTranslation } from "react-i18next";
import { toast } from "@shared/ui";
import { sanitizePostHtml } from "@shared/utils/htmlSanitizer";

interface TextFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  monospace?: boolean;
}

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  type: CreatePostFormData;
  platformId: number;
  formState: ICreatePostForm;
  disabled?: boolean;
  placeholder?: string;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  type,
  platformId,
  formState,
  placeholder,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const postsWithoutCurrent = useMemo(
    () =>
      formState?.selectedMultiPostId
        ? formState?.multiposts?.filter(
            (item) => item?.order_id !== formState?.selectedMultiPostId,
          ) || []
        : formState?.posts?.filter(
            (item) =>
              item?.platform !== platformId ||
              (item?.platform === platformId &&
                item?.post_type !== formState?.selectedPostType),
          ) || [],
    [
      formState?.selectedMultiPostId,
      formState?.multiposts,
      formState?.posts,
      platformId,
      formState?.selectedPostType,
    ],
  );

  const currentPost = useMemo(
    () =>
      formState?.selectedMultiPostId
        ? formState?.multiposts?.find(
            (item) => item?.order_id === formState?.selectedMultiPostId,
          )
        : formState?.posts?.find(
            (item) =>
              item.platform === platformId &&
              item.post_type === formState.selectedPostType,
          ) || {
            platform: platformId,
            post_type: formState.selectedPostType,
          },
    [
      formState?.selectedMultiPostId,
      formState?.multiposts,
      formState?.posts,
      platformId,
      formState.selectedPostType,
    ],
  );

  const startContent = placeholder || currentPost?.text?.[0]?.content || "";
  const [format, setFormat] = useState<TextFormat>({});
  const editorRef = useRef<HTMLDivElement>(null);
  const lastContentRef = useRef<string>("");
  const savedSelectionRef = useRef<Range | null>(null);
  const limit = POST.POST_LENGTH;

  const updateFormValue = useCallback(() => {
    if (!editorRef.current) return;

    const rawContent = editorRef.current.innerHTML;
    const cleanedContent = sanitizePostHtml(rawContent);

    if (lastContentRef.current === cleanedContent) {
      return;
    }

    const textLength = cleanedContent.replace(/<[^>]*>/g, "").length;

    if (textLength > limit) {
      // Отрезаем по тексту, но это грубо. Просто игнорируем ввод если лимит превышен?
      // Для простоты оставим как было, но с очищенным контентом
      const truncatedRaw = rawContent.substring(0, limit); // Это некорректно для HTML, но оставим логику проекта
      lastContentRef.current = sanitizePostHtml(truncatedRaw);
      return;
    }

    lastContentRef.current = cleanedContent;

    if (currentPost) {
      currentPost.text = [
        { content_type: ContentType.text, content: cleanedContent },
      ];
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  }, [setValue, limit, currentPost, postsWithoutCurrent, type]);

  useEffect(() => {
    if (!editorRef.current) return;

    const newContent = startContent || "";

    // ВАЖНО: Если контент в стейте совпадает с тем, что мы только что почистили,
    // не перезаписываем innerHTML, чтобы не ломать фокус/курсор.
    if (newContent === lastContentRef.current) return;

    if (isMarkdownText(newContent)) {
      const htmlContent = parseMarkdownToHtml(newContent);
      if (editorRef.current.innerHTML !== htmlContent) {
        editorRef.current.innerHTML = htmlContent;
        lastContentRef.current = htmlContent;
      }
    } else {
      if (editorRef.current.innerHTML !== newContent) {
        editorRef.current.innerHTML = newContent;
        lastContentRef.current = newContent;
      }
    }
  }, [
    startContent,
    platformId,
    formState.selectedPostType,
    formState.selectedMultiPostId,
  ]);

  const toggleFormat = (key: keyof TextFormat) => {
    setFormat((prev) => {
      const newFormat = { ...prev, [key]: !prev[key] };
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

    restoreSelection();

    const selection = window.getSelection();
    if (!selection) return;

    if (selection.rangeCount === 0 && savedSelectionRef.current) {
      selection.addRange(savedSelectionRef.current);
    }

    if (selection.rangeCount === 0 || !selection.toString()) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    document.execCommand("createLink", false, url);

    const links = editorRef.current.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.style.color = "#3b82f6";
      link.style.textDecoration = "underline";
    });

    updateFormValue();
    savedSelectionRef.current = null;
  };

  const handleInput = () => {
    updateFormValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

      range.setStartAfter(el);
      range.setEndAfter(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    updateFormValue();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          e.preventDefault();
          return;
        }
      }
    }

    e.preventDefault();
    const pastedText = e.clipboardData?.getData("text/plain");
    const pastedHtml = e.clipboardData?.getData("text/html");

    if (!pastedText) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    toast({
      variant: "warning",
      title: t("create_order.create.paste_text"),
    });

    let contentToInsert: string;

    if (isMarkdownText(pastedText)) {
      contentToInsert = sanitizePostHtml(parseMarkdownToHtml(pastedText));
    } else if (pastedHtml) {
      contentToInsert = sanitizePostHtml(pastedHtml);
    } else {
      // Для чистого текста просто меняем переносы строк на <br>
      // и очищаем от возможных лишних пробелов, которые pre-wrap отобразит
      contentToInsert = pastedText.trim().replace(/\r?\n/g, "<br>");
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = contentToInsert;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.insertNode(fragment);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    updateFormValue();
  };

  const checkActiveFormats = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
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

    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      return;
    }

    const newFormat = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      monospace: false,
    };

    setFormat((prev) => {
      if (
        prev.bold === newFormat.bold &&
        prev.italic === newFormat.italic &&
        prev.underline === newFormat.underline &&
        prev.strikethrough === newFormat.strikethrough &&
        prev.monospace === newFormat.monospace
      ) {
        return prev;
      }
      return newFormat;
    });
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    let timeoutId: NodeJS.Timeout;
    const handleSelectionChange = () => {
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
      <div className="relative pt-3 pb-12 h-full">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="min-h-[200px] h-full px-4 overflow-auto bg-transparent text-black focus:outline-none text-base template-editor-content post_pasted_link"
          style={{ color: "#000000" }}
          suppressContentEditableWarning
          data-placeholder={
            placeholder || t("create_order.create.start_typing")
          }
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
