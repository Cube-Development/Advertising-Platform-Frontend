import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useState } from "react";
import { Toolbar } from "./toolbar";
import styles from "./styles.module.scss";
import underline from "@tiptap/extension-underline";
import link from "@tiptap/extension-link";
import { UseFormSetValue } from "react-hook-form";
import { ICreatePostForm } from "@shared/types/createPost";
import { ContentType, CreatePostFormData } from "@shared/config/createPostData";
import HardBreak from "@tiptap/extension-hard-break";

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
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
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
      HardBreak.configure({
        // keepMarks: false,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "h-full px-4 max-h-[300px] overflow-auto bg-transparent text-black focus:outline-none text-sm",
      },
    },
    onUpdate({ editor }) {
      handleChange(editor.getHTML());
    },
  });

  const handleChange = (content: string) => {
    setContent(content);
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
      currentPost.text = [{ content_type: ContentType.text, content: content }];
      setValue(type, [...posts, currentPost]);
    }
  };

  return (
    <div className={styles.editor}>
      <EditorContent
        // key={platformId}
        editor={editor}
        className="pb-12 pt-3 h-full relative"
        maxLength={limit}
      >
        <Toolbar editor={editor} />
      </EditorContent>
    </div>
  );
};
