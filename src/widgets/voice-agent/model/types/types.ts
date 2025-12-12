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
