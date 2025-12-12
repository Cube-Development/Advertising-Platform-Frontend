import { Button, MyButton } from "@shared/ui";
import { Phone, PhoneOff } from "lucide-react";

interface CallButtonProps {
  isConnected: boolean;
  onAction: () => void;
}

/**
 * Компонент кнопки звонка (Start/End Call)
 * Применяет Open/Closed - расширяется через props
 */
export function CallButton({ isConnected, onAction }: CallButtonProps) {
  return (
    <MyButton
      onClick={onAction}
      className="gap-2 bg-primary"
      buttons_type={isConnected ? "button__orange" : "button__blue"}
    >
      {isConnected ? (
        <>
          <PhoneOff className="w-4 h-4" />
          <span className="hidden md:inline">End Call</span>
          <span className="inline md:hidden">End</span>
        </>
      ) : (
        <>
          <Phone className="w-4 h-4" />
          <span className="hidden md:inline">Start Call</span>
          <span className="inline md:hidden">Start</span>
        </>
      )}
    </MyButton>
  );
}
