import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@shared/ui/shadcn-ui/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface WorkWithUsProps {
  page: string;
}

export const WorkWithUs: FC<WorkWithUsProps> = ({ page }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const { t } = useTranslation();
  const channels: { img: string }[] = t(`${page}.work_list`, {
    returnObjects: true,
  });
  console.log(channels);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t(`${page}.work_title`)}</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 50,
        }}
        plugins={[
          Autoplay({
            delay: 1000,
            // stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {channels.map((channel, index) => (
            <CarouselItem key={index} className="basis-1/6">
              <div className={styles.channel}>
                <img src={`/images/workWithUs/${channel.img}`} alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <Swiper
        modules={[Autoplay]}
        spaceBetween={130}
        slidesPerView={6}
        speed={5000}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        loop={true}
      >
        {channels.map((channel, index) => (
          <SwiperSlide key={index}>
            <div className={styles.channel}>
              <img src={`/images/workWithUs/${channel.img}`} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};
