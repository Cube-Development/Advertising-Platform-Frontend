import { ICatalogChannel } from "@entities/project";
import { AddToBasket } from "@features/cart";
import { FormatList } from "@features/catalog";
import { RecommendCard, SkeletonRecommendCard } from "@features/channel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { SadSmileIcon } from "@shared/assets";

interface RecommendationListProps {
  cards: ICatalogChannel[];
  onChangeCard: (cart: ICatalogChannel) => void;
  changePage: () => void;
  isLoading: boolean;
}

export const RecommendationList: FC<RecommendationListProps> = ({
  cards,
  onChangeCard,
  changePage,
  isLoading,
}) => {
  const { t } = useTranslation();

  const { inView } = useInView({
    threshold: 0,
    rootMargin: "0px 500px",
  });

  useEffect(() => {
    if (inView) {
      changePage();
    }
  }, [inView]);

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.title} container`}>
        {t("channel.recommend.title")}
      </p>
      <div className={styles.carousel}>
        {cards?.length > 0 ? (
          <div className={styles.cards}>
            <Swiper
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              modules={[Navigation, EffectCoverflow]}
              spaceBetween={10}
              // slidesPerView={3}
              className={`${styles.wrapper} channel`}
              breakpoints={{
                3000: {
                  slidesPerView: 7.5,
                },
                2500: {
                  slidesPerView: 6.5,
                },
                2000: {
                  slidesPerView: 5.5,
                },
                1576: {
                  slidesPerView: 4.5,
                },
                1366: {
                  slidesPerView: 3.5,
                },
                992: {
                  slidesPerView: 2.4,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 15,
                },
                576: {
                  slidesPerView: 1.1,
                },
                375: {
                  slidesPerView: 1.1,
                  spaceBetween: 10,
                },
              }}
            >
              {cards?.map((card, index) => (
                <SwiperSlide key={index}>
                  <RecommendCard
                    card={card}
                    key={card.id}
                    AddToBasketBtn={AddToBasket}
                    FormatList={FormatList}
                    onChangeCard={onChangeCard}
                  />
                </SwiperSlide>
              ))}
              {isLoading &&
                Array.from({
                  length: INTERSECTION_ELEMENTS.REC_CARDS_CHANNEL,
                }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <SkeletonRecommendCard />
                  </SwiperSlide>
                ))}
              {/* <SwiperSlide>
              <div ref={ref} style={{ height: "100%" }}>
                <SkeletonRecommendCard />
              </div>
            </SwiperSlide> */}
              <div className={styles.nav}>
                <p>
                  <ChevronLeft className="prev" />
                </p>
                <p>
                  <ChevronRight className="next" />
                </p>
              </div>
            </Swiper>
          </div>
        ) : (
          <div className="my-10 grid grid-rows-[1fr_auto] gap-4 justify-center justify-items-center items-center">
            <div className="md:[&>svg]:size-[120px] mobile-xl:[&>svg]:size-[80px] [&>svg]:size-[60px]">
              <SadSmileIcon />
            </div>
            <p className="text-center md:text-base mobile:text-sm text-xs text-gray-500 font-medium">
              {t("channel.recommend.empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
