import { ICatalogChannel } from "@entities/project";
import { AddToBasket } from "@features/cart";
import { FormatList } from "@features/catalog";
import { RecommendCard, SkeletonRecommendCard } from "@features/channel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { Accordion } from "@shared/ui";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCore from "swiper";

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

  const { ref, inView } = useInView({
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
        <Accordion type="single" collapsible className={styles.cards}>
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
                slidesPerView: 1.7,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 1.5,
              },
              375: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },
            }}
          >
            {cards.map((card, index) => (
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
                length: INTERSECTION_ELEMENTS.recommendCardsChannel,
              }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonRecommendCard />
                </SwiperSlide>
              ))}
            <SwiperSlide>
              <div ref={ref} style={{ height: "100%" }}>
                <SkeletonRecommendCard />
              </div>
            </SwiperSlide>
            <div className={styles.nav}>
              <p>
                <ChevronLeft className="prev" />
              </p>
              <p>
                <ChevronRight className="next" />
              </p>
            </div>
          </Swiper>
        </Accordion>
      </div>
    </div>
  );
};
