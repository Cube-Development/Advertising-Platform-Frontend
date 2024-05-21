import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { CancelIcon2, ImageIcon } from "@shared/assets";
import { addFileFilter } from "@shared/config/addFileFilter";
import { CreatePostFormData } from "@shared/config/createPostData";
import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import {
  FileProps,
  ICreatePost,
  ICreatePostForm,
} from "@shared/types/createPost";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PostFilesProps {
  AddMediaFiles: FC<FileProps>;
  AddFiles: FC<FileProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  platformId: number;
}

export const PostFiles: FC<PostFilesProps> = ({
  AddMediaFiles,
  AddFiles,
  setValue,
  getValues,
  platformId,
}) => {
  const { t } = useTranslation();

  const { addFileFilter: filter } = useAppSelector((state) => state.filter);

  const handle = () => {};

  const handleAddMediaFile = (mediafiles: File[]) => {
    const form: ICreatePostForm = { ...getValues() };
    const posts: ICreatePost[] = (form.posts || []).filter(
      (item) => item.platform !== platformId,
    );
    const currentPost: ICreatePost = (form.posts || []).find(
      (item) => item.platform === platformId,
    ) || {
      project_id: form.project_id,
      platform: platformId,
      files: [],
      media: [],
      buttons: [],
    };
    currentPost.media = [...mediafiles];
    setValue(CreatePostFormData.posts, [...posts, currentPost]);
  };

  const handleAddFile = (files: File[]) => {
    const form: ICreatePostForm = { ...getValues() };
    const posts: ICreatePost[] = (form.posts || []).filter(
      (item) => item.platform !== platformId,
    );
    const currentPost: ICreatePost = (form.posts || []).find(
      (item) => item.platform === platformId,
    ) || {
      project_id: form.project_id,
      platform: platformId,
      files: [],
      media: [],
      buttons: [],
    };
    const currentFiles = currentPost.files || [];
    files.length
      ? (currentPost.files = [...currentFiles, ...files])
      : (currentPost.files = []);
    setValue(CreatePostFormData.posts, [...posts, currentPost]);
  };

  const form: ICreatePostForm = { ...getValues() };
  const currentPost: ICreatePost = (form.posts || []).find(
    (item) => item.platform === platformId,
  ) || {
    project_id: form.project_id,
    platform: platformId,
    files: [],
    media: [],
    buttons: [],
  };
  const currentMedia: File[] = currentPost.media || [];
  const currentFile: File[] = currentPost.files || [];

  console.log(form);

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
