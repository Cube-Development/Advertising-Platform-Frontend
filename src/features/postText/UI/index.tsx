import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ICreatePostForm } from "@shared/types/createPost";
import { CreatePostFormData } from "@shared/config/createPostData";
import { UseFormSetValue } from "react-hook-form";

interface PostTextProps {
  placeholder: string;
  rows: number;
  maxLength: number;
  type: CreatePostFormData;
  setValue: UseFormSetValue<ICreatePostForm>;
  platformId: number;
  formState: ICreatePostForm;
}

export const PostText: FC<PostTextProps> = ({
  placeholder,
  rows,
  maxLength,
  setValue,
  type,
  platformId,
  formState,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const currentPost = formState?.selectedMultiPostId
      ? formState?.multiposts?.find(
          (item) => item?.order_id === formState?.selectedMultiPostId
        )
      : formState?.posts?.find((item) => item?.platform === platformId) || {
          platform: platformId,
        };
    if (currentPost) {
      const startText = currentPost.comment || "";
      setDescription(startText);
    }
  }, [formState, platformId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setDescription(newText);
    const posts = formState?.selectedMultiPostId
      ? formState?.multiposts?.filter(
          (item) => item?.order_id !== formState?.selectedMultiPostId
        ) || []
      : formState?.posts?.filter((item) => item?.platform !== platformId) || [];

    const currentPost = formState?.selectedMultiPostId
      ? formState?.multiposts?.find(
          (item) => item?.order_id === formState?.selectedMultiPostId
        )
      : formState?.posts?.find((item) => item?.platform === platformId) || {
          platform: platformId,
        };
    if (currentPost) {
      currentPost.comment = newText;
      setValue(type, [...posts, currentPost]);
    }
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
