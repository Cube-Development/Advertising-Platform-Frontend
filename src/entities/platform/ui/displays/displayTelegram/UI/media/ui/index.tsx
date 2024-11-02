import { FC } from "react";
import styles from "./styles.module.scss";
import { Download } from "lucide-react";
import { ContentType, IFile, getContentType } from "@entities/project";
import { GenerateDownloadLink } from "@shared/functions";

interface TelegramMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
  iconSize: number;
}

export const TelegramMedia: FC<TelegramMediaProps> = ({
  medias,
  mediasRes,
  iconSize,
}) => {
  return (
    <div className={styles.media}>
      {medias &&
        medias?.map((media, index) => (
          <div
            className={`${medias.length === 2 && index === 0 ? "col-span-2" : medias.length === 5 && index === 3 ? "col-span-2" : medias.length === 8 && index === 6 ? "col-span-2" : ""}`}
            key={index}
          >
            {getContentType(media) === ContentType.photo ? (
              <img
                src={URL.createObjectURL(media)}
                alt={`Photo ${index + 1}`}
              />
            ) : (
              <video controls>
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
        ))}
      {mediasRes &&
        mediasRes?.map((media, index) => (
          <div
            className={`${mediasRes.length === 2 && index === 0 ? "col-span-2" : mediasRes.length === 5 && index === 3 ? "col-span-2" : mediasRes.length === 8 && index === 6 ? "col-span-2" : ""}`}
            key={index}
          >
            {media.content_type === ContentType.photo ? (
              <img src={media.content} alt={`Photo ${index + 1}`} />
            ) : (
              <video controls>
                <source src={media.content} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div
              onClick={() =>
                GenerateDownloadLink(media?.content, `File_${index + 1}`)
              }
              className="absolute bottom-3 right-3 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
            >
              <Download width={iconSize} height={iconSize} stroke="#fff" />
            </div>
          </div>
        ))}
    </div>
  );
};
