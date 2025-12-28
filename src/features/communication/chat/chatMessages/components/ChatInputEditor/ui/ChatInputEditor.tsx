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

  const contextMenuItems = [
    {
      label: t("chat.format.bold"),
      shortcut: "Ctrl+B",
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: t("chat.format.italic"),
      shortcut: "Ctrl+I",
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: t("chat.format.underline"),
      shortcut: "Ctrl+U",
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: t("chat.format.strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: t("chat.format.monospace"),
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      label: t("chat.format.link"),
      onClick: openLinkModal,
    },
  ];

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
        <ContextMenuContent className="w-56 blur_content max-md:!-translate-y-10">
          {contextMenuItems.map((item, index) => (
            <ContextMenuItem
              key={index}
              onClick={item.onClick}
              className="flex items-center justify-between"
            >
              <span>{item.label}</span>
              {item.shortcut && (
                <span className="text-xs opacity-50">{item.shortcut}</span>
              )}
            </ContextMenuItem>
          ))}
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
