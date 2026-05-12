import { useEffect, useRef } from "react";
import type { HeroMode } from "../model/types";
import { cn } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface SwitcherProps {
  mode: HeroMode;
  onToggle: () => void;
}

/**
 * Animated toggle switch для режима chaos/system.
 * CSS-only анимация: плавный сдвиг thumb + смена цвета + pulse при переключении.
 */
export function Switcher({ mode, onToggle }: SwitcherProps) {
  const isSystem = mode === "system";
  const trackRef = useRef<HTMLDivElement>(null);
  const prevMode = useRef(mode);
  const { t } = useTranslation();

  // Pulse-эффект при смене режима
  useEffect(() => {
    if (prevMode.current !== mode && trackRef.current) {
      trackRef.current.classList.remove("hero-switch-pulse");
      // Force reflow для рестарта анимации
      void trackRef.current.offsetWidth;
      trackRef.current.classList.add("hero-switch-pulse");
    }
    prevMode.current = mode;
  }, [mode]);

  return (
    <div className="flex flex-row items-center gap-3 justify-center">
      {/* Switch track */}
      <button
        onClick={onToggle}
        className="relative p-2 border-none outline-none cursor-pointer group"
      >
        <div
          ref={trackRef}
          className={cn(
            "relative w-[56px] h-[28px] transition-all duration-500 ease-out rounded-full",
            isSystem
              ? "bg-gradient-to-tr from-[var(--Personal-colors-main)] to-[var(--Personal-colors-main2)] shadow-[0_2px_12px_color-mix(in_srgb,var(--Personal-colors-main)_40%,transparent),inset_0_1px_2px_rgba(255,255,255,0.15)]"
              : "bg-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.1),inset_0_1px_3px_rgba(0,0,0,0.06)]",
          )}
        >
          {/* Thumb */}
          <div
            className={cn(
              "absolute top-[2px] w-6 h-6 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out",
              isSystem ? "left-[30px]" : "left-[2px]",
            )}
          />
        </div>
      </button>
      {/* Label */}
      <span
        className={cn(
          "text-xs font-medium tracking-wide transition-all duration-500",
          isSystem ? "text-[var(--Personal-colors-main)]" : "text-gray-400",
        )}
      >
        {isSystem
          ? t("main_advertiser.choose_us.switcher.system")
          : t("main_advertiser.choose_us.switcher.chaos")}
      </span>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes switchPulse {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--Personal-colors-main) 40%, transparent); }
          50% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--Personal-colors-main) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--Personal-colors-main) 0%, transparent); }
        }
        .hero-switch-pulse {
          animation: switchPulse 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
