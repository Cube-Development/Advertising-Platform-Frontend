import React from "react";
import type { CardData, HeroMode } from "../model/types";
import { Card, CardHeader, CardTitle, cn } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface HeroCardProps extends React.ComponentProps<typeof Card> {
  data: CardData;
  mode: HeroMode;
}

export function OptionCard({
  data,
  mode,
  className,
  style,
  ...props
}: HeroCardProps) {
  const { t } = useTranslation();
  const isSystem = mode === "system";
  const label = isSystem ? data.systemLabel : data.chaosLabel;

  return (
    <Card
      className={cn(
        "relative w-40 max-md:w-24 rounded-xl transition-all duration-700 select-none border-[1.5px] ring-0 p-0",
        // CSS-анимация glow+bounce при подключении (через data-connected атрибут на родителе)
        "hero-card",
        isSystem
          ? "bg-[#dcf8fb]/95 border-[var(--Personal-colors-main)]/30 shadow-[0_4px_18px_color-mix(in_srgb,var(--Personal-colors-main)_15%,transparent)]"
          : "bg-[#fcf2ee]/95 border-[#ff8833]/25 shadow-[0_4px_14px_rgba(255,80,30,0.12)]",
        className,
      )}
      style={style}
      {...props}
    >
      {/* Иконка-стикер: на мобильном — absolute, на десктопе — в потоке */}
      <div
        className={cn(
          "flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-700 text-white",
          // Desktop: inline, Mobile: absolute sticker
          "size-8 max-md:size-6 max-md:absolute max-md:-top-2 max-md:-right-2 max-md:z-10 max-md:shadow-md",
          isSystem
            ? "bg-gradient-to-tr from-[var(--Personal-colors-main)] to-[var(--Personal-colors-main2)]"
            : "bg-gradient-to-br from-[#ff4444] to-[#ff8833]",
          // На десктопе скрыт здесь (рендерится внутри CardHeader)
          "md:hidden",
        )}
      >
        {isSystem ? data.systemIcon : data.chaosIcon}
      </div>

      <CardHeader className="flex flex-row items-center gap-2 p-0 py-2 space-y-0 max-md:pl-1.5 max-md:pr-4 md:px-3">
        {/* Иконка внутри потока — только десктоп */}
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-700 size-8 text-white",
            "hidden md:flex",
            isSystem
              ? "bg-gradient-to-tr from-[var(--Personal-colors-main)] to-[var(--Personal-colors-main2)]"
              : "bg-gradient-to-br from-[#ff4444] to-[#ff8833]",
          )}
        >
          {isSystem ? data.systemIcon : data.chaosIcon}
        </div>

        {/* Текст */}
        <CardTitle
          className={cn(
            "flex-1 !leading-[1.3] font-bold transition-colors duration-700 text-[10.5px] max-md:text-[8px]",
            isSystem ? "text-[var(--Personal-colors-main)]" : "text-[#5a1a0a]",
          )}
        >
          {t(label)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
