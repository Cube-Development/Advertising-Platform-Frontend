import {
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { ENUM_CHAT_MESSAGE_TYPE, type IChatMessage } from "..";

export function useVoiceTranscription() {
  const { agentTranscriptions, state, audioTrack } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [inputParticipant, setInputParticipant] = useState<IChatMessage[]>([]);

  const [messages, setMessages] = useState<IChatMessage[]>([]);

  useEffect(() => {
    const allMessages: IChatMessage[] = [
      ...(agentTranscriptions?.map((t) => ({
        id: t.id || `${ENUM_CHAT_MESSAGE_TYPE.AGENT}-${t.firstReceivedTime}`,
        text: t.text,
        type: ENUM_CHAT_MESSAGE_TYPE.AGENT,
        timestamp: Date.now(),
        firstReceivedTime: t.firstReceivedTime,
      })) ?? []),
      ...(userTranscriptions?.map((t) => ({
        id: t.id || `${ENUM_CHAT_MESSAGE_TYPE.USER}-${t.firstReceivedTime}`,
        text: t.text,
        type: ENUM_CHAT_MESSAGE_TYPE.USER,
        timestamp: Date.now(),
        firstReceivedTime: t.firstReceivedTime,
      })) ?? []),
      ...inputParticipant,
    ].sort((a, b) => (a.firstReceivedTime || 0) - (b.firstReceivedTime || 0));

    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions, inputParticipant]);

  // Возвращаем глобальные сообщения вместо локальных
  return { messages, state, audioTrack, setInputParticipant };
}
