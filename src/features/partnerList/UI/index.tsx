import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

interface PartnerListProps {
  partners: { img: string }[];
  isLeft?: boolean;
}

SwiperCore.use([Autoplay, EffectCreative]);

export const PartnerList: FC<PartnerListProps> = ({ partners , isLeft}) => {
  return (
    <div className={styles.partners}>
      <Swiper
        modules={[Autoplay, EffectCreative]}
        slidesPerView={isLeft ? 5 : 4} 
        loop={true} 
        speed={5000} 
        autoplay={{ delay: 0, disableOnInteraction: false }}
        className={isLeft ? styles.isLeft: ''}
        >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <img src={`images/partners/${partner.img}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
};
