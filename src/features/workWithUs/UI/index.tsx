import { FC } from "react";
import { useTranslation } from "react-i18next";
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
  const channels: { img: string }[] = t(`${page}.work_list`, {
    returnObjects: true,
  });
  console.log(channels);
  return (
    <div className={styles.work__wrapper}>
      <h1 className={styles.work__title}>{t(`${page}.work_title`)}</h1>
      <Swiper
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
              <img src={`images/workWithUs/${channel.img}`} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
