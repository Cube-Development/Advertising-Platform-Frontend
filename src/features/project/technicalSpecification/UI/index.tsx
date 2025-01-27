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
import { useWindowWidth } from "@shared/hooks";
import { contentTypeToExtension } from "@shared/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  DialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  formatFileSizeAndType,
  ScrollArea,
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

export const TechnicalSpecification: FC<TechnicalSpecificationProps> = ({
  isFull,
  card,
  SendToBotBtn,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const screen = useWindowWidth();
  const [allFiles, setAllFiles] = useState<IDownloadFileType[]>(
    card.files || [],
  );

  useEffect(() => {
    const fetchFileMetadata = async () => {
      const updatedFiles = await Promise.all(
        allFiles.map(async (file, index) => {
          let filename = file.name;
          console.log("contentType", file);
          const response = await fetch(file.content, {
            method: "GET",
            headers: {
              Range: "bytes=0-0", // Запрашиваем только первые байты для метаданных
            },
          });

          console.log("response", response);
          const contentType = response.headers.get("Content-Type");
          const size = response.headers.get("Content-Range")?.split("/")[1];
          const extension =
            contentTypeToExtension[contentType ? contentType : ""] || "";
          if (extension && !filename.endsWith(extension)) {
            filename += extension;
          }

          // const size = response.headers.get("Content-Length");
          // console.log("size", size, range);
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
  console.log(allFiles);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "default",
      title: t("copy.technical_specification.link"),
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
                  <AlertDialogTitle className={styles.title}>
                    {t("orders_manager.card.technical_specificationIcon")}
                  </AlertDialogTitle>
                  <div className={styles.close}>
                    <AlertDialogCancel>
                      <CancelIcon2 />
                    </AlertDialogCancel>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.comment__wrapper}>
                    <p>{t("orders_manager.subcard.comment")}</p>
                    <ScrollArea className={styles.comment}>
                      <span>{card?.comment}</span>
                    </ScrollArea>
                  </div>
                  <div className={styles.links__wrapper}>
                    <p>{t("orders_manager.subcard.link")}</p>
                    <ScrollArea className={styles.links}>
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
                    </ScrollArea>
                  </div>
                  <div className={styles.files__wrapper}>
                    <p>{t("orders_manager.subcard.file")}</p>
                    <ScrollArea className={styles.files}>
                      <ul>
                        {allFiles.map((file, index) => (
                          <li key={index}>
                            <div className={styles.left}>
                              <FileIcon />
                              <div className={styles.text}>
                                <p className="truncate">{file.fileName}</p>
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
                    </ScrollArea>
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
              <div className={styles.content__wrapper}>
                <div className={styles.top}>
                  <DialogTitle className={styles.title}>
                    {t("orders_manager.card.technical_specificationIcon")}
                  </DialogTitle>
                  <div className={styles.close}>
                    <DrawerClose>
                      <CancelIcon2 />
                    </DrawerClose>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.comment__wrapper}>
                    <p>{t("orders_manager.subcard.comment")}</p>
                    <ScrollArea className={styles.comment}>
                      <span>{card?.comment}</span>
                    </ScrollArea>
                  </div>
                  <div className={styles.links__wrapper}>
                    <p>{t("orders_manager.subcard.link")}</p>
                    <ScrollArea className={styles.links}>
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
                    </ScrollArea>
                  </div>
                  <div className={styles.files__wrapper}>
                    <p>{t("orders_manager.subcard.file")}</p>
                    <ScrollArea className={styles.files}>
                      <ul>
                        {allFiles.map((file, index) => (
                          <li key={index}>
                            <div className={styles.left}>
                              <FileIcon />
                              <div className={styles.text}>
                                <p className="truncate">{file.fileName}</p>
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
                    </ScrollArea>
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
