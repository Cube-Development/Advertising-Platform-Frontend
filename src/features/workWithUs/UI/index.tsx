import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, EffectFade  } from 'swiper/modules';
import styles from './styles.module.scss';

interface WorkWithUsProps {
    page: string;
}
import 'swiper/css';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, EffectFade]);

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
                module={[Autoplay]}
                    spaceBetween={130}
                    slidesPerView={6}
                    speed={800} 
                    delay={0}
                    autoplay={{ delay: 500 }}
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