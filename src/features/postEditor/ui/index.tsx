import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useState } from "react";
import { Toolbar } from "./toolbar";
import styles from "./styles.module.scss";
import underline from "@tiptap/extension-underline";
import link from "@tiptap/extension-link";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ICreatePost, ICreatePostForm } from "@shared/types/createPost";
import { ContentType, CreatePostFormData } from "@shared/config/createPostData";
import HardBreak from "@tiptap/extension-hard-break";

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  type: CreatePostFormData;
  platformId: number;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  getValues,
  type,
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

    currentPost.text = [{ content_type: ContentType.text, content: content }];
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
