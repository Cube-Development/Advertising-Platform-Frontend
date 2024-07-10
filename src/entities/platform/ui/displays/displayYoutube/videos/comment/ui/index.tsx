import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface YoutubeCommentProps {
  comment: string;
}

export const YoutubeComment: FC<YoutubeCommentProps> = ({ comment }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.comment}>
      <p className={styles.comment__title}>
        {t("create_order.create.comment_to_post")}
      </p>
      <p className={styles.comment__text}>{comment}</p>
    </div>
  );
};
