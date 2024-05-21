import {
  AddFileIcon,
  FileIcon,
  InfoIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { FileProps } from "@shared/types/createPost";
import { formatFileSize } from "@shared/ui/formatFileSize";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";

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

      // Запрос в бек на загрузку файла или файлов
      // может быть mapping на загрузку в бек
      // в uploadFiles записываются стринги пути к файлу на сервере, чтобы при удалении этого файла с Фронта в useForm найти этот обьект в files: [] с content: string = file_server_path и удалить
      // const newFiles: IFile[] = [... e.target.files]
      // const paths = newFiles.map((file) => file.name + new Date().toISOString())  // new Date().toISOString(); -> дает моковую уникальность при загрузке одного и того же файла
      // setUploadFiles([...paths])
    }
  };

  const handleReset = () => {
    setFiles([]);
    // setUploadFiles([])
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
      const newFiles: File[] = [...e.dataTransfer.files];
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
      // Запрос в бек на загрузку файла или файлов
      // может быть mapping на загрузку в бек
      // в uploadFiles записываются стринги пути к файлу на сервере, чтобы при удалении этого файла с Фронта в useForm найти этот обьект в files: [] с content: string = file_server_path и удалить

      // const newFiles: IFile[] = [... e.dataTransfer.files]
      // const paths = newFiles.map((file) => file.name + new Date().toISOString())
      // setUploadFiles([...uploadFiles, ...paths])
    }
  };

  const handleRemoveFile = (file: File) => {
    const newFiles = files.filter((item) => item !== file);
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
            <input
              type="file"
              multiple={true}
              onChange={handleChange}
              accept=".jpg, .jpeg, .png, .mp4, .mov, .avi, .wmv, .webm"
            />
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
                    {/* <p>{file?.name || file?.content}</p> */}
                    <p>{file?.name}</p>
                    <span>{file?.size && formatFileSize(file?.size)}</span>
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
