import { FC, useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/shadcn-ui/ui/popover";
import { useTranslation } from "react-i18next";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        editor && editor.chain().focus().setHardBreak().run();
      }
    };

    editor && editor.view.dom.addEventListener("keydown", handleKeyDown);

    return () => {
      editor && editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  const { t } = useTranslation();
  const [link, setLink] = useState("");
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
      <Popover>
        <PopoverTrigger asChild>
          <Toggle size={"lg"} pressed={editor.isActive("url")}>
            <Link className="h-8 w-8" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={-60}
          className="relative p-0 rounded-[10px]"
          align="end"
        >
          <input
            className="col-span-2 rounded-[10px] h-full p-2 border-[0.5px] border-solid border-[rgba(0,0,0,0.4)] w-full pr-[50px]"
            placeholder={t("url_link")}
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <div
            onClick={() => {
              if (link.length > 0) {
                editor.chain().focus().toggleLink({ href: link }).run();
              }
            }}
            className="cursor-pointer rounded-r-[10px] bg-[#000] h-full p-2 w-16 flex center justify-center absolute top-0 right-0"
          >
            <Link className="h-5 w-10 text-white" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
