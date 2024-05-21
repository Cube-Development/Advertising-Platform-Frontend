import { FC } from "react";
import styles from "./styles.module.scss";
import { Download } from "lucide-react";
import { GenerateDownloadLink } from "@features/generateDownloadLink";

interface TelegramPhotosProps {
  photos: File[];
}

export const TelegramPhotos: FC<TelegramPhotosProps> = ({ photos }) => {
  return (
    <div className={styles.media}>
      {photos.map((photo, index) => (
        <div className="relative" key={index}>
          <img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} />
          <div
            onClick={() => GenerateDownloadLink(photo, photo?.name)}
            className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
          >
            <Download width={20} height={20} stroke="#fff" />
          </div>
        </div>
      ))}
    </div>
  );
};
