import { useEffect, useRef } from "react";
import { ScrollArea, cn } from "@shared/ui";
import { UI_CONSTANTS, useVoiceTranscription } from "../../model";
import { MessageList } from "./components/message-list";
import type { ChatMessage } from "../../model";
import { BarVisualizer } from "@livekit/components-react";

interface ChatTranscriptProps {
  messages: ChatMessage[];
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
        "fixed inset-0 grid grid-cols-1 grid-rows-1 transition-opacity duration-300",
        !visible && "opacity-0 pointer-events-none",
        className,
      )}
    >
      {/* <div className="visualizer-container">
        <BarVisualizer state={state} barCount={7} track={audioTrack} />
      </div> */}
      {/* Top fade gradient */}
      <div
        className="absolute top-0 pointer-events-none inset-x-4 bg-gradient-to-b from-background to-transparent"
        style={{ height: `${UI_CONSTANTS.FADE_GRADIENT_HEIGHT}px` }}
      />

      <ScrollArea
        ref={scrollAreaRef}
        className="px-4 md:px-6"
        style={{
          paddingTop: `${UI_CONSTANTS.SCROLL_AREA_PADDING_TOP}px`,
          paddingBottom: `${UI_CONSTANTS.SCROLL_AREA_PADDING_BOTTOM}px`,
        }}
      >
        <MessageList messages={messages} className="max-w-2xl mx-auto" />
      </ScrollArea>
    </div>
  );
}
