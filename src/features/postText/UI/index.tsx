import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ICreatePost, ICreatePostForm } from "@shared/types/createPost";
import { CreatePostFormData } from "@shared/config/createPostData";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface PostTextProps {
  placeholder: string;
  rows: number;
  maxLength: number;
  type: CreatePostFormData;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  platformId: number;
}

export const PostText: FC<PostTextProps> = ({
  placeholder,
  rows,
  maxLength,
  setValue,
  type,
  getValues,
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
    const startText = currentPost.comment || "";
    setDescription(startText);
  }, [getValues, platformId]);

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
    currentPost.comment = newText;
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
