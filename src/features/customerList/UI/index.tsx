import { FC } from "react";
import styles from "./styles.module.scss";
import { ICustomer } from "@shared/types/translate";
import { CustomerCard } from "@entities/customerCard";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface CustomerListProps {
    customers: ICustomer[];
}

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  return (
      <Swiper
        spaceBetween={100}
        slidesPerView={3} 
        loop={true} 
        >
        {customers.map((customer, index) => (
              <SwiperSlide key={index}>
                <CustomerCard key={index} customer={customer} />
              </SwiperSlide>
            ))}
      </Swiper>


    // <div className={styles.customers}>
    //   {customers.map((customer, index) => (
    //     <CustomerCard key={index} customer={customer} />
    //   ))}
    // </div>
  );
};
