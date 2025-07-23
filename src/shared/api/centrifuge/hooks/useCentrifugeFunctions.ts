import { IMessageSendSocket } from "@entities/communication";

export const useCentrifugeFunctions = (
  personalChannel: string,
  centrifugeRef: any,
) => {
  const OrderMessageSend = async (message: IMessageSendSocket) => {
    if (!centrifugeRef.current)
      throw new Error("Centrifuge instance is not initialized");
    try {
      await centrifugeRef.current.publish(personalChannel, message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    OrderMessageSend,
  };
};
