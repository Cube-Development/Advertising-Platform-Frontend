import { IChannelChat } from "@shared/types/common";
import { Chat } from "@widgets/communication";
import { FC } from "react";

export const OrderChat: FC<IChannelChat> = ({ id }) => {
  return <Chat />;
};
