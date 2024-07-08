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
import { GenerateDownloadLink } from "src/features old/generateDownloadLink";
import { Download } from "lucide-react";
import { IFile } from "@shared/types/createPost";
import { getContentType } from "src/features old/getContentType";
import { ContentType } from "@shared/config/createPostData";

interface InstagramMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
}

export const InstagramMedia: FC<InstagramMediaProps> = ({
  medias,
  mediasRes,
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
                    className="object-cover h-[20vw] max-h-[300px] w-full"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    className="object-cover h-[20vw] max-h-[300px] w-full"
                  >
                    <source src={URL.createObjectURL(media)} type="video/mp4" />
                    <source src={URL.createObjectURL(media)} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div
                  onClick={() => GenerateDownloadLink(media, media?.name)}
                  className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
                >
                  <Download width={20} height={20} stroke="#fff" />
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
                    className="object-cover h-[18vw] max-h-[360px] w-full"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    className="object-cover h-[18vw] max-h-[360px] w-full"
                  >
                    <source src={media.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div
                  onClick={() =>
                    GenerateDownloadLink(media?.content, `File_${index + 1}`)
                  }
                  className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
                >
                  <Download width={20} height={20} stroke="#fff" />
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
