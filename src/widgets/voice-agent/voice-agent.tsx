import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@shared/ui";
import { Mic, X } from "lucide-react";
import { useLivekitConnection, useVoiceAgentState } from "./model";
import { VoiceSession } from "./ui/voice-session";

export function VoiceAgent() {
  const { isWindowOpen, closeWindow, openWindow } = useVoiceAgentState();
  const {
    isConnected,
    token,
    shouldConnect,
    connect,
    reconnect,
    handleConnected,
    handleDisconnected,
  } = useLivekitConnection({ autoConnect: false });

  const handleClose = () => {
    console.log("Closing Voice Agent window");
    closeWindow();
    // НЕ вызываем reset() - сохраняем сессию и историю
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
      <Button
        style={{ background: "var(--Gradients-Gradient-5)" }}
        onClick={openWindow}
        className="fixed z-50 transition-shadow rounded-full shadow-lg bottom-6 right-6 h-14 w-14 hover:shadow-xl "
        aria-label="Open Voice Agent"
      >
        <Mic className="w-6 h-6" />
      </Button>

      {/* Закрепленное окно справа внизу */}
      <Card
        className={`
          fixed bottom-6 right-6 w-[600px] h-[700px]
          transition-all duration-300 ease-in-out
          z-50
          ${
            isWindowOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Заголовок с кнопкой закрытия */}
          <CardHeader className="grid items-center justify-between grid-flow-col p-4 border-b">
            <CardTitle className="text-lg font-semibold">
              Голосовой ассистент
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Close Voice Agent"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          {/* Контент */}
          <CardContent className="flex-1 overflow-hidden">
            {token ? (
              <LiveKitRoom
                serverUrl={import.meta.env.VITE_LIVEKIT_URL}
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
          </CardContent>
        </div>
      </Card>
    </>
  );
}
