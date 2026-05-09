import { useWindowWidth } from "@shared/hooks";
import { AnimatedBeam, cn, CustomHeading } from "@shared/ui";
import React, { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { PLATFORM_CARDS } from "../model/mock-data";
import { ChannelList } from "./ChannelList";
import { PlatformCard } from "./PlatformCard";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full bg-white relative",
        // Base planet shadow + glow
        "shadow-[0_0_16px_rgba(0,0,0,0.06)] border-[1.5px] border-[#0badc2]/20",
        className,
      )}
    >
      {/* Outer glow to match canvas hubGlow */}
      <div
        className="absolute inset-0 rounded-full scale-[2.5] -z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(11,173,194,0.05) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function WorkWithUs({ className }: { className?: string }) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const isVertical = width <= 1024;

  // Refs for platforms
  const tgRef = useRef<HTMLDivElement>(null);
  const igRef = useRef<HTMLDivElement>(null);
  const ytRef = useRef<HTMLDivElement>(null);

  // Ref for center
  const centerRef = useRef<HTMLDivElement>(null);

  // Ref for right list
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className={cn(
        " container relative w-full py-12 grid gap-4 lg:gap-10",
        className,
      )}
      ref={containerRef}
    >
      <CustomHeading
        title={t("main_advertiser.work_with_us.title")}
        subtitle={t("main_advertiser.work_with_us.subtitle")}
      />

      <div className="flex flex-col items-center justify-between w-full gap-12 lg:flex-row lg:gap-10">
        {/* Top Section: Platform Cards (Grid Layout) */}
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6 lg:w-auto">
          {/* Instagram (Middle card) - Row 1 on mobile */}
          <div className="relative z-10 flex justify-center order-1 col-span-2 lg:col-span-1 lg:order-2 lg:block">
            <PlatformCard
              ref={igRef}
              data={PLATFORM_CARDS[1]}
              className="w-[170px] md:w-[190px] lg:w-[270px]"
            />
          </div>
          {/* Telegram (First card) - Row 2 Left on mobile */}
          <div className="relative z-10 order-2 col-span-1 lg:order-1 justify-self-center">
            <PlatformCard
              ref={tgRef}
              data={PLATFORM_CARDS[0]}
              className="w-none lg:w-[240px]"
            />
          </div>
          {/* YouTube (Third card) - Row 2 Right on mobile */}
          <div className="relative z-10 order-3 col-span-1 lg:order-3 justify-self-center">
            <PlatformCard
              ref={ytRef}
              data={PLATFORM_CARDS[2]}
              className="w-none lg:w-[240px]"
            />
          </div>
        </div>

        {/* Center: Blogix Core */}
        <div className="flex flex-col justify-center">
          <Circle
            ref={centerRef}
            className="flex-col justify-center w-32 h-32 gap-1"
          >
            <span className="text-2xl font-bold text-[#0badc2] leading-none">
              {t("main_advertiser.work_with_us.center.title")}
            </span>
          </Circle>
        </div>

        {/* Right Column: Animated List wrapped in Card */}
        <div className="flex flex-col justify-center w-full lg:max-w-[400px]">
          <ChannelList ref={listRef} />
        </div>
      </div>

      {/* Animated Beams */}

      {/* TG -> Center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tgRef}
        toRef={centerRef}
        curvature={isVertical ? -200 : 30}
        endYOffset={isVertical ? 0 : -20}
        duration={5}
        gradientStartColor={PLATFORM_CARDS[0].brandColor}
        gradientStopColor={PLATFORM_CARDS[0].brandColor}
        pathColor="rgba(11, 173, 194, 0.5)"
      />

      {/* IG -> Center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={igRef}
        toRef={centerRef}
        duration={5}
        gradientStartColor={PLATFORM_CARDS[1].brandColor}
        gradientStopColor={PLATFORM_CARDS[1].brandColor}
        pathColor="rgba(11,173,194,0.5)"
      />

      {/* YT -> Center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ytRef}
        toRef={centerRef}
        curvature={isVertical ? -200 : -30}
        endYOffset={isVertical ? 0 : 20}
        reverse={isVertical ? true : false}
        duration={5}
        gradientStartColor={PLATFORM_CARDS[2].brandColor}
        gradientStopColor={PLATFORM_CARDS[2].brandColor}
        pathColor="rgba(11,173,194,0.5)"
      />

      {/* Center -> List */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={listRef}
        curvature={0}
        pathWidth={3}
        duration={5}
        gradientStartColor="#0badc2"
        gradientStopColor="#0badc2"
        pathColor="rgba(11,173,194,0.5)"
      />
    </section>
  );
}
