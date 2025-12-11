import { useEffect, useState } from "react";
import {
  useVoiceAssistant,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import type { ChatMessage } from "..";

/**
 * Хук для получения транскрипций голосового общения
 * Применяет DRY - вся логика транскрипций в одном месте
 */
export function useVoiceTranscription() {
  const { agentTranscriptions, state, audioTrack } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const allMessages: ChatMessage[] = [
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
    ].sort((a, b) => (a.firstReceivedTime || 0) - (b.firstReceivedTime || 0));

    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions]);

  return { messages, state, audioTrack };
}
