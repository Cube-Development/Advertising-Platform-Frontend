import { ChatChooseIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ChatEmpty: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.chat__choose}>
      <ChatChooseIcon />
      <div className={styles.no_messages}>
        <p>{t("chat.chat_choose")}</p>
      </div>
    </div>
  );
};
