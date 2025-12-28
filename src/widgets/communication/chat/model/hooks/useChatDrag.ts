import { useRef, useState } from "react";

export const useChatDrag = () => {
  const [isDraggable, setIsDraggable] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchX = event.touches[0].clientX;

    if (chatRef.current) {
      const chatLeft = chatRef.current.getBoundingClientRect().left;
      const touchOffset = touchX - chatLeft;

      if (touchOffset >= 0 && touchOffset <= 80) {
        setIsDraggable(true);
      } else {
        setIsDraggable(false);
      }
    }
  };

  return { isDraggable, chatRef, handleTouchStart };
};
