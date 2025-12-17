import { AddFiles } from "@features/createOrder/addFiles";
import { AddMediaFiles } from "@features/createOrder/addMediaFiles";
import { ADD_FILE_FILTER, ADD_FILE_FILTER_TABS_LIST } from "@entities/project";
import { BarSubFilter } from "@features/other";
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

export const ChatFileUpload: FC<ChatFileUploadProps> = ({
  isOpen,
  onClose,
  onFilesSelected,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ADD_FILE_FILTER>(
    ADD_FILE_FILTER.MEDIA_FILE,
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    setFilter(ADD_FILE_FILTER.MEDIA_FILE);
    setSelectedFiles([]);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className={styles.content}>
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">{t("chat.file_upload.title")}</p>
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only" />

        <div className={styles.body}>
          <BarSubFilter
            tab={filter}
            changeTab={setFilter}
            tab_list={ADD_FILE_FILTER_TABS_LIST}
          />
          <div className="mt-4">
            {filter === ADD_FILE_FILTER.MEDIA_FILE ? (
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
        </div>

        <div className={styles.actions}>
          <button
            className={styles.send_button}
            onClick={handleSend}
            disabled={selectedFiles.length === 0}
          >
            {t("chat.file_upload.send")}
          </button>
        </div>

        <AlertDialogCancel onClick={handleClose} asChild>
          <CustomCloseButton className="translate-y-0 top-1" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
