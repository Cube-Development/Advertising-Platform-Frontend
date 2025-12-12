import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { Input, Button } from "@shared/ui";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  chatOpen?: boolean;
}
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type a message...",
  chatOpen = true,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (message.trim() && !disabled && !isSending) {
      try {
        setIsSending(true);
        await onSend(message.trim());
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = disabled || isSending || message.trim().length === 0;

  useEffect(() => {
    if (chatOpen && !disabled) {
      inputRef.current?.focus();
    }
  }, [chatOpen, disabled]);

  if (!chatOpen) {
    return null;
  }

  return (
    <div className="flex gap-2 w-full">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
      <Button
        onClick={handleSend}
        disabled={isDisabled}
        size="icon"
        variant={isDisabled ? "secondary" : "default"}
        title={isSending ? "Sending..." : "Send"}
      >
        {isSending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
