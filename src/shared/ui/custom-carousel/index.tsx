import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { useRef, useState, type ReactNode } from "react";

export interface CustomCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;

  speed?: number; // “скорость” прокрутки
  gap?: number;

  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;

  onActiveChange?: (index: number | null) => void;

  slidesPerView?: number;
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
}: CustomCarouselProps<T>) {
  const swiperRef = useRef<any>(null);
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

  return (
    <div className={className}>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(s) => (swiperRef.current = s)}
        loop={true}
        slidesPerView={slidesPerView}
        spaceBetween={gap}
        speed={speed}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: pauseOnHover,
        }}
        freeMode={{
          enabled: true,
          momentum: false,
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
