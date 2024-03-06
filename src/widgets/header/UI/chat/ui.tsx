import { ChatIcon } from "@shared/assets";
import { FC } from "react";
import styles from "./styles.module.scss";

export const Chat: FC = () => {
  return (
    <div className={styles.chat}>
      <ChatIcon />
    </div>
  );
};
