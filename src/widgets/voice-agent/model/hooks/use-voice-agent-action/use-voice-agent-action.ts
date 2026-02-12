import { useRoomContext } from "@livekit/components-react";
import { useCallback, useEffect } from "react";
import { ENUM_VOICE_AGENT_ACTIONS } from "../../constants";
import { useAddToCart } from "./use-add-to-cart";
import { usePipelineHandler } from "./use-pipeline-handler";
import { useSiteNavigate } from "./use-site-navigate";

export function useVoiceAgentActions(): void {
  const room = useRoomContext();

  const { handleNavigate } = useSiteNavigate();
  const { handleAddToCart, handleRemoveFromCart } = useAddToCart();
  const { handlePipeline } = usePipelineHandler();

  const handleCheckType = useCallback(
    async (action: any) => {
      console.log("Voice Agent: Action check type:", action);

      if (action.type === ENUM_VOICE_AGENT_ACTIONS.PIPELINE_INTENT) {
        await handlePipeline(action);
      } else if (action.action === ENUM_VOICE_AGENT_ACTIONS.NAVIGATE_USER) {
        await handleNavigate(action.screen);
      } else if (action.action === ENUM_VOICE_AGENT_ACTIONS.ADD_TO_CART) {
        const items = action.payload.channels;
        await handleAddToCart(items);
      } else if (action.action === ENUM_VOICE_AGENT_ACTIONS.REMOVE_FROM_CART) {
        const items = action.ids || action.channelIds;
        await handleRemoveFromCart(items);
      }
    },
    [handleNavigate, handleAddToCart, handleRemoveFromCart, handlePipeline],
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
          `  Size: ${info.size || "N/A"}`,
      );

      (async () => {
        try {
          for await (const chunk of reader) {
            console.log(`Next chunk: ${chunk}`);
            const data = JSON.parse(chunk);
            await handleCheckType(data);
          }
          console.log("Agent events stream completed");
        } catch (error) {
          console.error("Error reading agent events stream:", error);
        }
      })();
    };

    room.registerTextStreamHandler("agent-events", handler);

    return () => {
      room.unregisterTextStreamHandler("agent-events");
    };
  }, [room, handleCheckType]);
}
