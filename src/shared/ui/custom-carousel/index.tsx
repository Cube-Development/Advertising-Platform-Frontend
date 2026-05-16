import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export interface CustomCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;

  speed?: number;
  gap?: number;

  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;

  onActiveChange?: (index: number | null) => void;

  slidesPerView?: number;

  mobileAutoScrollPxPerSec?: number;
}

const DESKTOP_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_QUERY).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function MobileScroller<T>({
  items,
  renderItem,
  getKey,
  gap,
  className,
  itemClassName,
  pxPerSec,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;
  gap: number;
  className: string;
  itemClassName: string;
  pxPerSec: number;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stoppedRef = useRef(false);
  const [stopped, setStopped] = useState(false);

  const shouldLoop = items.length > 1;
  const doubled = useMemo(
    () => (shouldLoop ? [...items, ...items] : items),
    [items, shouldLoop],
  );
  const itemsLen = items.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || itemsLen === 0 || !shouldLoop) return;

    stoppedRef.current = false;
    setStopped(false);

    let raf = 0;
    let lastTime = 0;
    let halfWidth = 0;
    let accumulator = 0;

    const updateHalf = () => {
      const child = el.children[itemsLen] as HTMLElement | undefined;
      halfWidth = child?.offsetLeft ?? 0;
    };
    updateHalf();

    const ro = new ResizeObserver(updateHalf);
    ro.observe(el);

    const tick = (now: number) => {
      if (stoppedRef.current) return;
      if (!lastTime) lastTime = now;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (halfWidth > 0) {
        accumulator += pxPerSec * dt;
        const whole = Math.floor(accumulator);
        if (whole > 0) {
          accumulator -= whole;
          let next = el.scrollLeft + whole;
          if (next >= halfWidth) next -= halfWidth;
          el.scrollLeft = next;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const killMomentum = () => {
      const current = el.scrollLeft;
      el.scrollLeft = current;
    };

    const stop = () => {
      if (stoppedRef.current) return;
      stoppedRef.current = true;
      cancelAnimationFrame(raf);
      setStopped(true);
      killMomentum();
    };

    const onTouchStart = () => {
      killMomentum();
      stop();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("pointerdown", stop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("pointerdown", stop);
    };
  }, [pxPerSec, itemsLen, shouldLoop]);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stoppedRef.current) {
      stoppedRef.current = true;
      setStopped(true);
    }
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div
      ref={scrollerRef}
      className={`py-2 -my-2 flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        stopped ? "snap-x snap-mandatory" : ""
      } ${className}`}
      style={{
        gap,
        touchAction: "pan-x",
        overscrollBehaviorX: "contain",
      }}
    >
      {doubled.map((item, i) => {
        const originalIdx = i % itemsLen;
        const half = Math.floor(i / itemsLen);
        return (
          <div
            key={`${getKey(item, originalIdx)}-${half}`}
            onClick={handleItemClick}
            className={`shrink-0 basis-[75%] sm:basis-[58%] ${
              stopped ? "snap-center" : ""
            } ${itemClassName}`}
          >
            {renderItem(item, originalIdx)}
          </div>
        );
      })}
    </div>
  );
}

export function CustomCarousel<T>({
  items,
  renderItem,
  getKey,

  speed = 4000,
  gap = 12,

  pauseOnHover = true,
  className = "",
  itemClassName = "",
  activeItemClassName = "",
  slidesPerView,

  onActiveChange,

  mobileAutoScrollPxPerSec = 60,
}: CustomCarouselProps<T>) {
  const isDesktop = useIsDesktop();
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (active === index) {
      setActive(null);
      onActiveChange?.(null);
      swiper.autoplay.start();
      return;
    }

    setActive(index);
    onActiveChange?.(index);

    swiper.autoplay.stop();
    swiper.slideToLoop(index);
  };

  if (!isDesktop) {
    return (
      <MobileScroller
        items={items}
        renderItem={renderItem}
        getKey={getKey}
        gap={gap}
        className={className}
        itemClassName={itemClassName}
        pxPerSec={mobileAutoScrollPxPerSec}
      />
    );
  }

  const TOUCH_SPEED = 350;

  return (
    <div className={className}>
      <Swiper
        className="!-my-5"
        modules={[Autoplay, Mousewheel, FreeMode]}
        onSwiper={(s) => (swiperRef.current = s)}
        loop={true}
        slidesPerView={slidesPerView ?? 2.3}
        spaceBetween={gap}
        speed={speed}
        touchRatio={1.5}
        longSwipesRatio={0.2}
        resistanceRatio={0.6}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: pauseOnHover,
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumBounce: false,
          momentumRatio: 1.2,
          momentumVelocityRatio: 1.2,
          minimumVelocity: 0.02,
        }}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 1,
        }}
        onTouchStart={(s) => {
          s.params.speed = TOUCH_SPEED;
          s.autoplay?.stop();
        }}
        onTouchEnd={(s) => {
          window.setTimeout(() => {
            s.params.speed = speed;
            if (active === null) s.autoplay?.start();
          }, 1500);
        }}
      >
        {items.map((item, i) => {
          const isActive = i === active;

          return (
            <SwiperSlide
              key={getKey(item, i)}
              className={itemClassName}
              onClick={() => handleClick(i)}
            >
              <div className={isActive ? activeItemClassName : ""}>
                {renderItem(item, i)}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
