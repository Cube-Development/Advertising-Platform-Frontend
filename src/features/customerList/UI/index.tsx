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

interface CustomerListProps {
  customers: ICustomer[];
}

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  return (
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
