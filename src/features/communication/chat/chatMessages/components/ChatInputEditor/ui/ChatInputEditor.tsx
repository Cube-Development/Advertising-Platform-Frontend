import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  cn,
} from "@shared/ui";
import { EditorContent } from "@tiptap/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ChatInputEditorProps, useChatEditor } from "../model";
import { LinkModal } from "./LinkModal";

export const ChatInputEditor: FC<ChatInputEditorProps> = (props) => {
  const { placeholder } = props;
  const { t } = useTranslation();

  const {
    editor,
    isLinkModalOpen,
    setIsLinkModalOpen,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    applyLink,
    openLinkModal,
  } = useChatEditor(props);

  if (!editor) return null;

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
          <div className="relative flex-1 overflow-hidden transition-all border rounded-md border-input bg-muted/50 focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
            <EditorContent
              editor={editor}
              className={cn(
                "w-full h-full [&_.ProseMirror]:outline-none [&_code]:font-mono [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_u]:underline",
                editor.isEmpty &&
                  "[&_.ProseMirror_p:first-child]:before:content-[attr(data-placeholder)] [&_.ProseMirror_p:first-child]:before:float-left [&_.ProseMirror_p:first-child]:before:text-gray-400 [&_.ProseMirror_p:first-child]:before:pointer-events-none [&_.ProseMirror_p:first-child]:before:h-0",
              )}
              data-placeholder={placeholder || t("chat.new_message")}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56 blur_content">
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="flex items-center justify-between"
          >
            <span>{t("chat.format.bold")}</span>
            <span className="text-xs opacity-50">Ctrl+B</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="flex items-center justify-between"
          >
            <span>{t("chat.format.italic")}</span>
            <span className="text-xs opacity-50">Ctrl+I</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleCode().run()}
            className="flex items-center justify-between"
          >
            <span>{t("chat.format.monospace")}</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={openLinkModal}
            className="flex items-center justify-between"
          >
            <span>{t("chat.format.link")}</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <LinkModal
        isOpen={isLinkModalOpen}
        onOpenChange={setIsLinkModalOpen}
        linkText={linkText}
        setLinkText={setLinkText}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        onApply={applyLink}
      />
    </>
  );
};
