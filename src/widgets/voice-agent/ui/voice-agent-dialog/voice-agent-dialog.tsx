import { useState } from "react";
import {
  BarVisualizer,
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { Dialog, DialogContent } from "@shared/ui";
import { useLivekitConnection } from "../../model/hooks";
import { VoiceSession } from "../voice-session";
import { VoiceAgentTrigger } from "./voice-agent-trigger";
import { useVoiceTranscription, VOICE_AGENT_CONFIG } from "../../model";

/**
 * Feature: Диалог Voice Agent
 * Применяет DRY - переиспользует хуки и компоненты
 */
export function VoiceAgentDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isConnected,
    isLoading,
    token,
    shouldConnect,
    connect,
    reconnect,
    reset,
    handleConnected,
    handleDisconnected,
  } = useLivekitConnection({ autoConnect: false });

  // const { state, audioTrack } = useVoiceTranscription();

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const handleReconnect = () => {
    if (!token) {
      connect();
    } else {
      reconnect();
    }
  };

  return (
    <>
      <VoiceAgentTrigger onClick={() => setIsOpen(true)} />

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl h-[80vh]">
          {token ? (
            <LiveKitRoom
              serverUrl={VOICE_AGENT_CONFIG.livekitUrl}
              token={token}
              connect={shouldConnect}
              video={false}
              audio={true}
              onDisconnected={handleDisconnected}
              onConnected={handleConnected}
              className="h-full"
            >
              <RoomAudioRenderer />
              <VoiceSession
                isConnected={isConnected}
                onReconnect={handleReconnect}
              />
            </LiveKitRoom>
          ) : (
            <VoiceSession isConnected={false} onReconnect={handleReconnect} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
