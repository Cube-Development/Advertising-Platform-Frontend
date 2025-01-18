import { platformTypesNum } from "@entities/platform";
import {
  CreatePostFormData,
  FileProps,
  ICreatePostForm,
  addFileFilter,
} from "@entities/project";
import { BarSubfilter } from "@features/other";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import { pageFilter } from "@shared/routing";
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

interface PostFilesProps {
  AddMediaFiles: FC<FileProps>;
  AddFiles: FC<FileProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
  platformId: number;
  type: CreatePostFormData;
}

export const PostFiles: FC<PostFilesProps> = ({
  AddMediaFiles,
  AddFiles,
  setValue,
  formState,
  platformId,
  type,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<addFileFilter>(addFileFilter.mediafile);

  const currentPost = formState?.selectedMultiPostId
    ? formState?.multiposts?.find(
        (item) => item?.order_id === formState?.selectedMultiPostId,
      )
    : formState?.posts?.find(
        (item) =>
          item?.platform === platformId &&
          item?.post_type === formState?.selectedPostType,
      ) || {
        platform: platformId,
        post_type: formState?.selectedPostType,
      };

  const postsWithoutCurrent = formState?.selectedMultiPostId
    ? formState?.multiposts?.filter(
        (item) => item?.order_id !== formState?.selectedMultiPostId,
      ) || []
    : formState?.posts?.filter(
        (item) =>
          item?.platform !== platformId ||
          (item?.platform === platformId &&
            item?.post_type !== formState?.selectedPostType),
      ) || [];

  const handleAddMediaFile = (mediafiles: File[]) => {
    // const posts = formState?.selectedMultiPostId
    //   ? formState?.multiposts?.filter(
    //       (item) => item?.order_id !== formState?.selectedMultiPostId
    //     ) || []
    //   : formState?.posts?.filter(
    //       (item) =>
    //         item?.platform !== platformId ||
    //         (item?.platform === platformId &&
    //           item?.post_type !== formState?.selectedPostType)
    //     ) || [];

    // const currentPost = formState?.selectedMultiPostId
    //   ? formState?.multiposts?.find(
    //       (item) => item?.order_id === formState?.selectedMultiPostId
    //     )
    //   : formState?.posts?.find(
    //       (item) =>
    //         item?.platform === platformId &&
    //         item?.post_type === formState?.selectedPostType
    //     ) || {
    //       platform: platformId,
    //       post_type: formState?.selectedPostType,
    //     };
    if (currentPost) {
      platformId !== platformTypesNum.youtube
        ? (currentPost.media = [...mediafiles])
        : (currentPost.media = mediafiles.length > 0 ? [mediafiles[0]] : []);
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  };

  const handleAddFile = (files: File[]) => {
    // const posts = formState?.selectedMultiPostId
    //   ? formState?.multiposts?.filter(
    //       (item) => item?.order_id !== formState?.selectedMultiPostId
    //     ) || []
    //   : formState?.posts?.filter(
    //       (item) =>
    //         item?.platform !== platformId ||
    //         (item?.platform === platformId &&
    //           item?.post_type !== formState?.selectedPostType)
    //     ) || [];

    // const currentPost = formState?.selectedMultiPostId
    //   ? formState?.multiposts?.find(
    //       (item) => item?.order_id === formState?.selectedMultiPostId
    //     )
    //   : formState?.posts?.find(
    //       (item) =>
    //         item?.platform === platformId &&
    //         item?.post_type === formState?.selectedPostType
    //     ) || {
    //       platform: platformId,
    //       post_type: formState?.selectedPostType,
    //     };
    if (currentPost) {
      const currentFiles = currentPost.files || [];
      files.length
        ? (currentPost.files = [...currentFiles, ...files])
        : (currentPost.files = []);
      setValue(type, [...postsWithoutCurrent, currentPost]);
    }
  };

  const currentMedia: File[] = currentPost?.media || [];
  const currentFile: File[] = currentPost?.files || [];

  return (
    <AlertDialog>
      <AlertDialogTrigger>
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
          <BarSubfilter
            page={pageFilter.createOrderFiles}
            fileFilter={filter}
            changeFileFilter={(filter) => setFilter(filter)}
          />
          {filter === addFileFilter.file ? (
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
