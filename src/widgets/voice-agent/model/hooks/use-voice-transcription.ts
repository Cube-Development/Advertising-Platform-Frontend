import {
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect } from "react";
import type { ChatMessage } from "..";
import { useVoiceAgentState } from "./use-voice-agent-state";

export function useVoiceTranscription() {
  const { agentTranscriptions, state, audioTrack } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const { messages: globalMessages, addMessages } = useVoiceAgentState();

  // Синхронизация транскрипций с глобальным состоянием
  useEffect(() => {
    const newMessages: ChatMessage[] = [
      ...(agentTranscriptions?.map((t) => ({
        id: t.id || `agent-${t.firstReceivedTime}`,
        text: t.text,
        type: "agent" as const,
        timestamp: Date.now(),
        firstReceivedTime: t.firstReceivedTime,
      })) ?? []),
      ...(userTranscriptions?.map((t) => ({
        id: t.id || `user-${t.firstReceivedTime}`,
        text: t.text,
        type: "user" as const,
        timestamp: Date.now(),
        firstReceivedTime: t.firstReceivedTime,
      })) ?? []),
    ];

    if (newMessages.length > 0) {
      addMessages(newMessages);
    }
  }, [agentTranscriptions, userTranscriptions, addMessages]);

  // Возвращаем глобальные сообщения вместо локальных
  return { messages: globalMessages, state, audioTrack };
}
