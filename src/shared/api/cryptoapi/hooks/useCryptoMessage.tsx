import { useCallback } from "react";
import { useCryptoWebSocket } from "./useCryptoCertificates";

export const useCryptoMessage = () => {
  const { sendMessage, isConnected, error } = useCryptoWebSocket();

  const sendWebSocketMessage = useCallback(
    async (plugin: string, name: string, args: any[] = []) => {
      return await sendMessage({
        plugin,
        name,
        arguments: args,
      });
    },
    [sendMessage],
  );

  const sendRawMessage = useCallback(
    async (messageObject: any) => {
      return await sendMessage(messageObject);
    },
    [sendMessage],
  );

  return {
    sendWebSocketMessage,
    sendRawMessage,
    sendMessage,
    isConnected,
    error,
  };
};
