import { ScrollArea, cn } from "@shared/ui";
import { useEffect, useRef } from "react";
import type { IChatMessage } from "../../model";
import { MessageList } from "./message-list";

interface ChatTranscriptProps {
  messages: IChatMessage[];
  visible?: boolean;
  className?: string;
}

/**
 * Feature: Транскрипт чата с автоскроллом
 * Применяет Interface Segregation - минимальный интерфейс props
 */
export function ChatTranscript({
  messages,
  visible = true,
  className,
}: ChatTranscriptProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // const { state, audioTrack } =useVoiceTranscription();

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (scrollAreaRef.current && visible) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, visible]);

  return (
    <div
      className={cn(
        "transition-opacity duration-300 h-full w-full min-h-0 p-2",
        !visible && "opacity-0 pointer-events-none",
        className,
      )}
    >
      <ScrollArea ref={scrollAreaRef} className="w-full h-full px-4">
        <MessageList messages={messages} className="max-w-2xl mx-auto" />
      </ScrollArea>
    </div>
  );
}
