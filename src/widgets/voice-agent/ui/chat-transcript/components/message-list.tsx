import { MessageItem } from "./message-item";
import type { ChatMessage } from "../../../model";

interface MessageListProps {
  messages: ChatMessage[];
  className?: string;
}

/**
 * Компонент для отображения списка сообщений
 * Применяет KISS - простая итерация по массиву
 */
export function MessageList({ messages, className }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-8">
        No messages yet. Start talking with the agent.
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
}
