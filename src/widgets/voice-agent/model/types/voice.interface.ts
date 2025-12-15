export interface IVoiceSessionState {
  isConnected: boolean;
  isLoading: boolean;
  token: string | null;
  serverUrl: string | null;
  shouldConnect: boolean;
}
