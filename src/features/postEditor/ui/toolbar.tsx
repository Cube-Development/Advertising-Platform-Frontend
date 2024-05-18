import { FC } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@shared/ui/shadcn-ui/ui/toggle";
import {
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
  WholeWord,
} from "lucide-react";
import styles from "./styles.module.scss";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className={styles.toolbar}>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <WholeWord className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        pressed={editor.isActive("link")}
        onPressedChange={() => {
          const url = window.prompt("Введите URL адрес:");
          if (url) {
            editor.chain().focus().toggleLink({ href: url }).run();
          }
        }}
      >
        <Link className="h-8 w-8" />
      </Toggle>
    </div>
  );
};
