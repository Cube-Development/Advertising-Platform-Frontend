import { IFile } from "@shared/types/createPost";
import { FC } from "react";
import styles from "./styles.module.scss";

interface TelegramPhotosProps {
  photos: IFile[];
}

export const TelegramPhotos: FC<TelegramPhotosProps> = ({ photos }) => {
  return (
    <div className={styles.media}>
      {photos.map((photo, index) => (
        <img
          key={index}
          src="https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1715472000&semt=ais_user"
          alt={`Photo ${index + 1}`}
        />
      ))}
    </div>
  );
};
