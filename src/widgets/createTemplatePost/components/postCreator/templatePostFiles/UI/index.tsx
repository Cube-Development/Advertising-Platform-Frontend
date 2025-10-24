import { platformTypesNum } from "@entities/platform";
import {
  ADD_FILE_FILTER,
  ADD_FILE_FILTER_TABS_LIST,
  FileProps,
} from "@entities/project";
import { BarSubFilter } from "@features/other";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";

interface TemplatePostFilesProps {
  AddMediaFiles: FC<FileProps>;
  AddFiles: FC<FileProps>;
  setValue: UseFormSetValue<CreateTemplateFormData>;
  formState: CreateTemplateFormData;
  platformId: platformTypesNum;
}

export const TemplatePostFiles: FC<TemplatePostFilesProps> = ({
  AddMediaFiles,
  AddFiles,
  setValue,
  formState,
  platformId,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ADD_FILE_FILTER>(
    ADD_FILE_FILTER.MEDIA_FILE,
  );

  const handleAddMediaFile = (mediafiles: File[]) => {
    // Для YouTube ограничиваем до 1 файла
    const filesToSave =
      platformId !== platformTypesNum.youtube
        ? mediafiles
        : mediafiles.length > 0
          ? [mediafiles[0]]
          : [];

    setValue("localMedia", filesToSave);
  };

  const handleAddFile = (files: File[]) => {
    const currentFiles = formState.localFiles || [];
    const filesToSave = files.length ? [...currentFiles, ...files] : [];

    setValue("localFiles", filesToSave);
  };

  const currentMedia: File[] = formState.localMedia || [];
  const currentFile: File[] = formState.localFiles || [];

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <div className={`${styles.open} button`}>
          <div className={styles.icon}>
            <ImageIcon />
          </div>
          <p className="truncate">{t("create_order.create.add_file")}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className={styles.modalContent}>
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
          <div className={styles.top}>
            <AlertDialogTitle className={styles.title}>
              {t("create_order.create.add_file")}
            </AlertDialogTitle>
            <AlertDialogCancel>
              <CancelIcon2 />
            </AlertDialogCancel>
          </div>
          <BarSubFilter
            tab={filter}
            changeTab={setFilter}
            tab_list={ADD_FILE_FILTER_TABS_LIST}
          />
          {filter === ADD_FILE_FILTER.FILE ? (
            <AddFiles onChange={handleAddFile} currentFiles={currentFile} />
          ) : (
            <AddMediaFiles
              onChange={handleAddMediaFile}
              currentFiles={currentMedia}
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
