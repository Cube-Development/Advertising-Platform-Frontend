import { ICatalogChannel } from "@entities/project";
import { AddToBasket } from "@features/cart";
import { FormatList } from "@features/catalog";
import { ReccomendCard } from "@features/channel";
import { Accordion } from "@shared/ui";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { useInView } from "react-intersection-observer";

interface ReccomendationListProps {
  cards: ICatalogChannel[];
  onChangeCard: (cart: ICatalogChannel) => void;
  changePage: () => void;
}

export const ReccomendationList: FC<ReccomendationListProps> = ({
  cards,
  onChangeCard,
  changePage,
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
  console.log("cards", cards);
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("channel.recommend.title")}</p>
      <div className={styles.carousel}>
        <Accordion type="single" collapsible className={styles.cards}>
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            spaceBetween={10}
            slidesPerView={3.5}
            className={styles.wrapper}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <ReccomendCard
                  // page={pageFilter.cart}
                  card={card}
                  key={card.id}
                  AddToBasketBtn={AddToBasket}
                  FormatList={FormatList}
                  onChangeCard={onChangeCard}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div ref={ref} className={styles.pagination}></div>
            </SwiperSlide>
          </Swiper>
        </Accordion>
      </div>
    </div>
  );
};
