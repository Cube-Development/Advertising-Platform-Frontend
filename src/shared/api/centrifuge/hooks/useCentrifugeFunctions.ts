import { IMessageSendSocket } from "@entities/communication";
import { PERSONAL_CHANNEL_PREFIX } from "../model";

export const useCentrifugeFunctions = (userId: string, centrifugeRef: any) => {
  const OrderMessageSend = async (
    message: IMessageSendSocket,
    channel: string = PERSONAL_CHANNEL_PREFIX.COMMON,
  ) => {
    if (!centrifugeRef.current)
      throw new Error("Centrifuge instance is not initialized");
    try {
      await centrifugeRef.current.publish(channel + userId, message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    OrderMessageSend,
  };
};
