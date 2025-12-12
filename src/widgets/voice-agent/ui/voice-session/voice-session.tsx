import {
  BarVisualizer,
  ReceivedChatMessage,
  useChat,
  useRoomContext,
} from "@livekit/components-react";
import { cn } from "@shared/ui";
import { useVoiceAgentActions } from "@widgets/voice-agent/model/hooks/use-voice-agent-action/use-voice-agent-action";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useInputControls, useVoiceTranscription } from "../../model";
import { ChatTranscript } from "../chat-transcript";
import { SessionControls } from "../session-controls";

interface VoiceSessionProps {
  isConnected: boolean;
  onReconnect: () => void;
}

/**
 * Feature: Голосовая сессия
 * Применяет все SOLID принципы - композиция из маленьких компонентов
 * Обновлено с использованием useInputControls
 */
export const VoiceSession: FC<VoiceSessionProps> = ({
  isConnected,
  onReconnect,
}) => {
  // Безопасное получение room context
  let room = null;
  let state = undefined;
  let audioTrack = undefined;
  let messages: any[] = [];
  let sendChatMessage:
    | ((message: string) => Promise<ReceivedChatMessage>)
    | undefined;

  // Input controls
  let micTrackRef = undefined;
  let microphoneToggle = { enabled: false, pending: false, toggle: () => {} };
  let handleAudioDeviceChange = undefined;
  let handleMicrophoneDeviceSelectError = undefined;

  try {
    room = useRoomContext();
    const {
      messages: msg,
      state: stt,
      audioTrack: track,
    } = useVoiceTranscription();
    useVoiceAgentActions();
    messages = msg;
    state = stt;
    audioTrack = track;
    const { send } = useChat();
    sendChatMessage = send;

    // Используем новый хук для управления устройствами
    const inputControls = useInputControls({ saveUserChoices: true });
    micTrackRef = inputControls.micTrackRef;
    microphoneToggle = inputControls.microphoneToggle;
    handleAudioDeviceChange = inputControls.handleAudioDeviceChange;
    handleMicrophoneDeviceSelectError =
      inputControls.handleMicrophoneDeviceSelectError;
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

  const ANIMATION_TRANSITION = {
    type: "spring",
    stiffness: 675,
    damping: 75,
    mass: 1,
  };

  return (
    <section className="w-full h-full overflow-hidden bg-background">
      {/* Agent Visualization */}
      <div className="flex items-center justify-center w-full h-32">
        <motion.div
          key="agent"
          layoutId="agent"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            ...ANIMATION_TRANSITION,
            delay: 0.15,
          }}
          className={cn(
            "bg-background aspect-square h-[50px] rounded-md border border-transparent transition-[border,drop-shadow]",
          )}
        >
          {/* Визуализация аудио агента */}
          <BarVisualizer
            state={state}
            barCount={7}
            track={audioTrack}
            options={{ minHeight: 5 }}
            className={cn("flex h-full items-center justify-center gap-1")}
          >
            <span
              className={cn([
                "bg-muted min-h-2.5 w-2.5 rounded-full",
                "origin-center transition-colors duration-250 ease-linear",
                "data-[lk-highlighted=true]:bg-[var(--Personal-colors-main)] data-[lk-muted=true]:bg-muted",
              ])}
            />
          </BarVisualizer>
        </motion.div>
      </div>

      {/* Chat Transcript */}
      <ChatTranscript messages={messages} visible={chatVisible} />

      {/* Bottom Control Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t">
        {/* Bottom fade */}
        <SessionControls
          isConnected={isConnected}
          microphoneEnabled={microphoneToggle.enabled}
          microphoneDisabled={false}
          microphonePending={microphoneToggle.pending}
          chatVisible={chatVisible}
          micTrackRef={micTrackRef}
          onToggleMicrophone={microphoneToggle.toggle}
          onToggleChat={setChatVisible}
          onCallAction={handleCallAction}
          onSendMessage={handleSendMessage}
          onAudioDeviceChange={handleAudioDeviceChange}
          onDeviceError={handleMicrophoneDeviceSelectError}
        />
      </div>
    </section>
  );
};
