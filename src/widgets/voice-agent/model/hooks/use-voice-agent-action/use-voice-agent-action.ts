import { useRoomContext } from "@livekit/components-react";
import { useCallback, useEffect } from "react";
import { ENUM_VOICE_ACTIONS, IVoiceAgentAction } from "../../types";
import { useSiteNavigate } from "./use-site-navigate";
import { useAddToCart } from "./use-add-to-cart";

export function useVoiceAgentActions(): void {
  const room = useRoomContext();

  const { handleNavigate } = useSiteNavigate();
  const { handleAddToCart } = useAddToCart();

  const handleCheckType = useCallback(
    async (action: IVoiceAgentAction) => {
      if (action.action === ENUM_VOICE_ACTIONS.NAVIGATE_USER) {
        await handleNavigate(action.path);
      } else if (action.action === ENUM_VOICE_ACTIONS.ADD_TO_CART) {
        await handleAddToCart(action.ids);
      }
    },
    [handleNavigate],
  );

  useEffect(() => {
    if (!room) return;

    const handler = (reader: AsyncIterable<string>, participantInfo: any) => {
      const info = (reader as any).info;
      console.log(
        `Received text stream from ${participantInfo.identity}\n` +
          `  Topic: ${info.topic}\n` +
          `  Timestamp: ${info.timestamp}\n` +
          `  ID: ${info.id}\n` +
          `  Size: ${info.size || "N/A"}`, // Optional, only available if the stream was sent with `sendText`
      );

      // Process the stream incrementally
      (async () => {
        try {
          for await (const chunk of reader) {
            const data: IVoiceAgentAction = JSON.parse(chunk);
            console.log(`Next chunk: ${chunk}`);
            await handleCheckType(data);
          }
          console.log("Agent events stream completed");
        } catch (error) {
          console.error("Error reading agent events stream:", error);
        }
      })();
    };

    // Register the handler for the specific topic
    room.registerTextStreamHandler("agent-events", handler);

    // Cleanup function to unregister the handler
    return () => {
      room.unregisterTextStreamHandler("agent-events");
    };
  }, [room, handleCheckType]);
}
