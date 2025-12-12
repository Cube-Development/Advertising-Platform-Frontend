import { useRoomContext } from "@livekit/components-react";
import { ENUM_PATHS } from "@shared/routing";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Хук для обработки действий от голосового агента
 * Слушает text stream от агента и выполняет действия (например, навигацию)
 */
enum ENUM_VOICE_ACTIONS {
  navigate_user = "navigate_user",
}

interface IVoiceAgentAction {
  type: string;
  action: ENUM_VOICE_ACTIONS;
  path: ENUM_PATHS;
}

export function useVoiceAgentActions() {
  const room = useRoomContext();
  const navigate = useNavigate();

  // Мемоизируем функции, чтобы избежать пересоздания на каждом рендере
  const handleNavigate = useCallback(async (path: ENUM_PATHS) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  }, []);

  const handleCheckType = useCallback(
    async (action: IVoiceAgentAction) => {
      if (action.action === ENUM_VOICE_ACTIONS.navigate_user) {
        await handleNavigate(action.path);
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

  // Возвращаем глобальные сообщения вместо локальных
  return {};
}
