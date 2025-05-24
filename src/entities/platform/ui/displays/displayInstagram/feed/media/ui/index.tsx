import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Download } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui";
import { ContentType, IFile, getContentType } from "@entities/project";
import { GenerateDownloadLink } from "@shared/utils";

interface InstagramMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
  feedHeight: number;
  iconSize: number;
}

export const InstagramMedia: FC<InstagramMediaProps> = ({
  medias,
  mediasRes,
  feedHeight,
  iconSize,
}) => {
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
        {medias &&
          medias?.map((media, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="w-[100%] overflow-hidden relative">
                {getContentType(media) === ContentType.photo ? (
                  <img
                    src={URL.createObjectURL(media)}
                    alt={`Photo ${index + 1}`}
                    className="object-cover h-[300px] w-full"
                    style={{ height: `${feedHeight}px` }}
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    className="object-cover h-[300px] w-full"
                    style={{ height: `${feedHeight}px` }}
                  >
                    <source src={URL.createObjectURL(media)} type="video/mp4" />
                    <source src={URL.createObjectURL(media)} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div
                  onClick={() => GenerateDownloadLink(media, media?.name)}
                  className="absolute bottom-3 right-3 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
                >
                  <Download width={iconSize} height={iconSize} stroke="#fff" />
                </div>
              </div>
            </CarouselItem>
          ))}
        {mediasRes &&
          mediasRes?.map((media, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="w-[100%] overflow-hidden relative">
                {media.content_type === ContentType.photo ? (
                  <img
                    src={media.content}
                    alt={`Photo ${index + 1}`}
                    className="object-cover h-[300px] w-full"
                    style={{ height: `${feedHeight}px` }}
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    className="object-cover h-[300px] w-full"
                    style={{ height: `${feedHeight}px` }}
                  >
                    <source src={media.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div
                  onClick={() =>
                    GenerateDownloadLink(
                      media?.content,
                      media?.name || `File_${index + 1}`,
                    )
                  }
                  className="absolute bottom-3 right-3 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
                >
                  <Download width={iconSize} height={iconSize} stroke="#fff" />
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className={styles.navigation}>
        {medias &&
          medias.map((item, index) => (
            <span
              key={index}
              className={`${styles.navigation__item} ${current === index + 1 && styles.navigation__active}`}
            ></span>
          ))}
        {mediasRes &&
          mediasRes.map((item, index) => (
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
