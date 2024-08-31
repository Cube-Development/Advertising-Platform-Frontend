import { ICustomer } from "@shared/types/translate";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  while (customers.length < 8) {
    customers = [...customers, ...customers];
  }
  return (
    <Swiper
      navigation={{
        prevEl: ".prev",
        nextEl: ".next",
      }}
      loop={true}
      modules={[Navigation, EffectCoverflow]}
      spaceBetween={25}
      slidesPerView={1.3}
      breakpoints={{
        3000: {
          slidesPerView: 7.5,
        },
        2500: {
          slidesPerView: 6.5,
        },
        2000: {
          slidesPerView: 5.5,
        },
        1576: {
          slidesPerView: 4.5,
        },
        1366: {
          slidesPerView: 3.5,
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
      <div className={styles.nav}>
        <p>
          <ChevronLeft className="prev" />
        </p>
        <p>
          <ChevronRight className="next" />
        </p>
      </div>
    </Swiper>
  );
};
