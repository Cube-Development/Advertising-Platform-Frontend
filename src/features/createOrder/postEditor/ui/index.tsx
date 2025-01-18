import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
} from "@entities/project";
import link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph"; // импортируем параграф для кастомизации
import underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";
import { Toolbar } from "./toolbar";

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  type: CreatePostFormData;
  platformId: number;
  formState: ICreatePostForm;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  type,
  platformId,
  formState,
}) => {
  const postsWithoutCurrent = formState?.selectedMultiPostId
    ? formState?.multiposts?.filter(
        (item) => item?.order_id !== formState?.selectedMultiPostId,
      ) || []
    : formState?.posts?.filter(
        (item) =>
          item?.platform !== platformId ||
          (item?.platform === platformId &&
            item?.post_type !== formState?.selectedPostType),
      ) || [];

  const currentPost = formState?.selectedMultiPostId
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
      };

  const startContent = currentPost?.text?.[0]?.content || "";
  const [content, setContent] = useState(startContent);
  const limit = 1000;

  useEffect(() => {
    setContent(startContent);
  }, [startContent]);

  // Конфигурация редактора с изменением поведения параграфов
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "my-custom-paragraph",
          },
        },
      }),
      underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      link.configure({
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "hyperlink",
        },
        autolink: false,
      }),
      Paragraph.extend({
        // Переопределяем поведение нажатия на Enter для создания нового параграфа
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              this.editor.commands.createParagraphNear(); // Создание нового <p> вместо <br>
              return true;
            },
          };
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "h-full px-4 overflow-auto bg-transparent text-black focus:outline-none text-base",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && startContent !== editor.getHTML()) {
      editor.commands.setContent(startContent); // Обновляем содержимое редактора
    }
  }, [startContent, editor]);

  const handleChange = (content: string) => {
    const cleanedContent = content.replace(/(<br\s*\/?>\s*){2,}/g, "<p></p>");
    setContent(cleanedContent);
    if (currentPost) {
      currentPost.text = [
        { content_type: ContentType.text, content: cleanedContent },
      ];
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  };

  return (
    <div className={styles.editor}>
      <EditorContent
        editor={editor}
        className="pb-12 pt-3 h-full relative"
        maxLength={limit}
      >
        <Toolbar editor={editor} />
      </EditorContent>
    </div>
  );
};
