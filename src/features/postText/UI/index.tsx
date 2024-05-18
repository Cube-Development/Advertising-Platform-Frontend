import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ICreatePost, ICreatePostForm, IFile } from "@shared/types/createPost";
import { CreatePostFormData } from "@shared/config/createPostData";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface PostTextProps {
  placeholder: string;
  rows: number;
  maxLength: number;
  type: CreatePostFormData;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  contentId?: number;
  platformId: number;
}

export const PostText: FC<PostTextProps> = ({
  placeholder,
  rows,
  maxLength,
  setValue,
  type,
  getValues,
  contentId,
  platformId,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    // Установка начального значения при монтировании компонента
    const form: ICreatePostForm = { ...getValues() };
    const currentPost = form.posts.find(
      (item) => item.platform === platformId,
    ) || {
      project_id: form.project_id,
      platform: platformId,
    };
    const startText = contentId
      ? (currentPost.files || []).find(
          (item) => item.content_type === contentId,
        )?.content || ""
      : currentPost.comment || "";
    setDescription(startText);
  }, [getValues, platformId, contentId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setDescription(newText);
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
        { content_type: contentId, content: newText },
      ];
    } else {
      currentPost.comment = newText;
    }
    console.log(currentPost);
    setValue(type, [...posts, currentPost]);
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        id="input"
        value={description}
        rows={rows}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={t(placeholder)}
      />
    </div>
  );
};
