import { FC } from 'react';
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface PartnerListProps {
  partners: { img: string }[];
}

export const PartnerList: FC<PartnerListProps> = ({ partners }) => {
  return (
    <div className={styles.partners}>
      <Swiper
        slidesPerView={4} 
        loop={true} 
        autoplay={{ delay: 2000 }} // Set the delay in milliseconds
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
