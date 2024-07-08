import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ICreatePostForm } from "@shared/types/createPost";
import { CreatePostFormData } from "@shared/config/createPostData";
import { UseFormSetValue } from "react-hook-form";

interface PostCommentProps {
  placeholder: string;
  rows: number;
  maxLength: number;
  type: CreatePostFormData;
  setValue: UseFormSetValue<ICreatePostForm>;
  platformId: number;
  formState: ICreatePostForm;
}

export const PostComment: FC<PostCommentProps> = ({
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
      const startText = currentPost.comment || "";
      setDescription(startText);
    }
  }, [formState, platformId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setDescription(newText);
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
