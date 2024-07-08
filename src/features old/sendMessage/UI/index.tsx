import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { AddIcon, SendIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import { IChat, IMessage } from "@shared/types/chat";
import { chatRoles } from "@shared/config/roles";

interface SendMessageProps {
  onChange: (message: IMessage) => void;
}

export const SendMessage: FC<SendMessageProps> = ({ onChange }) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleOnChange = (value: string) => {
    setNewMessage(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNewMessage();
    }
  };

  const handleNewMessage = () => {
    if (newMessage !== "") {
      const currentDate: Date = new Date();
      const year: number = currentDate.getFullYear();
      const month: number = currentDate.getMonth() + 1;
      const day: number = currentDate.getDate();
      const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const hours: number = currentDate.getHours();
      const minutes: number = currentDate.getMinutes();
      const formattedTime: string = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      onChange({
        type: chatRoles.sender,
        message: newMessage,
        date: formattedDate,
        time: formattedTime,
      });

      (document.getElementById("sendInput") as HTMLInputElement).value = "";
      setNewMessage("");
    }
  };

  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <button>
        <AddIcon />
      </button>
      <div className={styles.input}>
        <input
          id="sendInput"
          type="text"
          placeholder={t("chat.new_message")}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <button onClick={handleNewMessage}>
        <SendIcon />
      </button>
    </div>
  );
};
