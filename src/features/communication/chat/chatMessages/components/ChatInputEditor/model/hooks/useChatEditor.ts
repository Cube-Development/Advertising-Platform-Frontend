import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from "react";
import { ChatInputEditorProps } from "../types/chatEditor.types";

export const useChatEditor = ({
  content,
  onChange,
  onSend,
}: Pick<ChatInputEditorProps, "content" | "onChange" | "onSend">) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "main_font h-full px-3 py-3 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] max-h-[144px] overflow-y-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-black ProseMirror-chat",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          onSend();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content === "" && !editor.isEmpty) {
      editor.commands.clearContent();
    }
  }, [content, editor]);

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
      // Replace selection with new text node with only link mark
      // This effectively unsets any existing marks like 'code'
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent({
          type: "text",
          text: linkText || linkUrl,
          marks: [
            {
              type: "link",
              attrs: { href: linkUrl },
            },
          ],
        })
        .run();
    }
    setIsLinkModalOpen(false);
    // Explicitly focus editor after modal close
    setTimeout(() => editor.commands.focus(), 10);
  }, [editor, linkUrl, linkText]);

  return {
    editor,
    isLinkModalOpen,
    setIsLinkModalOpen,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    applyLink,
    openLinkModal,
  };
};
