import { FC } from "react";
import styles from "./styles.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@shared/ui/shadcn-ui/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PartnerListProps {
  partners: { img: string }[];
  isLeft?: boolean;
}

export const PartnerList: FC<PartnerListProps> = ({ partners, isLeft }) => {
  return (
    <div
      className={`${styles.partners} ${isLeft ? styles.isLeft : styles.isRight}`}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 50,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent>
          {partners.map((partner, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <img src={`/images/partners/${partner.img}`} alt="" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <Swiper
        modules={[Autoplay, EffectCreative]}
        slidesPerView={isLeft ? 5 : 4}
        loop={true}
        speed={5000}
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
