import { IFile } from "@shared/types/createPost";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui/shadcn-ui/ui/carousel";
import { FC, useEffect, useState } from "react";

interface InstagramPhotosProps {
  photos: IFile[];
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
    >
      <CarouselContent>
        {photos?.map((photo, index) => (
          <CarouselItem key={index}>
            <div className="w-[100%] rounded-[20px] overflow-hidden">
              <img src="https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1715472000&semt=ais_user" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <p className="text-[#909090] my-2 font-medium text-center text-xs">
        {current} / {photos.length}
      </p>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
