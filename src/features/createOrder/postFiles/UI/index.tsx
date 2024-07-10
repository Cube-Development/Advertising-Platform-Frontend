import { CancelIcon2, ImageIcon } from "@shared/assets";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BarProfileFilter } from "@features/other";
import {
  CreatePostFormData,
  FileProps,
  ICreatePostForm,
  addFileFilter,
} from "@entities/project";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui";
import { platformTypesNum } from "@entities/platform";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";

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

  const { addFileFilter: filter } = useAppSelector((state) => state.filter);

  const handle = () => {};

  const handleAddMediaFile = (mediafiles: File[]) => {
    const posts = formState?.selectedMultiPostId
      ? formState?.multiposts?.filter(
          (item) => item?.order_id !== formState?.selectedMultiPostId,
        ) || []
      : formState?.posts?.filter(
          (item) =>
            item?.platform !== platformId ||
            (item?.platform === platformId &&
              item?.post_type !== formState?.selectedPostType),
        ) || [];

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
    if (currentPost) {
      platformId !== platformTypesNum.youtube
        ? (currentPost.media = [...mediafiles])
        : (currentPost.media = mediafiles.length > 0 ? [mediafiles[0]] : []);
      setValue(type, [...posts, currentPost]);
    }
  };

  const handleAddFile = (files: File[]) => {
    const posts = formState?.selectedMultiPostId
      ? formState?.multiposts?.filter(
          (item) => item?.order_id !== formState?.selectedMultiPostId,
        ) || []
      : formState?.posts?.filter(
          (item) =>
            item?.platform !== platformId ||
            (item?.platform === platformId &&
              item?.post_type !== formState?.selectedPostType),
        ) || [];

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
    if (currentPost) {
      const currentFiles = currentPost.files || [];
      files.length
        ? (currentPost.files = [...currentFiles, ...files])
        : (currentPost.files = []);
      setValue(type, [...posts, currentPost]);
    }
  };

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
  const currentMedia: File[] = currentPost?.media || [];
  const currentFile: File[] = currentPost?.files || [];

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={`${styles.open} button`}>
            <ImageIcon />
            <p>{t("create_order.create.add_file")}</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.modalContent}>
            <div className={styles.top}>
              <p>{t("create_order.create.add_file")}</p>
              <AlertDialogCancel>
                <CancelIcon2 />
              </AlertDialogCancel>
            </div>
            <BarProfileFilter
              page={pageFilter.createOrderFiles}
              resetValues={handle}
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
    </>
  );
};
