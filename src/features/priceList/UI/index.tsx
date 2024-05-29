import { FC, ReactElement, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/translate";
import { PriceCard } from "@entities/priceCard";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@shared/ui/shadcn-ui/ui/carousel";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import SwiperCore from "swiper";
import { EffectCoverflow } from "swiper/modules";

// Инициализация эффектов Swiper
SwiperCore.use([EffectCoverflow]);

interface PriceListProps {
  tarifs: IPrice[];
  buyBtn: ReactElement;
}

export const PriceList: FC<PriceListProps> = ({ tarifs, buyBtn }) => {
  const [currentTarif, setTarif] = useState<number>(1);
  const [screen, setScreen] = useState<number>(window.innerWidth);

  const handleChangeTarif = (tarifType: number) => {
    console.log(tarifType);
    setTarif(tarifType);
  };
  const duplicateTarifs = tarifs.concat(tarifs);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {screen >= 992 ? (
        <div className={styles.tarifs}>
          {tarifs.map((price, index) => (
            <div key={index} className={styles.slide}>
              <PriceCard
                price={price}
                buyBtn={buyBtn}
                tarifType={index}
                currentTarif={currentTarif}
                onChange={handleChangeTarif}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.carousel}>
          <Swiper
            effect="coverflow"
            modules={[EffectCoverflow]}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              1366: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: -100,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: -150,
              },
              375: {
                slidesPerView: 1,
                spaceBetween: -200,
              },
            }}
            coverflowEffect={{
              rotate: 0, // Угол поворота слайдов
              stretch: 0, // Растяжение между слайдами
              depth: 700, // Глубина отдаления слайдов
              modifier: 0.75, // Модификатор эффекта
              slideShadows: false,
            }}
            className={styles.wrapper}
          >
            {duplicateTarifs.map((price, index) => (
              <SwiperSlide key={index} className={"slide__price"}>
                <PriceCard
                  key={index}
                  price={price}
                  buyBtn={buyBtn}
                  tarifType={index}
                  currentTarif={currentTarif}
                  onChange={handleChangeTarif}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {tarifs.map((price, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className={`${index !== 1 ? styles.side__card : ""}`}
                >
                  <PriceCard
                    key={index}
                    price={price}
                    buyBtn={buyBtn}
                    tarifType={index}
                    currentTarif={currentTarif}
                    onChange={handleChangeTarif}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel> */}
        </div>
      )}
    </>
  );
};
