import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { useInViewport } from "@shared/lib/use-in-viewport";
import { cn } from "../lib/utils";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  // Без `layout` намеренно.
  //
  // Этот проп включает FLIP: motion замеряет позиции всех элементов списка до и
  // после вставки нового и покадрово анимирует их трансформы. На главной список
  // лежит поверх SVG-лучей, и каждый такой кадр заставлял перерисовывать их
  // слои — в профиле это давало 9% CPU на простое, а без списка получался 0%.
  // Новый элемент по-прежнему появляется через scale/opacity, остальные просто
  // сразу занимают своё место.
  return (
    <motion.div {...animations} className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    // Список крутится бесконечной цепочкой setTimeout, и каждый шаг запускает
    // layout-анимации motion у всех видимых элементов. За пределами экрана это
    // работа впустую, поэтому цепочка не заводится, пока список не виден.
    const isActive = useInViewport(containerRef);

    useEffect(() => {
      if (!isActive) return;

      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }, [index, delay, isActive]);

    const itemsToShow = useMemo(() => {
      const maxVisible = Math.min(childrenArray.length, 15); // prevent infinite DOM growth
      const result = [];
      for (let i = 0; i < Math.min(index + 1, maxVisible); i++) {
        const itemIndex = (index - i) % childrenArray.length;
        const item = childrenArray[itemIndex] as React.ReactElement;
        result.push(
          React.cloneElement(item, {
            key: `${item.key || itemIndex}-${index - i}`,
          }),
        );
      }
      return result;
    }, [index, childrenArray]);

    return (
      <div
        ref={containerRef}
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
