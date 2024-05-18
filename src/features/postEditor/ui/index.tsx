import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useState } from "react";
import { Toolbar } from "./toolbar";
import styles from "./styles.module.scss";
import underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ICreatePost, ICreatePostForm, IFile } from "@shared/types/createPost";
import { CreatePostFormData } from "@shared/config/createPostData";

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  type: CreatePostFormData;
  contentId?: number;
  platformId: number;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  getValues,
  type,
  contentId,
  platformId,
}) => {
  const form: ICreatePostForm = { ...getValues() };
  const currentPost = form.posts.find(
    (item) => item.platform === platformId,
  ) || {
    project_id: form.project_id,
    platform: platformId,
  };
  const startContent =
    (currentPost.files || []).find((item) => item.content_type === contentId)
      ?.content || "";
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
      Link.configure({
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "hyperlink",
        },
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
    const form: ICreatePostForm = { ...getValues() };
    const posts: ICreatePost[] = (form.posts || []).filter(
      (item) => item.platform !== platformId,
    );

    const currentPost = (form.posts || []).find(
      (item) => item.platform === platformId,
    ) || {
      project_id: form.project_id,
      platform: platformId,
    };

    if (contentId) {
      const files: IFile[] = (currentPost.files || []).filter(
        (item) => item.content_type !== contentId,
      );
      currentPost.files = [
        ...files,
        { content_type: contentId, content: content },
      ];
    }
    setValue(type, [...posts, currentPost]);
  };

  return (
    <div className={styles.editor}>
      <EditorContent
        key={platformId}
        editor={editor}
        className="pb-12 pt-3 h-full relative"
        maxLength={limit}
      >
        <Toolbar editor={editor} />
      </EditorContent>
    </div>
  );
};
