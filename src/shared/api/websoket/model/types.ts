import { IMessageNewSocket, IMessageSendSocket } from "@entities/communication";
import { Centrifuge } from "centrifuge";

export type CentrifugeContextType = {
  centrifuge: Centrifuge | null;
  OrderMessageSend: (message: IMessageSendSocket) => Promise<void>;
  OrderMessageNewChat: (
    handleNewMessageChat: (message: IMessageNewSocket) => void,
  ) => void;
  OrderMessageNew: (
    handleNewMessage: (message: IMessageNewSocket) => void,
  ) => void;
  OrderReadMessage: (
    handleReadMessage: (message: IMessageNewSocket) => void,
  ) => void;
};
