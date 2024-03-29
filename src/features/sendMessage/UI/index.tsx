import { FC } from "react";
import styles from "./styles.module.scss";
import { AddIcon, SendIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";

interface SendMessageProps {}

export const SendMessage: FC<SendMessageProps> = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div>
        <AddIcon />
      </div>
      <div className={styles.input}>
        <input type="text" placeholder={t("chat.new_message")} />
      </div>
      <div>
        <SendIcon />
      </div>
    </div>
  );
};
