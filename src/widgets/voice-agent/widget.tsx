import { VoiceAgentDialog } from "./ui";

/**
 * Главный виджет Voice Agent
 * Применяет все принципы SOLID, DRY, KISS
 * Композиция из features
 */
export function VoiceAgent() {
  return <VoiceAgentDialog />;
}

// Экспорт для обратной совместимости
export { VoiceAgent as default };
