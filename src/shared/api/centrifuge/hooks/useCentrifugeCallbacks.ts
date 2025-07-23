import { useRef, useCallback } from "react";
import { IMessageNewSocket } from "@entities/communication";

export function useCentrifugeCallbacks() {
  const handleNewMessageRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );
  const handleNewMessageChatRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );
  const handleReadMessageRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );

  const OrderMessageNew = useCallback(
    (callback: (message: IMessageNewSocket) => void) => {
      handleNewMessageRef.current = callback;
    },
    [],
  );

  const OrderMessageNewChat = useCallback(
    (callback: (message: IMessageNewSocket) => void) => {
      handleNewMessageChatRef.current = callback;
    },
    [],
  );

  const OrderReadMessage = useCallback(
    (callback: (message: IMessageNewSocket) => void) => {
      handleReadMessageRef.current = callback;
    },
    [],
  );

  return {
    handleNewMessageRef,
    handleNewMessageChatRef,
    handleReadMessageRef,
    OrderMessageNew,
    OrderMessageNewChat,
    OrderReadMessage,
  };
}
