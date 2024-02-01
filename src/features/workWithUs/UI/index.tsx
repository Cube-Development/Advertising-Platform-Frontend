import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface WorkWithUsProps {
    page: string;
}

export const WorkWithUs: FC<WorkWithUsProps> = ({page}) => {
    const { t } = useTranslation();
    const channels: {img: string}[] = t(`${page}.work_list`, { returnObjects: true })
    console.log(channels)
    return (
        <div className={styles.work__wrapper}>
            <h1 className={styles.work__title}>
                {t(`${page}.work_title`)}
            </h1>

            <Swiper
                spaceBetween={60}
                slidesPerView={6} 
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