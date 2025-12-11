// Типы для VoiceAgent
export interface VoiceAgentConfig {
  pageTitle: string;
  pageDescription: string;
  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;
  startButtonText: string;
  livekitUrl?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  type: "agent" | "user";
  timestamp: number;
  firstReceivedTime?: number;
}

export interface VoiceSessionState {
  isConnected: boolean;
  isLoading: boolean;
  token: string | null;
  shouldConnect: boolean;
}

export interface MediaControlsState {
  microphoneEnabled: boolean;
  microphonePending: boolean;
}
