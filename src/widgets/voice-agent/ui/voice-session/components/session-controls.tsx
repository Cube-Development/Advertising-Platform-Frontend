import { MicrophoneToggle } from "./microphone-toggle";
import { CallButton } from "./call-button";
import { ChatInput } from "./chat-input";
import { cn } from "@shared/ui";

interface SessionControlsProps {
  isConnected: boolean;
  microphoneEnabled: boolean;
  microphoneDisabled?: boolean;
  chatVisible: boolean;
  onToggleMicrophone: () => void;
  onToggleChat: (visible: boolean) => void;
  onCallAction: () => void;
  onSendMessage: (message: string) => void;
  className?: string;
}

/**
 * Панель управления сессией
 * Применяет Dependency Inversion - зависит от абстракций (callbacks)
 */
export function SessionControls({
  isConnected,
  microphoneEnabled,
  microphoneDisabled = false,
  chatVisible,
  onToggleMicrophone,
  onToggleChat,
  onCallAction,
  onSendMessage,
  className,
}: SessionControlsProps) {
  return (
    <div
      className={cn(
        "bg-background border border-border/50 flex flex-col rounded-3xl p-3 shadow-lg",
        className,
      )}
    >
      {/* Controls */}
      <div className="grid grid-rows-2 gap-2">
        <div className="grid gap-2 grid-cols-[max-content_1fr]">
          {/* Microphone */}
          <MicrophoneToggle
            enabled={microphoneEnabled}
            disabled={microphoneDisabled || !isConnected}
            onToggle={onToggleMicrophone}
          />

          <ChatInput
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
