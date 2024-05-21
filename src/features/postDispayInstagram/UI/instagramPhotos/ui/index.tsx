import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui/shadcn-ui/ui/carousel";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { GenerateDownloadLink } from "@features/generateDownloadLink";
import { Download } from "lucide-react";

interface InstagramPhotosProps {
  photos: File[];
}

export const InstagramPhotos: FC<InstagramPhotosProps> = ({ photos }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="relative"
    >
      <CarouselContent className="-ml-1">
        {photos?.map((photo, index) => (
          <CarouselItem key={index} className="pl-1">
            <div className="w-[100%] overflow-hidden relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                className="w-full h-full"
              />
              <div
                className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
                onClick={() => GenerateDownloadLink(photo, photo?.name)}
              >
                <Download width={20} height={20} stroke="#fff" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className={styles.navigation}>
        {photos.map((item, index) => (
          <span
            key={index}
            className={`${styles.navigation__item} ${current === index + 1 && styles.navigation__active}`}
          ></span>
        ))}
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
