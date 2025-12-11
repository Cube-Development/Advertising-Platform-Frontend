import { Toggle } from "@shared/ui";
import { Mic, MicOff } from "lucide-react";

interface MicrophoneToggleProps {
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

/**
 * Компонент переключателя микрофона
 * Применяет Single Responsibility
 */
export function MicrophoneToggle({
  enabled,
  disabled = false,
  onToggle,
}: MicrophoneToggleProps) {
  return (
    <Toggle
      size="icon"
      variant="outline"
      aria-label="Toggle microphone"
      pressed={enabled}
      disabled={disabled}
      onPressedChange={onToggle}
      className="rounded-md"
    >
      {enabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
    </Toggle>
  );
}
