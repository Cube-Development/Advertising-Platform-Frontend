import { FC } from "react";
import styles from "./styles.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@shared/ui/shadcn-ui/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PartnerListProps {
  partners: { img: string }[];
  isLeft?: boolean;
}

export const PartnerList: FC<PartnerListProps> = ({ partners, isLeft }) => {
  return (
    <div
      className={`${styles.partners} ${isLeft ? styles.isLeft : styles.isRight}`}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 700,
        }}
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
      >
        <CarouselContent>
          {partners.map((partner, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div className={styles.image}>
                <img src={`/images/partners/${partner.img}`} alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
