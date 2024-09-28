import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface YoutubeCommentProps {
  comment: string;
  fontSize: number;
}

export const YoutubeComment: FC<YoutubeCommentProps> = ({
  comment,
  fontSize,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.comment}>
      <p
        className={styles.comment__title}
        style={{ fontSize: `${fontSize}px` }}
      >
        {t("create_order.create.comment_to_post")}
      </p>
      <p className={styles.comment__text} style={{ fontSize: `${fontSize}px` }}>
        {comment}
      </p>
    </div>
  );
};
