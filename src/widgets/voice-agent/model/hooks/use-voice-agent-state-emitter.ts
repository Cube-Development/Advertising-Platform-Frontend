import { useRoomContext } from "@livekit/components-react";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@shared/hooks";
import { debounce } from "lodash";

/**
 * Hook to emit UI state changes to the LiveKit voice agent.
 * Watches the voiceAgentSync slice in Redux and sends updates via agent-events topic.
 */
export function useVoiceAgentStateEmitter() {
  const room = useRoomContext();
  const syncState = useAppSelector((state) => state.voiceAgentSync);
  const lastSentStateRef = useRef<string>("");

  // Debounced function to send state
  const sendStateUpdate = useRef(
    debounce(async (state: any, roomContext: any) => {
      if (!roomContext || !roomContext.localParticipant) return;

      const stateString = JSON.stringify(state);
      // Don't send if nothing changed
      if (stateString === lastSentStateRef.current) return;

      const payload = JSON.stringify({
        type: "UI_STATE_CHANGED",
        ...state,
      });

      const encoder = new TextEncoder();
      const data = encoder.encode(payload);

      try {
        await roomContext.localParticipant.publishData(data, {
          reliable: true,
          topic: "agent-events",
        });
        lastSentStateRef.current = stateString;
        console.log("Voice Agent: Emitted UI_STATE_CHANGED", state);
      } catch (error) {
        console.error("Voice Agent: Failed to emit state change", error);
      }
    }, 1000),
  ).current;

  useEffect(() => {
    if (room) {
      sendStateUpdate(syncState, room);
    }
  }, [syncState, room, sendStateUpdate]);
}
