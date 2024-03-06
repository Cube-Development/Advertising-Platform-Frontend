import { ChatIcon } from "@shared/assets";
import { IChannelChat } from "@shared/types/common";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ChannelChat: FC<IChannelChat> = ({ id }) => {
  return (
    <div>
      <ChatIcon />
    </div>
  );
};
