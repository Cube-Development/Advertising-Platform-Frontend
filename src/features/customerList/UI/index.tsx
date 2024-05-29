import { CustomerCard } from "@entities/customerCard";
import { ICustomer } from "@shared/types/translate";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui/shadcn-ui/ui/carousel";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import SwiperCore from "swiper";
import { EffectCoverflow, EffectCreative } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { PriceCard } from "@entities/priceCard";
import { BuyTarif } from "@features/buyTarif";

import "swiper/css";
import "swiper/css/effect-coverflow";

// Инициализация эффектов Swiper
SwiperCore.use([EffectCoverflow]);
// Инициализация эффектов Swiper

interface CustomerListProps {
  customers: ICustomer[];
}

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  return (
    <>
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
        // navigation={{
        //   prevEl: ".swiper-button-prev",
        //   nextEl: ".swiper-button-next",
        // }}
        className={styles.wrapper}
      >
        {customers.map((customer, index) => (
          <SwiperSlide key={index}>
            <CustomerCard customer={customer} />
          </SwiperSlide>
        ))}
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </Swiper>
    </>

    // <Swiper
    //   effect="coverflow"
    //   modules={[EffectCoverflow, Navigation]}
    //   grabCursor={false}
    //   centeredSlides={true}
    //   loop={true}
    //   slidesPerView={3}
    //   spaceBetween={25}
    //   coverflowEffect={{
    //     rotate: 0, // Угол поворота слайдов
    //     stretch: 0, // Растяжение между слайдами
    //     depth: 0, // Глубина отдаления слайдов
    //     modifier: 1, // Модификатор эффекта
    //     slideShadows: false,
    //   }}
    // >
    //   {customers.map((customer, index) => (
    //     <SwiperSlide key={index} className={styles.slide}>
    //       <CustomerCard key={index} customer={customer} />
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    // <Carousel
    //     opts={{
    //       align: "start",
    //       loop: true,
    //     }}
    //     className=" max-w-sm w-full-xs"
    //   >
    //     <CarouselContent>
    //       {customers.map((customer, index) => (
    //         <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
    //           <CustomerCard key={index} customer={customer} />
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious />
    //     <CarouselNext />
    //   </Carousel>
  );
};
