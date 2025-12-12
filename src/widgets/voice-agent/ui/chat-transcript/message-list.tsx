import { ChatMessage } from "@widgets/voice-agent/model";
import { MessageItem } from "./message-item";

interface MessageListProps {
  messages: ChatMessage[];
  className?: string;
}

export function MessageList({ messages, className }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="py-8 text-sm text-center text-muted-foreground">
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
