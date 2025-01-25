import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { IFile } from "@entities/project";
import { GenerateDownloadLink } from "@shared/utils";

interface TelegramFileProps {
  file: File | IFile;
  fontSize: number;
}

export const TelegramFile: FC<TelegramFileProps> = ({ file, fontSize }) => {
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
      <p className={styles.file__title} style={{ fontSize: `${fontSize}px` }}>
        {t("create_order.create.add_files.file.post_title")}
      </p>
      <div className={styles.content}>
        <div>
          <Paperclip />
        </div>
        <p
          className={`${styles.content__name} truncate`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {file instanceof File ? file?.name : `File_1`}
        </p>
      </div>
    </div>
  );
};
