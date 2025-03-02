import { FileProps, getContentType } from "@entities/project";
import {
  AddFileIcon,
  FileIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { ScrollArea, ToastAction, formatFileSize, useToast } from "@shared/ui";
import { InfoIcon } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AddMediaFiles: FC<FileProps> = ({ onChange, currentFiles }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>(currentFiles ? currentFiles : []);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles: File[] = [...e.target.files];
      if (files.length + newFiles.length <= 10) {
        setFiles([...files, ...newFiles]);
        onChange([...files, ...newFiles]);
      } else {
        toast({
          variant: "error",
          title: t("create_order.create.add_files.mediafile.max_length"),
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
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

  // const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setDragActive(false);

  //   console.log(2222, e.dataTransfer.files);
  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {

  //     const newFiles: File[] = [...e.dataTransfer.files];
  //     if (files.length + newFiles.length <= 10) {
  //       setFiles([...files, ...newFiles]);
  //       onChange([...files, ...newFiles]);
  //     } else {
  //       toast({
  //         variant: "error",
  //         title: t("create_order.create.add_files.mediafile.max_length"),
  //         action: <ToastAction altText="OK">OK</ToastAction>,
  //       });
  //     }
  //   }
  // };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles: File[] = [...e.dataTransfer.files];
      const validFiles = newFiles.filter((file) => {
        try {
          getContentType(file); // Проверяем файл
          return true; // Если ошибок нет - оставляем
        } catch (error) {
          console.warn(`Файл ${file.name} не поддерживается:`, error);
          return false; // Если ошибка - убираем
        }
      });

      // Ограничение на 10 файлов
      if (files.length + validFiles.length <= 10) {
        setFiles([...files, ...validFiles]);
        onChange([...files, ...validFiles]);
      } else {
        toast({
          variant: "error",
          title: t("create_order.create.add_files.mediafile.max_length"),
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    }
  };

  const handleRemoveFile = (file: File) => {
    const newFiles = files?.filter((item) => item !== file);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div
      className={`${styles.wrapper} ${files.length === 0 && styles.wrapper_empty}`}
    >
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
            <InfoIcon color="#BDBDBD" />
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
            <input
              type="file"
              multiple={true}
              onChange={handleChange}
              accept=".jpg, .jpeg, .png, .mp4, .mov, .avi, .wmv, .webm"
            />
          </label>
        </div>
      </div>
      <ScrollArea className={styles.right}>
        {files.length > 0 && (
          <div className={styles.items}>
            {files.map((file, id) => (
              <div key={id} className={styles.item}>
                <div className={styles.item__left}>
                  <FileIcon />
                  <div className={styles.item__text}>
                    {/* <p>{file?.name || file?.content}</p> */}
                    <p className="truncate">{file?.name}</p>
                    <span>{file?.size && formatFileSize(file?.size)}</span>
                  </div>
                </div>
                <div className={styles.item__right}>
                  <YesIcon />
                  <button
                    className={styles.remove}
                    onClick={() => handleRemoveFile(file)}
                  >
                    <TrashBasketIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
