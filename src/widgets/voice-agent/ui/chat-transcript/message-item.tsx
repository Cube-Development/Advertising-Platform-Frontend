import { Bot, User } from "lucide-react";
import { cn } from "@shared/ui";
import { ChatMessage } from "@widgets/voice-agent/model";

interface MessageItemProps {
  message: ChatMessage;
}

/**
 * Компонент для отображения одного сообщения
 * Применяет Single Responsibility - только отображение
 */
export function MessageItem({ message }: MessageItemProps) {
  const isAgent = message.type === "agent";

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg",
        isAgent ? "bg-muted/50" : "bg-primary/5",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isAgent
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-1 text-sm font-medium">
          {isAgent ? "Agent" : "You"}
        </div>
        <div className="text-sm break-words text-foreground/90">
          {message.text}
        </div>
      </div>
    </div>
  );
}
