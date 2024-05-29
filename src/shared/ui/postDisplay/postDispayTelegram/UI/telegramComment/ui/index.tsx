import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface TelegramCommentProps {
  comment: string;
}

export const TelegramComment: FC<TelegramCommentProps> = ({ comment }) => {
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
