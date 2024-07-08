import { FC } from "react";
import styles from "./styles.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@shared/ui/shadcn-ui/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// import "swiper/css";
// import "swiper/css/autoplay";
// import SwiperCore from "swiper";
// import { Autoplay, EffectCreative } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

interface PartnerListProps {
  partners: { img: string }[];
  isLeft?: boolean;
}
// SwiperCore.use([Autoplay, EffectCreative]);

export const PartnerList: FC<PartnerListProps> = ({ partners, isLeft }) => {
  return (
    <div
      className={`${styles.partners} ${isLeft ? styles.isLeft : styles.isRight}`}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 700,
        }}
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
      >
        <CarouselContent>
          {partners.map((partner, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div className={styles.image}>
                <img src={`/images/partners/${partner.img}`} alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <Swiper
        modules={[Autoplay, EffectCreative]}
        slidesPerView={5}
        loop={true}
        speed={500}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        className={isLeft ? styles.isLeft : ""}
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <img src={`/images/partners/${partner.img}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};
