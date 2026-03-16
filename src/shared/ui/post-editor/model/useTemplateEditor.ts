import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState, useMemo } from "react";
import { ContentType, IEditorFile, TextFormat } from "./types";

export const useTemplateEditor = <T extends IEditorFile>({
  files,
  onUpdate,
}: {
  files: T[];
  onUpdate: (updatedFiles: T[]) => void;
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      const currentFiles = files || [];
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
    editorProps: {
      attributes: {
        class:
          "h-full px-4 overflow-auto bg-transparent focus:outline-none text-base template-editor-content post-content post_pasted_link",
      },
      // Map Enter to HardBreak to ensure <br> is used instead of new <p>
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          editor?.commands.setHardBreak();
          return true;
        }
        return false;
      },
      // Preserve newlines when pasting plain text by converting them to <br>
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData("text/plain");
        const html = event.clipboardData?.getData("text/html");

        console.log("Paste detected:", {
          hasText: !!text,
          hasHtml: !!html,
          textLength: text?.length,
          htmlLength: html?.length,
          text,
          html,
        });

        // If we have plain text but no HTML (like from Notepad),
        // manually convert it to HTML with <br> to preserve exact formatting
        if (text && !html) {
          const formattedHtml = text.replace(/\r?\n/g, "<br>");
          editor?.commands.insertContent(formattedHtml);
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
        cleanHtml = cleanHtml.replace(/<(p|div)[^>]*>\s*<br\s*\/?>\s*<\/\1>/gi, "<$1></$1>");

        // 3. Конвертируем блочные элементы в переносы
        const transformed = cleanHtml
          .replace(/<\/p>|<\/div>/gi, "<br>")
          .replace(/<p[^>]*>|<div[^>]*>/gi, "");

        // 4. Убираем лишние переносы только в самом начале и в самом конце,\n        // но сохраняем все переносы внутри текста (не схлопываем 2+ в 2),\n        // чтобы юзер мог делать большие отступы, если захочет.
        const finalHtml = transformed
          .replace(/^(<br\s*\/?>\s*)+/i, "")
          .replace(/(<br\s*\/?>\s*)+$/i, "");

        console.log("Processed HTML for paste (preserves gaps):", finalHtml);
        return finalHtml;
      },
    },
  });

  // Re-sync if files change from outside
  useEffect(() => {
    if (
      editor &&
      currentTemplateContent !== editor.getHTML() &&
      !editor.isFocused
    ) {
      editor.commands.setContent(currentTemplateContent);
    }
  }, [currentTemplateContent, editor]);

  // Disable editor when modal is open
  useEffect(() => {
    if (editor) {
      if (isLinkModalOpen) {
        editor.setOptions({ editable: false });
        editor.commands.blur();
      } else {
        editor.setOptions({ editable: true });
      }
    }
  }, [isLinkModalOpen, editor]);

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
  };
};
