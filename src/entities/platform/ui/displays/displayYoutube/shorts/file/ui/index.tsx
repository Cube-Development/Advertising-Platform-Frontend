import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { IFile } from "@entities/project";
import { GenerateDownloadLink } from "@shared/functions";

interface YoutubeFileProps {
  file: File | IFile;
}

export const YoutubeFile: FC<YoutubeFileProps> = ({ file }) => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.file}
      onClick={() =>
        GenerateDownloadLink(
          file instanceof File ? file : file.content,
          file instanceof File ? file.name : "File_1",
        )
      }
    >
      <p className={styles.file__title}>
        {t("create_order.create.add_files.file.post_title")}
      </p>
      <div className={styles.content}>
        <Paperclip />
        <p className={styles.content__name}>
          {file instanceof File ? file?.name : `File_1`}
        </p>
      </div>
    </div>
  );
};
