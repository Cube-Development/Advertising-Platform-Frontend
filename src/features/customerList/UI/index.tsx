import { CustomerCard } from "@entities/customerCard";
import { ICustomer } from "@shared/types/translate";
import { FC } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui/shadcn-ui/ui/carousel";

interface CustomerListProps {
  customers: ICustomer[];
}
SwiperCore.use([Navigation]);

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  return (
    // <Swiper
    //   modules={[Navigation]}
    //   spaceBetween={50}
    //   slidesPerView={3}
    //   navigation={{
    //     nextEl: ".swiper-button-next",
    //   }}
    //   loop={true}
    // >
    //   {customers.map((customer, index) => (
    //     <SwiperSlide key={index}>
    //       <CustomerCard key={index} customer={customer} />
    //     </SwiperSlide>
    //   ))}
    //   <div className="swiper-button-next"></div>
    // </Swiper>

    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {customers.map((customer, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <CustomerCard key={index} customer={customer} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
