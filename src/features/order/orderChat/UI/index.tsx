import { IChatOpen } from "@entities/communication";
import { Chat } from "@widgets/communication";
import { FC } from "react";

export const OrderChat: FC<IChatOpen> = ({ orderId, toRole }) => {
  return <Chat orderId={orderId} toRole={toRole} />;
};
