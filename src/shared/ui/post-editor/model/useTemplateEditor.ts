import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { useToast } from "@shared/ui";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getPlainTextLength,
  getPlainTextLengthFromDoc,
  getPlainTextLengthFromString,
  plainTextToEditorHtml,
  truncateEditorToMaxLength,
  truncatePlainText,
} from "./getPlainTextLength";
import { ContentType, IEditorFile, TextFormat } from "./types";

export const useTemplateEditor = <T extends IEditorFile>({
  files,
  onUpdate,
  disabled = false,
  maxTextLength,
}: {
  files: T[];
  onUpdate: (updatedFiles: T[]) => void;
  disabled?: boolean;
  maxTextLength?: number;
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [textLength, setTextLength] = useState(0);
  const lastValidHtmlRef = useRef("");
  const isPasteRef = useRef(false);
  const filesRef = useRef(files);
  const maxTextLengthRef = useRef(maxTextLength);
  const showPasteLimitToastRef = useRef<() => void>(() => {});

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    maxTextLengthRef.current = maxTextLength;
  }, [maxTextLength]);

  useEffect(() => {
    showPasteLimitToastRef.current = () => {
      const max = maxTextLengthRef.current;
      if (!max) return;
      toast({
        variant: "error",
        title: t("toasts.create_order.post.text_max_length", { max }),
      });
    };
  }, [toast, t]);

  const currentTemplateContent = useMemo(() => {
    const rawContent =
      files?.find((file) => file.content_type === ContentType.text)?.content ||
      "";

    // Check if it's already HTML
    const isHtml = /<[a-z][\s\S]*>/i.test(rawContent);

    if (rawContent && !isHtml) {
      // Replace all newlines with <br> to preserve exact spacing
      return rawContent.replace(/\r?\n/g, "<br>");
    }
    return rawContent;
  }, [files]);

  const syncFilesFromEditor = useCallback(
    (editor: Editor) => {
      const html = editor.getHTML();
      const currentFiles = filesRef.current || [];
      const updatedFiles = currentFiles.some(
        (f) => f.content_type === ContentType.text,
      )
        ? currentFiles.map((f) =>
            f.content_type === ContentType.text ? { ...f, content: html } : f,
          )
        : [
            ...currentFiles,
            { content_type: ContentType.text, content: html } as T,
          ];

      onUpdate(updatedFiles);
    },
    [onUpdate],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // We use hardBreak for everything to avoid <p> margin issues and preserve empty lines
        hardBreak: {
          keepMarks: true,
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Link.extend({
        inclusive: false,
      }).configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      TextStyle,
    ],
    content: currentTemplateContent,
    onUpdate: ({ editor: currentEditor }) => {
      const len = getPlainTextLength(currentEditor);
      setTextLength(len);

      if (maxTextLength && len > maxTextLength) {
        const wasPaste = isPasteRef.current;
        isPasteRef.current = false;

        if (wasPaste) {
          showPasteLimitToastRef.current();
        }

        truncateEditorToMaxLength(currentEditor, maxTextLength);
        const html = currentEditor.getHTML();
        lastValidHtmlRef.current = html;
        setTextLength(getPlainTextLength(currentEditor));
        syncFilesFromEditor(currentEditor);
        return;
      }

      isPasteRef.current = false;

      const html = currentEditor.getHTML();
      lastValidHtmlRef.current = html;
      syncFilesFromEditor(currentEditor);
    },
    editorProps: {
      attributes: {
        class:
          "h-full px-4 overflow-auto bg-transparent focus:outline-none text-base template-editor-content post-content post_pasted_link",
      },
      handleTextInput: (view, from, to, text) => {
        if (!maxTextLength) return false;

        const doc = view.state.doc;
        const currentLen = getPlainTextLengthFromDoc(doc);
        const selectedLen = doc.textBetween(from, to, "\n", "\n").length;
        const newLen = currentLen - selectedLen + text.length;

        if (newLen > maxTextLength) return true;
        return false;
      },
      // Map Enter to HardBreak to ensure <br> is used instead of new <p>
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          if (
            maxTextLength &&
            getPlainTextLengthFromDoc(view.state.doc) >= maxTextLength
          ) {
            return true;
          }
          editor?.commands.setHardBreak();
          return true;
        }
        return false;
      },
      // Preserve newlines when pasting plain text by converting them to <br>
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData("text/plain");
        const html = event.clipboardData?.getData("text/html");

        if (maxTextLength && (text || html)) {
          isPasteRef.current = true;
        }

        // If we have plain text but no HTML (like from Notepad),
        // manually convert it to HTML with <br> to preserve exact formatting
        if (text && !html) {
          if (maxTextLength) {
            const { from, to } = view.state.selection;
            const doc = view.state.doc;
            const currentLen = getPlainTextLengthFromDoc(doc);
            const selectedLen = doc.textBetween(from, to, "\n", "\n").length;
            const remaining = maxTextLength - (currentLen - selectedLen);
            if (remaining <= 0) {
              isPasteRef.current = false;
              showPasteLimitToastRef.current();
              return true;
            }

            const normalizedLength = getPlainTextLengthFromString(text);
            if (normalizedLength > remaining) {
              showPasteLimitToastRef.current();
            }

            const truncated = truncatePlainText(text, remaining);
            editor?.commands.insertContent(plainTextToEditorHtml(truncated));
            return true;
          }

          editor?.commands.insertContent(plainTextToEditorHtml(text));
          return true;
        }
        return false;
      },
      transformPastedHTML: (html) => {
        // 1. Очищаем мета-теги и нормализуем неразрывные пробелы
        let cleanHtml = html
          .replace(/<meta[^>]*>/gi, "")
          .replace(/&nbsp;/g, " ");

        // 2. Убираем <br> внутри пустых блоков <p> и <div>.
        // Это критично для Mac/Safari, чтобы избежать "тройных" переносов.
        cleanHtml = cleanHtml.replace(
          /<(p|div)[^>]*>\s*<br\s*\/?>\s*<\/\1>/gi,
          "<$1></$1>",
        );

        // 3. Конвертируем блочные элементы в переносы
        const transformed = cleanHtml
          .replace(/<\/p>|<\/div>/gi, "<br>")
          .replace(/<p[^>]*>|<div[^>]*>/gi, "");

        // 4. Убираем лишние переносы только в самом начале и в самом конце,
        // но сохраняем все переносы внутри текста (не схлопываем 2+ в 2),
        // чтобы юзер мог делать большие отступы, если захочет.
        const finalHtml = transformed
          .replace(/^(<br\s*\/?>\s*)+/i, "")
          .replace(/(<br\s*\/?>\s*)+$/i, "");

        return finalHtml;
      },
    },
  });

  useEffect(() => {
    lastValidHtmlRef.current = currentTemplateContent;
    if (editor) {
      setTextLength(getPlainTextLength(editor));
    }
  }, [currentTemplateContent, editor]);

  // Re-sync if files change from outside
  useEffect(() => {
    if (
      !editor ||
      currentTemplateContent === editor.getHTML() ||
      editor.isFocused
    ) {
      return;
    }

    editor.commands.setContent(currentTemplateContent, false);

    if (maxTextLength && getPlainTextLength(editor) > maxTextLength) {
      truncateEditorToMaxLength(editor, maxTextLength);
      const html = editor.getHTML();
      lastValidHtmlRef.current = html;
      setTextLength(getPlainTextLength(editor));
      syncFilesFromEditor(editor);
      return;
    }

    lastValidHtmlRef.current = editor.getHTML();
    setTextLength(getPlainTextLength(editor));
  }, [
    currentTemplateContent,
    editor,
    maxTextLength,
    syncFilesFromEditor,
  ]);

  // Disable editor when modal is open OR when external `disabled` flag is true
  useEffect(() => {
    if (!editor) return;
    const shouldDisable = isLinkModalOpen || disabled;
    if (shouldDisable) {
      editor.setOptions({ editable: false });
      editor.commands.blur();
    } else {
      editor.setOptions({ editable: true });
    }
  }, [isLinkModalOpen, disabled, editor]);

  const format: TextFormat = {
    bold: editor?.isActive("bold"),
    italic: editor?.isActive("italic"),
    underline: editor?.isActive("underline"),
    strikethrough: editor?.isActive("strike"),
    monospace: editor?.isActive("code"),
  };

  const toggleFormat = useCallback(
    (key: keyof TextFormat) => {
      if (!editor) return;
      const chain = editor.chain().focus();

      if (key === "monospace") {
        if (!editor.isActive("code")) {
          chain.unsetBold().unsetItalic().unsetStrike().unsetUnderline();
        }
        chain.toggleCode().run();
      } else {
        if (editor.isActive("code")) {
          chain.unsetCode();
        }
        switch (key) {
          case "bold":
            chain.toggleBold().run();
            break;
          case "italic":
            chain.toggleItalic().run();
            break;
          case "underline":
            chain.toggleUnderline().run();
            break;
          case "strikethrough":
            chain.toggleStrike().run();
            break;
        }
      }
    },
    [editor],
  );

  const openLinkModal = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    const previousUrl = editor.getAttributes("link").href;
    setLinkText(selectedText || "");
    setLinkUrl(previousUrl || "");
    setIsLinkModalOpen(true);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const { from, to } = editor.state.selection;
      const hasSelection = from !== to;

      if (hasSelection) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run();
      } else {
        const textToInsert = linkText || linkUrl;
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${textToInsert}</a>`)
          .run();
      }
    }
    setIsLinkModalOpen(false);
    setTimeout(() => editor.commands.focus(), 10);
  }, [editor, linkUrl, linkText]);

  return {
    editor,
    format,
    toggleFormat,
    isLinkModalOpen,
    setIsLinkModalOpen,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    openLinkModal,
    applyLink,
    textLength,
  };
};
