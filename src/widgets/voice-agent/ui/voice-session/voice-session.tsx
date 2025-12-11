import { useState } from "react";
import {
  useRoomContext,
  useChat,
  ReceivedChatMessage,
  BarVisualizer,
} from "@livekit/components-react";
import { useVoiceTranscription, useMediaControls } from "../../model";
import { ChatTranscript } from "../chat-transcript";
import { SessionControls } from "./components/session-controls";

interface VoiceSessionProps {
  isConnected: boolean;
  onReconnect: () => void;
}

/**
 * Feature: Голосовая сессия
 * Применяет все SOLID принципы - композиция из маленьких компонентов
 */
export function VoiceSession({ isConnected, onReconnect }: VoiceSessionProps) {
  // Безопасное получение room context
  let room = null;
  let state = undefined;
  let track = undefined;
  let messages: any[] = [];
  let microphoneEnabled = false;
  let microphonePending = false;
  let toggleMicrophone = () => {};
  let sendChatMessage:
    | ((message: string) => Promise<ReceivedChatMessage>)
    | undefined;

  try {
    room = useRoomContext();
    const { messages: msg, state: stt, audioTrack } = useVoiceTranscription();
    messages = msg;
    state = stt;
    track = audioTrack;
    const mediaControls = useMediaControls();
    microphoneEnabled = mediaControls.microphoneEnabled;
    microphonePending = mediaControls.microphonePending;
    toggleMicrophone = mediaControls.toggleMicrophone;
    const { send } = useChat();
    sendChatMessage = send;
  } catch (error) {
    // Вне LiveKitRoom - используем пустые значения
  }

  const [chatVisible, setChatVisible] = useState(true);

  const handleCallAction = () => {
    if (isConnected && room) {
      room.disconnect();
    } else {
      onReconnect();
    }
  };

  const handleSendMessage = async (message: string) => {
    if (sendChatMessage && isConnected) {
      await sendChatMessage(message);
    }
  };

  return (
    <section className="relative z-10 w-full h-full overflow-hidden bg-background">
      <div className="w-full h-52">
        <BarVisualizer state={state} barCount={7} track={track} />
      </div>
      {/* Chat Transcript */}
      <ChatTranscript messages={messages} visible={chatVisible} />

      {/* Bottom Control Bar */}
      <div className="fixed bottom-0 z-50 pb-3 inset-x-3 md:inset-x-12 md:pb-12">
        {/* Bottom fade */}
        <div className="absolute inset-x-0 top-0 h-4 -translate-y-full pointer-events-none bg-gradient-to-t from-background to-transparent" />

        <div className="relative max-w-2xl mx-auto">
          <SessionControls
            isConnected={isConnected}
            microphoneEnabled={microphoneEnabled}
            microphoneDisabled={microphonePending}
            chatVisible={chatVisible}
            onToggleMicrophone={toggleMicrophone}
            onToggleChat={setChatVisible}
            onCallAction={handleCallAction}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </section>
  );
}
