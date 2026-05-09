import { ReactNode, useCallback, useRef, useState } from "react";
import type { HeroMode, CardData } from "../model/types";
import { useHeroAnimation } from "../model/useHeroAnimation";
import { useAutoplay } from "../model/useAutoplay";
import { OptionCard } from "./option-card";
import { Switcher } from "./switcher";
import { CustomHeading } from "@shared/ui";

interface ChooseUsProps {
  cards: CardData[];
  title: ReactNode;
  subTitle: ReactNode;
}

export function ChooseUs({ cards, title, subTitle }: ChooseUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<HeroMode>("chaos");

  // Автоплей: chaos → system через 1500ms после входа в viewport
  const { markUserInteracted } = useAutoplay({
    containerRef,
    mode,
    setMode,
  });

  useHeroAnimation(canvasRef, containerRef, cardRefs, mode);

  // Переключение пользователем — отменяет автоплей навсегда
  const handleToggle = useCallback(() => {
    markUserInteracted();
    setMode((prev) => (prev === "chaos" ? "system" : "chaos"));
  }, [markUserInteracted]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  return (
    <section className="container relative w-full gap-4 py-12 lg:gap-10">
      <CustomHeading title={title} subtitle={subTitle} />
      <Switcher mode={mode} onToggle={handleToggle} />
      <div className="h-[300px] md:h-[550px] relative" ref={containerRef}>
        {/* Canvas для орбитальных эффектов */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ touchAction: "none" }}
        />

        {/* Карточки — HTML поверх canvas */}
        {cards.map((data, i) => (
          <div
            key={i}
            ref={setCardRef(i)}
            className="absolute top-0 left-0 will-change-transform"
            style={{ opacity: 0 }}
          >
            <OptionCard data={data} mode={mode} />
          </div>
        ))}
      </div>
    </section>
  );
}
