import { AddFiles } from "@features/createOrder/addFiles";
import { AddMediaFiles } from "@features/createOrder/addMediaFiles";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  CustomCloseButton,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChatFileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesSelected: (files: File[]) => void;
}

enum FileType {
  NONE = "none",
  MEDIA = "media",
  FILES = "files",
}

export const ChatFileUpload: FC<ChatFileUploadProps> = ({
  isOpen,
  onClose,
  onFilesSelected,
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<FileType>(FileType.NONE);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleTypeSelect = (type: FileType) => {
    setSelectedType(type);
    setSelectedFiles([]);
  };

  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSend = () => {
    if (selectedFiles.length > 0) {
      onFilesSelected(selectedFiles);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedType(FileType.NONE);
    setSelectedFiles([]);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className={styles.content}>
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">
            {selectedType === FileType.NONE
              ? t("chat.file_upload.title")
              : selectedType === FileType.MEDIA
                ? t("chat.file_upload.media_title")
                : t("chat.file_upload.files_title")}
          </p>
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only" />

        <div className={styles.body}>
          {selectedType === FileType.NONE ? (
            <div className={styles.type_selector}>
              <button
                className={styles.type_button}
                onClick={() => handleTypeSelect(FileType.MEDIA)}
              >
                <div className={styles.type_icon}>📷</div>
                <p>{t("chat.file_upload.media")}</p>
                <span>{t("chat.file_upload.media_desc")}</span>
              </button>
              <button
                className={styles.type_button}
                onClick={() => handleTypeSelect(FileType.FILES)}
              >
                <div className={styles.type_icon}>📄</div>
                <p>{t("chat.file_upload.files")}</p>
                <span>{t("chat.file_upload.files_desc")}</span>
              </button>
            </div>
          ) : selectedType === FileType.MEDIA ? (
            <AddMediaFiles
              onChange={handleFilesChange}
              currentFiles={selectedFiles}
            />
          ) : (
            <AddFiles
              onChange={handleFilesChange}
              currentFiles={selectedFiles}
            />
          )}
        </div>

        {selectedType !== FileType.NONE && (
          <div className={styles.actions}>
            <button
              className={styles.back_button}
              onClick={() => setSelectedType(FileType.NONE)}
            >
              {t("chat.file_upload.back")}
            </button>
            <button
              className={styles.send_button}
              onClick={handleSend}
              disabled={selectedFiles.length === 0}
            >
              {t("chat.file_upload.send")}
            </button>
          </div>
        )}

        <AlertDialogCancel onClick={handleClose} asChild>
          <CustomCloseButton className="translate-y-0 top-1" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
