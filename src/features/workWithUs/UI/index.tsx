import { FC } from "react";
import { useTranslation } from "react-i18next";

import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";

interface WorkWithUsProps {
  page: string;
}

SwiperCore.use([Autoplay]);
export const WorkWithUs: FC<WorkWithUsProps> = ({ page }) => {
  const { t } = useTranslation();
  const channels: { img: string }[] = t(`${page}.work_list`, {
    returnObjects: true,
  });
  let custom = 4;
  return (
    <div className={styles.wrapper}>
      <motion.h1
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t(`${page}.work_title`)}
      </motion.h1>
      {/* <Carousel
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
      </Carousel> */}
      <motion.div
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        style={{ overflow: "hidden" }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          slidesPerView={7}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            1366: {
              slidesPerView: 6,
              spaceBetween: 60,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            375: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
          }}
        >
          {channels.map((channel, index) => (
            <SwiperSlide key={index}>
              <div className={styles.channel}>
                <img src={`/images/workWithUs/${channel.img}`} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};
