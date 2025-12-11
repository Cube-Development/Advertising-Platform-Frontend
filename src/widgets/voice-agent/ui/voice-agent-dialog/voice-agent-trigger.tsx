import { Button } from "@shared/ui";
import { MessageCircle, Mic } from "lucide-react";

interface VoiceAgentTriggerProps {
  onClick: () => void;
}

/**
 * Триггер для открытия Voice Agent
 * Применяет KISS - простая кнопка
 */
export function VoiceAgentTrigger({ onClick }: VoiceAgentTriggerProps) {
  return (
    <Button
      style={{ background: "var(--Gradients-Gradient-5)" }}
      onClick={onClick}
      className="fixed z-50 transition-shadow rounded-full shadow-lg bottom-6 right-6 h-14 w-14 hover:shadow-xl "
      aria-label="Open Voice Agent"
    >
      <Mic className="w-6 h-6" />
    </Button>
  );
}
