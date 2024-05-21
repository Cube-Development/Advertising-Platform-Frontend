import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { GenerateDownloadLink } from "@features/generateDownloadLink";

interface TelegramFileProps {
  file: File;
}

export const TelegramFile: FC<TelegramFileProps> = ({ file }) => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.file}
      onClick={() => GenerateDownloadLink(file, file.name)}
    >
      <p className={styles.file__title}>
        {t("create_order.create.add_files.file.post_title")}
      </p>
      <div className={styles.content}>
        <Paperclip />
        <p className={styles.content__name}>{file?.name}</p>
      </div>
    </div>
  );
};
