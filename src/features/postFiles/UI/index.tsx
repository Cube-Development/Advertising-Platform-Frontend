import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import { addFileFilter } from "@shared/config/addFileFilter";
import { CreatePostFormData } from "@shared/config/createPostData";
import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { FileProps, ICreatePostForm } from "@shared/types/createPost";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { FC } from "react";
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

  const { addFileFilter: filter } = useAppSelector((state) => state.filter);

  const handle = () => {};

  const handleAddMediaFile = (mediafiles: File[]) => {
    const posts = formState?.selectedMultiPostId
      ? formState?.multiposts?.filter(
          (item) => item?.order_id !== formState?.selectedMultiPostId
        ) || []
      : formState?.posts?.filter((item) => item?.platform !== platformId) || [];

    const currentPost = formState?.selectedMultiPostId
      ? formState?.multiposts?.find(
          (item) => item?.order_id === formState?.selectedMultiPostId
        )
      : formState?.posts?.find((item) => item?.platform === platformId) || {
          platform: platformId,
        };
    if (currentPost) {
      currentPost.media = [...mediafiles];
      setValue(type, [...posts, currentPost]);
    }
  };

  const handleAddFile = (files: File[]) => {
    const posts = formState?.selectedMultiPostId
      ? formState?.multiposts?.filter(
          (item) => item?.order_id !== formState?.selectedMultiPostId
        ) || []
      : formState?.posts?.filter((item) => item?.platform !== platformId) || [];

    const currentPost = formState?.selectedMultiPostId
      ? formState?.multiposts?.find(
          (item) => item?.order_id === formState?.selectedMultiPostId
        )
      : formState?.posts?.find((item) => item?.platform === platformId) || {
          platform: platformId,
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
        (item) => item?.order_id === formState?.selectedMultiPostId
      )
    : formState?.posts?.find((item) => item?.platform === platformId) || {
        platform: platformId,
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
