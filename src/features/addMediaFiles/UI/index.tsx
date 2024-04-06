import { FC, useState } from "react";
import styles from "./styles.module.scss";
import {
  AddFileIcon,
  FileIcon,
  InfoIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { useTranslation } from "react-i18next";
import { IFile } from "@shared/types/file";
import { formatFileSize } from "@shared/ui/formatFileSize";

interface AddMediaFilesProps {}

export const AddMediaFiles: FC<AddMediaFilesProps> = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<IFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log("e.target.files", e.target.files);
      setFiles([...e.target.files]);
    }
  };

  const handleReset = () => {
    setFiles([]);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...e.dataTransfer.files]);
    }
  };

  const handleRemoveFile = (file: IFile) => {
    setFiles(files.filter((item) => item !== file));
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.left} ${dragActive ? styles.drag : ""}`}
        onReset={handleReset}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleLive}
        onDrop={handleDrop}
      >
        <div className={styles.top}>
          <div className={styles.logo}>
            <InfoIcon />
          </div>
          <div className={styles.text}>
            <p>
              {t("create_order.create.add_files.mediafile.formats.title")}
              <br />
              <span>
                {t("create_order.create.add_files.mediafile.formats.text")}
              </span>
            </p>
            <p>
              {t("create_order.create.add_files.mediafile.size.title")}{" "}
              <span>
                {t("create_order.create.add_files.mediafile.size.text")}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.logo}>
            <AddFileIcon />
          </div>
          <div className={styles.text}>
            <p>{t("create_order.create.add.text")}</p>
            <span>{t("create_order.create.add.span")}</span>
          </div>
          <label className={styles.button}>
            <span>{t("create_order.create.add.choose")}</span>
            <input type="file" multiple={true} onChange={handleChange} />
          </label>
        </div>
      </div>
      <div
        className={`${styles.right} ${files.length > 8 ? styles.scroll : ""}`}
      >
        {files.length > 0 && (
          <div className={styles.items}>
            {files.map((file, id) => (
              <div key={id} className={styles.item}>
                <div className={styles.item__left}>
                  <FileIcon />
                  <div className={styles.item__text}>
                    <p>{file.name}</p>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <div className={styles.item__right}>
                  <YesIcon />
                  <button onClick={() => handleRemoveFile(file)}>
                    <TrashBasketIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
