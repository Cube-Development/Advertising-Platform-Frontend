import {
  IDownloadFileType,
  IManagerNewProjectCard,
  IManagerProjectCard,
} from "@entities/project";
import { FileDownloader } from "@features/other";
import {
  CancelIcon2,
  CopyIcon,
  FileIcon,
  TechnicalSpecificationIcon,
} from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  formatFileSizeAndType,
  useToast,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TechnicalSpecificationProps {
  isFull?: boolean;
  card: IManagerNewProjectCard | IManagerProjectCard;
  SendToBotBtn: FC;
}

const contentTypeToExtension: Record<string, string> = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "text/plain": ".txt",
  "application/zip": ".zip",
};

export const TechnicalSpecification: FC<TechnicalSpecificationProps> = ({
  isFull,
  card,
  SendToBotBtn,
}) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [allFiles, setAllFiles] = useState<IDownloadFileType[]>(
    card.files || [],
  );

  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchFileMetadata = async () => {
      const updatedFiles = await Promise.all(
        allFiles.map(async (file, index) => {
          let filename = "filename_" + (index + 1);
          console.log("contentType", file);
          const response = await fetch(file.content, {
            method: "HEAD",
          });
          console.log("response", response);
          const contentType = response.headers.get("Content-Type");
          const extension =
            contentTypeToExtension[contentType ? contentType : ""] || "";
          if (extension && !filename.endsWith(extension)) {
            filename += extension;
          }

          const size = response.headers.get("Content-Length");
          console.log("size", size);
          const [sizeString, sizeType] = formatFileSizeAndType(
            size ? parseInt(size) : 0,
          );

          return {
            ...file,
            fileSize: sizeString,
            currentSize: "0",
            fileName: filename,
            sizeType: sizeType,
          };
        }),
      );

      setAllFiles(updatedFiles);
    };

    fetchFileMetadata();
  }, []);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "default",
      title: "Скопировано",
    });
  };

  const handleChangeFileSize = (
    currentSize: number | string,
    fileUrl: string,
  ) => {
    const newAllFiles = allFiles.map((file) => {
      if (file.content === fileUrl) {
        return {
          ...file,
          currentSize: currentSize,
        };
      }
      return file;
    });
    setAllFiles(newAllFiles);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {screen >= BREAKPOINT.MD ? (
          <AlertDialog>
            <AlertDialogTrigger className={styles.trigger__wrapper}>
              {isFull ? (
                <div className={styles.button}>
                  <p>{t("orders_manager.card.see_task")}</p>
                </div>
              ) : (
                <TechnicalSpecificationIcon />
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className={styles.content__wrapper}>
                <div className={styles.top}>
                  <p>{t("orders_manager.card.technical_specificationIcon")}</p>
                  <div className={styles.close}>
                    <AlertDialogCancel>
                      <CancelIcon2 />
                    </AlertDialogCancel>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.comment__wrapper}>
                    <p>{t("orders_manager.subcard.comment")}</p>
                    <div className={styles.comment}>
                      <span>{card?.comment}</span>
                    </div>
                  </div>
                  <div className={styles.links__wrapper}>
                    <p>{t("orders_manager.subcard.link")}</p>
                    <div className={styles.links}>
                      <ul>
                        {card?.links?.map((link, index) => (
                          <li key={index}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate"
                            >
                              {link}
                            </a>
                            <button onClick={() => handleCopyLink(link)}>
                              <CopyIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.files__wrapper}>
                    <p>{t("orders_manager.subcard.file")}</p>
                    <div className={styles.files}>
                      <ul>
                        {allFiles.map((file, index) => (
                          <li key={index}>
                            <div className={styles.left}>
                              <FileIcon />
                              <div className={styles.text}>
                                <p>{file.fileName}</p>
                                <span>
                                  {file.currentSize} {file.sizeType} /{" "}
                                  {file.fileSize} {file.sizeType}
                                </span>
                              </div>
                            </div>
                            <FileDownloader
                              file={file}
                              onChange={handleChangeFileSize}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <SendToBotBtn />
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Drawer>
            <DrawerTrigger className={styles.trigger__wrapper}>
              {isFull ? (
                <div className={styles.button}>
                  <p>{t("orders_manager.card.see_task")}</p>
                </div>
              ) : (
                <TechnicalSpecificationIcon />
              )}
            </DrawerTrigger>
            <DrawerContent className="h-full">
              <div style={{ display: "none" }}>
                <DrawerTitle></DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </div>
              <div className={styles.content__wrapper}>
                <div className={styles.top}>
                  <p>{t("orders_manager.card.technical_specificationIcon")}</p>
                  <div className={styles.close}>
                    <DrawerClose>
                      <CancelIcon2 />
                    </DrawerClose>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.comment__wrapper}>
                    <p>{t("orders_manager.subcard.comment")}</p>
                    <div className={styles.comment}>
                      <span>{card?.comment}</span>
                    </div>
                  </div>
                  <div className={styles.links__wrapper}>
                    <p>{t("orders_manager.subcard.link")}</p>
                    <div className={styles.links}>
                      <ul>
                        {card?.links?.map((link, index) => (
                          <li key={index}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate"
                            >
                              {link}
                            </a>
                            <button onClick={() => handleCopyLink(link)}>
                              <CopyIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.files__wrapper}>
                    <p>{t("orders_manager.subcard.file")}</p>
                    <div className={styles.files}>
                      <ul>
                        {allFiles.map((file, index) => (
                          <li key={index}>
                            <div className={styles.left}>
                              <FileIcon />
                              <div className={styles.text}>
                                <p>{file.fileName}</p>
                                <span>
                                  {file.currentSize} {file.sizeType} /{" "}
                                  {file.fileSize} {file.sizeType}
                                </span>
                              </div>
                            </div>
                            <FileDownloader
                              file={file}
                              onChange={handleChangeFileSize}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <SendToBotBtn />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </>
  );
};
