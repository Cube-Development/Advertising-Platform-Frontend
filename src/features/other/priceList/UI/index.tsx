import { TarifParameters } from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { ITarifInfo } from "@shared/types";
import { FC, useEffect, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BuyTarif } from "../buyTarif";
import { PriceCard } from "../card";
import styles from "./styles.module.scss";

// Инициализация эффектов Swiper
SwiperCore.use([EffectCoverflow]);

interface PriceListProps {
  tarifs: ITarifInfo[];
}

export const PriceList: FC<PriceListProps> = ({ tarifs }) => {
  const [currentTarif, setTarif] = useState<number | null>(null);
  const [screen, setScreen] = useState<number>(window.innerWidth);
  // const [isOpenBuySidebar, setOpenBuySidebar] = useState<boolean>(false);

  // const handleChangeTarif = (tarifType: number) => {
  //   setTarif(tarifType);
  // };
  // const handleToggleBuySidebar = (tarif: number | null, toggle: boolean) => {
  //   setTarif(tarif);
  //   setOpenBuySidebar(toggle);
  // };

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
      {/* {
        currentTarif &&
        <BuySidebar
        isOpen={isOpenBuySidebar}
        onChange={handleToggleBuySidebar}
        tarif={currentTarif}
        />
      } */}
      {screen >= BREAKPOINT.LG ? (
        <div className={styles.tarifs}>
          {tarifs.map((tarifInfo, index) => {
            const tarifIndex = TarifParameters.find(
              (item) => item.type === tarifInfo.type,
            )?.index!;

            return (
              <div key={index} className={styles.slide}>
                <PriceCard
                  tarifInfo={tarifInfo}
                  BuyBtn={<BuyTarif tarif={tarifIndex} />}
                  isActive={tarifIndex === currentTarif}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="swipper__carousel">
          <Swiper
            effect="coverflow"
            modules={[EffectCoverflow]}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.5}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: -220,
              },
              576: {
                slidesPerView: 1,
                spaceBetween: -200,
              },
              450: {
                slidesPerView: 1,
                spaceBetween: -100,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            coverflowEffect={{
              rotate: 0, // Угол поворота слайдов
              stretch: 0, // Растяжение между слайдами
              depth: 700, // Глубина отдаления слайдов
              modifier: 0.75, // Модификатор эффекта
              slideShadows: false,
            }}
            className="swipper__wrapper"
          >
            {duplicateTarifs.map((tarifInfo, index) => {
              const tarifIndex = TarifParameters.find(
                (item) => item.type === tarifInfo.type,
              )?.index!;

              return (
                <SwiperSlide key={index} className="slide__price">
                  <PriceCard
                    tarifInfo={tarifInfo}
                    BuyBtn={<BuyTarif tarif={tarifIndex} />}
                    isActive={tarifIndex === currentTarif}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};
