import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useState } from "react";
import { Toolbar } from "./toolbar";
import styles from "./styles.module.scss";
import underline from "@tiptap/extension-underline";
import link from "@tiptap/extension-link";
import { UseFormSetValue } from "react-hook-form";
import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
} from "@entities/project";
import Paragraph from "@tiptap/extension-paragraph"; // импортируем параграф для кастомизации

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
  const startContent =
    (currentPost?.text && currentPost?.text[0]?.content) || "";
  const [content, setContent] = useState(startContent);

  const limit = 1000;

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

  const handleChange = (content: string) => {
    const cleanedContent = content.replace(/(<br\s*\/?>\s*){2,}/g, "<p></p>");
    setContent(cleanedContent);

    const posts = formState?.selectedMultiPostId
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
            item?.platform === platformId &&
            item?.post_type === formState?.selectedPostType,
        ) || {
          platform: platformId,
          post_type: formState?.selectedPostType,
        };

    if (currentPost) {
      currentPost.text = [
        { content_type: ContentType.text, content: cleanedContent },
      ];
      setValue(type, [...posts, currentPost]);
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
