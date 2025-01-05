import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface WorkWithUsProps {
  page: string;
}

SwiperCore.use([Autoplay]);
export const WorkWithUs: FC<WorkWithUsProps> = ({ page }) => {
  const { t } = useTranslation();
  // const channels: { img: string }[] = t(`${page}.work_list`, {
  //   returnObjects: true,
  // });

  const channels = t(`${page}.partners_list`, { returnObjects: true }) as {
    img: string;
  }[];
  let custom = 4;

  return (
    <div className={styles.wrapper}>
      <motion.h1
        custom={custom++}
        variants={PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t(`${page}.work_title`)}
      </motion.h1>
      <motion.div
        custom={custom++}
        variants={PAGE_ANIMATION.animationVision}
        className={styles.channels}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
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
              spaceBetween: 30,
            },
            576: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            375: {
              slidesPerView: 3,
              spaceBetween: 30,
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
