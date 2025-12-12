import { Track } from "livekit-client";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { TrackSelector } from "../track-toggle";
import { CallButton } from "./call-button";
import { ChatInput } from "./chat-input";
import { Card, cn } from "@shared/ui";

interface SessionControlsProps {
  isConnected: boolean;
  microphoneEnabled: boolean;
  microphoneDisabled?: boolean;
  microphonePending?: boolean;
  chatVisible: boolean;
  micTrackRef?: TrackReferenceOrPlaceholder;
  onToggleMicrophone: () => void;
  onToggleChat: (visible: boolean) => void;
  onCallAction: () => void;
  onSendMessage: (message: string) => void;
  onAudioDeviceChange?: (deviceId: string) => void;
  onDeviceError?: (error: Error) => void;
  className?: string;
}

/**
 * Панель управления сессией
 * Применяет Dependency Inversion - зависит от абстракций (callbacks)
 * Обновлено с использованием TrackSelector для выбора устройств
 */
export function SessionControls({
  isConnected,
  microphoneEnabled,
  microphoneDisabled = false,
  microphonePending = false,
  chatVisible,
  micTrackRef,
  onToggleMicrophone,
  onToggleChat,
  onCallAction,
  onSendMessage,
  onAudioDeviceChange,
  onDeviceError,
  className,
}: SessionControlsProps) {
  return (
    <div className={cn("flex flex-col p-5", className)}>
      {/* Chat Input с анимацией */}

      {/* Controls */}
      <div className="grid grid-rows-2 gap-2">
        <div className="grid grid-cols-[max-content_1fr] gap-2">
          <TrackSelector
            kind="audioinput"
            source={Track.Source.Microphone}
            pressed={microphoneEnabled}
            pending={microphonePending}
            disabled={microphoneDisabled || !isConnected}
            audioTrackRef={micTrackRef}
            onPressedChange={onToggleMicrophone}
            onMediaDeviceError={onDeviceError}
            onActiveDeviceChange={onAudioDeviceChange}
          />
          <ChatInput
            chatOpen={chatVisible}
            onSend={onSendMessage}
            disabled={!isConnected}
            placeholder={
              isConnected ? "Type a message..." : "Start call to chat"
            }
          />
        </div>

        {/* Call button */}
        <CallButton isConnected={isConnected} onAction={onCallAction} />
      </div>
    </div>
  );
}
