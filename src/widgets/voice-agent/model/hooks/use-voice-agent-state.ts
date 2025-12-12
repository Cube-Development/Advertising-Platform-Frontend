import { useState, useCallback, useEffect } from "react";
import type { ChatMessage } from "../types/types";

interface VoiceAgentGlobalState {
  isWindowOpen: boolean;
  messages: ChatMessage[];
}

interface UseVoiceAgentStateReturn extends VoiceAgentGlobalState {
  openWindow: () => void;
  closeWindow: () => void;
  addMessages: (newMessages: ChatMessage[]) => void;
  clearMessages: () => void;
}

/**
 * Глобальное состояние для Voice Agent
 * Сохраняет историю сообщений и состояние окна между открытиями
 */
let globalState: VoiceAgentGlobalState = {
  isWindowOpen: false,
  messages: [],
};

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function useVoiceAgentState(): UseVoiceAgentStateReturn {
  const [, forceUpdate] = useState({});

  // Подписка на изменения глобального состояния
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const openWindow = useCallback(() => {
    globalState = { ...globalState, isWindowOpen: true };
    notifyListeners();
  }, []);

  const closeWindow = useCallback(() => {
    globalState = { ...globalState, isWindowOpen: false };
    notifyListeners();
  }, []);

  const addMessages = useCallback((newMessages: ChatMessage[]) => {
    // Добавляем только уникальные сообщения
    const existingIds = new Set(globalState.messages.map((m) => m.id));
    const uniqueMessages = newMessages.filter((m) => !existingIds.has(m.id));

    if (uniqueMessages.length > 0) {
      globalState = {
        ...globalState,
        messages: [...globalState.messages, ...uniqueMessages],
      };
      notifyListeners();
    }
  }, []);

  const clearMessages = useCallback(() => {
    globalState = { ...globalState, messages: [] };
    notifyListeners();
  }, []);

  return {
    ...globalState,
    openWindow,
    closeWindow,
    addMessages,
    clearMessages,
  };
}
