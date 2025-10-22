import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  POST,
} from "@entities/project";
import link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph"; // импортируем параграф для кастомизации
import underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  parseMarkdownToHtml,
  isMarkdownText,
  cleanHtmlForTiptap,
} from "@shared/utils/markdownParser";
import styles from "./styles.module.scss";
import { Toolbar } from "./toolbar";

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  type: CreatePostFormData;
  platformId: number;
  formState: ICreatePostForm;
  disabled?: boolean;
  placeholder?: string;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  type,
  platformId,
  formState,
  placeholder,
  disabled = false,
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

  const startContent = placeholder || currentPost?.text?.[0]?.content || "";
  const [content, setContent] = useState(() => {
    // Проверяем, является ли начальный контент Markdown
    if (startContent && isMarkdownText(startContent)) {
      const htmlContent = parseMarkdownToHtml(startContent);
      return cleanHtmlForTiptap(htmlContent);
    }
    return startContent;
  });
  const limit = POST.POST_LENGTH;

  useEffect(() => {
    // Проверяем, является ли новый контент Markdown
    if (startContent && isMarkdownText(startContent)) {
      const htmlContent = parseMarkdownToHtml(startContent);
      const cleanedHtml = cleanHtmlForTiptap(htmlContent);
      setContent(cleanedHtml);
    } else {
      setContent(startContent);
    }
  }, [startContent]);

  // Обработка вставки текста с поддержкой Markdown
  const handlePaste = (_view: unknown, event: ClipboardEvent) => {
    const pastedText = event.clipboardData?.getData("text/plain");

    if (pastedText && isMarkdownText(pastedText)) {
      // Парсим Markdown в HTML
      const htmlContent = parseMarkdownToHtml(pastedText);
      const cleanedHtml = cleanHtmlForTiptap(htmlContent);

      // Вставляем HTML в редактор через команду
      editor?.commands.insertContent(cleanedHtml);

      return true; // Предотвращаем стандартную обработку
    }

    return false; // Позволяем стандартную обработку
  };

  // Конфигурация редактора с изменением поведения параграфов
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        // paragraph: {
        //   HTMLAttributes: {
        //     class: "my-custom-paragraph",
        //   },
        // },
        paragraph: false,
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
      handlePaste: handlePaste,
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

    // Проверяем длину текста без HTML тегов
    const textLength = cleanedContent.replace(/<[^>]*>/g, "").length;

    if (textLength > limit) {
      // Обрезаем контент до лимита
      const truncatedContent = cleanedContent.substring(0, limit);
      setContent(truncatedContent);
      editor?.commands.setContent(truncatedContent);
      return;
    }

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
      <EditorContent editor={editor} className="relative pt-3 pb-12 h-full">
        <Toolbar editor={editor} />
      </EditorContent>
    </div>
  );
};
