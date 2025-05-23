import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Download } from "lucide-react";
import { ContentType, IFile, getContentType } from "@entities/project";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shared/ui";
import { GenerateDownloadLink } from "@shared/utils";

interface InstagramMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
  storiesHeight: number;
  iconSize: number;
}

export const InstagramMedia: FC<InstagramMediaProps> = ({
  medias,
  mediasRes,
  storiesHeight,
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

  const [spanWidth, setSpanWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && medias) {
      const containerWidth = containerRef.current.offsetWidth;
      const widthPerSpan = containerWidth / medias.length;
      setTimeout(() => {
        setSpanWidth(widthPerSpan);
      }, 300);
    } else if (containerRef.current && mediasRes) {
      const containerWidth = containerRef.current.offsetWidth;
      const widthPerSpan = containerWidth / mediasRes.length;
      setTimeout(() => {
        setSpanWidth(widthPerSpan);
      }, 300);
    }
  }, [medias, mediasRes]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="relative overflow-hidden rounded-t-[6px]"
    >
      <CarouselContent className="-ml-1 rounded-t-md">
        {medias &&
          medias?.map((media, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="w-[100%] overflow-hidden relative">
                {getContentType(media) === ContentType.photo ? (
                  <img
                    src={URL.createObjectURL(media)}
                    alt={`Photo ${index + 1}`}
                    className="object-cover h-[600px] w-full"
                    style={{ height: `${storiesHeight}px` }}
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    className="object-cover h-[600px] w-full"
                    style={{ height: `${storiesHeight}px` }}
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
                    className="object-cover h-[600px] w-full"
                    style={{ height: `${storiesHeight}px` }}
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    className="object-cover h-[600px] w-full"
                    style={{ height: `${storiesHeight}px` }}
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
      <div ref={containerRef} className={styles.navigation}>
        {medias &&
          medias.map((item, index) => (
            <span
              key={index}
              className={`${styles.navigation__item} ${current === index + 1 && styles.navigation__active}`}
              style={{ width: `${spanWidth}px` }}
            ></span>
          ))}
        {mediasRes &&
          mediasRes.map((item, index) => (
            <span
              key={index}
              className={`${styles.navigation__item} ${current === index + 1 && styles.navigation__active}`}
              style={{ width: `${spanWidth}px` }}
            ></span>
          ))}
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
