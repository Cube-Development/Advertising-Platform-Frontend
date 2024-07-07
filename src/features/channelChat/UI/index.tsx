import { IChannelChat } from "@shared/types/common";
import { Chat } from "@widgets/chat";
import { FC } from "react";

export const ChannelChat: FC<IChannelChat> = ({ id }) => {
  return <Chat />;
};
