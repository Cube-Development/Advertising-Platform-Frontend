import { IChannelChat } from "@shared/types/common";
import { Chat } from "@widgets/header/UI/chat";
import { FC } from "react";

export const ChannelChat: FC<IChannelChat> = ({ id }) => {
  return <Chat />;
};
