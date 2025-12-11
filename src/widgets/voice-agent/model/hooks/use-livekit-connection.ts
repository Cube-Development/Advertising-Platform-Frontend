import { useState, useCallback, useEffect } from "react";
import { getLivekitToken } from "../api";
import type { VoiceSessionState } from "..";

interface UseLivekitConnectionProps {
  autoConnect?: boolean;
}

interface UseLivekitConnectionReturn extends VoiceSessionState {
  connect: () => Promise<void>;
  disconnect: () => void;
  reconnect: () => void;
  reset: () => void;
  handleConnected: () => void;
  handleDisconnected: () => void;
}

/**
 * Хук для управления подключением к LiveKit
 * Применяет Single Responsibility - только логика подключения
 */
export function useLivekitConnection({
  autoConnect = false,
}: UseLivekitConnectionProps = {}): UseLivekitConnectionReturn {
  const [state, setState] = useState<VoiceSessionState>({
    isConnected: false,
    isLoading: false,
    token: null,
    shouldConnect: false,
  });

  const connect = useCallback(async () => {
    if (state.token && !state.isLoading) {
      setState((prev) => ({ ...prev, shouldConnect: true }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const token = await getLivekitToken();
      setState((prev) => ({
        ...prev,
        token,
        shouldConnect: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to connect:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [state.token, state.isLoading]);

  const disconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConnected: false,
      shouldConnect: false,
    }));
  }, []);

  const reconnect = useCallback(() => {
    setState((prev) => ({ ...prev, shouldConnect: true }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isConnected: false,
      isLoading: false,
      token: null,
      shouldConnect: false,
    });
  }, []);

  const handleConnected = useCallback(() => {
    setState((prev) => ({ ...prev, isConnected: true }));
  }, []);

  const handleDisconnected = useCallback(() => {
    disconnect();
  }, [disconnect]);

  // Auto-connect при монтировании
  useEffect(() => {
    if (autoConnect && !state.token) {
      connect();
    }
  }, [autoConnect, state.token, connect]);

  return {
    ...state,
    connect,
    disconnect,
    reconnect,
    reset,
    handleConnected,
    handleDisconnected,
  };
}
