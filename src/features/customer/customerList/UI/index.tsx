import { ICustomer } from "@shared/types/translate";
import { FC } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomerCard } from "../../card";
import styles from "./styles.module.scss";

SwiperCore.use([EffectCoverflow]);

interface CustomerListProps {
  customers: ICustomer[];
}

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  return (
    <Swiper
      loop={true}
      modules={[Navigation, EffectCoverflow]}
      spaceBetween={25}
      slidesPerView={1.3} // Задаем количество видимых слайдов и их частичное отображение
      breakpoints={{
        1366: {
          slidesPerView: 2.5,
        },
        992: {
          slidesPerView: 2.4,
        },
        768: {
          slidesPerView: 1.7,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.5,
        },
        375: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
      }}
      className={styles.wrapper}
    >
      {customers.map((customer, index) => (
        <SwiperSlide key={index}>
          <CustomerCard customer={customer} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
