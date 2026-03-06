import { cn } from "@shared/ui";
import { EditorContent } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { IEditorFile, useTemplateEditor } from "../model";
import { LinkModal } from "./link-modal";
import styles from "./styles.module.scss";
import { Toolbar } from "./toolbar";

interface PostEditorProps<T extends IEditorFile> {
  files: T[];
  onUpdate: (updatedFiles: T[]) => void;
  className?: string;
}

export const PostEditor = <T extends IEditorFile>({
  files,
  onUpdate,
  className,
}: PostEditorProps<T>) => {
  const { t } = useTranslation();

  const {
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
  } = useTemplateEditor({ files, onUpdate });

  if (!editor) return null;

  return (
    <div className={styles.editor}>
      <div
        className={cn("relative pt-3 pb-12 min-h-[200px] h-[200px]", className)}
      >
        <div className="relative h-full overflow-hidden transition-all bg-transparent">
          <EditorContent
            editor={editor}
            className={cn(
              "h-full px-4 overflow-auto bg-transparent focus:outline-none text-base template-editor-content post-content post_pasted_link",
              "w-full [&_.ProseMirror]:outline-none [&_code]:font-mono [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_u]:underline text-base",
              editor.isEmpty &&
                "[&_.ProseMirror_p:first-child]:before:content-[attr(data-placeholder)] [&_.ProseMirror_p:first-child]:before:float-left [&_.ProseMirror_p:first-child]:before:text-gray-400 [&_.ProseMirror_p:first-child]:before:pointer-events-none [&_.ProseMirror_p:first-child]:before:h-0",
              styles.content,
            )}
            data-placeholder={t("create_order.create.start_typing")}
          />
        </div>
        <Toolbar
          format={format}
          onToggleFormat={toggleFormat}
          onAddLink={(url) => {
            editor.chain().focus().setLink({ href: url }).run();
          }}
          onLinkButtonClick={openLinkModal}
        />
      </div>

      <LinkModal
        isOpen={isLinkModalOpen}
        onOpenChange={setIsLinkModalOpen}
        linkText={linkText}
        setLinkText={setLinkText}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        onApply={applyLink}
      />
    </div>
  );
};
