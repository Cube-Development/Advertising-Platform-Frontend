import { IChannelChat } from "@entities/project";
import { Chat } from "@widgets/communication";
import { FC } from "react";

export const OrderChat: FC<IChannelChat> = ({ id }) => {
  return <Chat />;
};
