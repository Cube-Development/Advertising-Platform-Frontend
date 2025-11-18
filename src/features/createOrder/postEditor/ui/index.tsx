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

    const content = editorRef.current.innerHTML;
    let cleanedContent = content.replace(/(<br\s*\/?>\s*){2,}/g, "<p></p>");

    // Создаем копию контента для сохранения (не трогаем DOM редактора)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanedContent;
    const allElements = tempDiv.querySelectorAll("*");
    allElements.forEach((el) => {
      const element = el as HTMLElement;
      if (element.tagName === "A") {
        if (!element.getAttribute("target")) {
          element.setAttribute("target", "_blank");
        }
        if (!element.getAttribute("rel")) {
          element.setAttribute("rel", "noopener noreferrer");
        }
        element.style.removeProperty("color");
        if (!element.style.textDecoration) {
          element.style.textDecoration = "underline";
        }
      } else {
        element.style.removeProperty("color");
      }
    });
    cleanedContent = tempDiv.innerHTML;

    if (lastContentRef.current === cleanedContent) {
      return;
    }

    const textLength = cleanedContent.replace(/<[^>]*>/g, "").length;

    if (textLength > limit) {
      const truncatedContent = cleanedContent.substring(0, limit);
      if (editorRef.current) {
        editorRef.current.innerHTML = truncatedContent;
      }
      lastContentRef.current = truncatedContent;
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
        const span = document.createElement("span");
        span.style.fontFamily = "monospace";
        span.style.background = "#f3f4f6";
        span.style.padding = "2px 4px";
        span.style.borderRadius = "3px";
        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
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
    const span = document.createElement("span");

    if (format.bold) span.style.fontWeight = "bold";
    if (format.italic) span.style.fontStyle = "italic";

    const decorations = [];
    if (format.underline) decorations.push("underline");
    if (format.strikethrough) decorations.push("line-through");
    if (decorations.length > 0) {
      span.style.textDecoration = decorations.join(" ");
    }

    if (format.monospace) {
      span.style.fontFamily = "monospace";
      span.style.background = "#f3f4f6";
      span.style.padding = "2px 4px";
      span.style.borderRadius = "3px";
    }

    span.textContent = text;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);

      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    updateFormValue();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
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
    const pastedHtml = e.clipboardData?.getData("text/html");

    if (!pastedText) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    if (isMarkdownText(pastedText)) {
      const htmlContent = parseMarkdownToHtml(pastedText);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      const allElements = tempDiv.querySelectorAll("*");
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        if (element.tagName === "A") {
          const href = element.getAttribute("href");
          if (!href && element.textContent) {
            element.setAttribute("href", element.textContent.trim());
          }
          element.style.color = "#3b82f6";
          element.style.textDecoration = "underline";
          element.setAttribute("target", "_blank");
          element.setAttribute("rel", "noopener noreferrer");
        } else {
          if (
            !element.style.color ||
            element.style.color === "rgb(255, 255, 255)" ||
            element.style.color === "#ffffff" ||
            element.style.color === "white"
          ) {
            element.style.color = "#000000";
          }
        }
      });

      const fragment = document.createDocumentFragment();
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }
      range.insertNode(fragment);
    } else if (pastedHtml) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = pastedHtml;

      const allElements = tempDiv.querySelectorAll("*");
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        if (element.tagName === "A") {
          const href = element.getAttribute("href");
          if (!href && element.textContent) {
            element.setAttribute("href", element.textContent.trim());
          }
          element.style.color = "#3b82f6";
          element.style.textDecoration = "underline";
          element.setAttribute("target", "_blank");
          element.setAttribute("rel", "noopener noreferrer");
        } else {
          if (
            !element.style.color ||
            element.style.color === "rgb(255, 255, 255)" ||
            element.style.color === "#ffffff" ||
            element.style.color === "white"
          ) {
            element.style.color = "#000000";
          }
          if (
            element.style.backgroundColor === "rgb(255, 255, 255)" ||
            element.style.backgroundColor === "#ffffff" ||
            element.style.backgroundColor === "white"
          ) {
            element.style.backgroundColor = "";
          }
        }
      });

      const fragment = document.createDocumentFragment();
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }
      range.insertNode(fragment);
    } else {
      const textNode = document.createTextNode(pastedText);
      range.insertNode(textNode);
    }

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
          className="min-h-[200px] h-full px-4 overflow-auto bg-transparent text-black focus:outline-none text-base template-editor-content"
          style={{ color: "#000000" }}
          suppressContentEditableWarning
          data-placeholder={
            placeholder || t("create_order.create.start_typing")
          }
        />
        <style>{`
          .template-editor-content:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
          .template-editor-content * {
            color: #000000 !important;
          }
          .template-editor-content a[href],
          .template-editor-content a {
            color: #3b82f6 !important;
            text-decoration: underline !important;
            cursor: pointer !important;
          }
          .template-editor-content a:hover {
            opacity: 0.8;
          }
        `}</style>
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
