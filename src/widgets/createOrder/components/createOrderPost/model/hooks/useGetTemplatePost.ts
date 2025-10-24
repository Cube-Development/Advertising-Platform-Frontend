import {
  ContentType,
  ICreatePost,
  ICreatePostForm,
  IPostTemplate,
  IPostData,
} from "@entities/project";
import { useEffect, useState } from "react";

// Обертка для downloadFile с исправлением типа
const downloadFile = async (url: string, fileName: string): Promise<File> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

// Обертка для downloadAllFiles с исправлением типов
const downloadAllFiles = async (files: IPostData[]): Promise<File[]> => {
  const promises: Promise<File>[] = files.map((file) =>
    downloadFile(file.url || file.content, file.name || file.content),
  );
  return await Promise.all(promises);
};

interface Props {
  formState: ICreatePostForm;
  post: IPostTemplate;
}

export const useGetTemplatePost = ({ formState, post }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processedPost, setProcessedPost] = useState<ICreatePost | undefined>(
    undefined,
  );

  useEffect(() => {
    if (post?.files?.length && post?.id) {
      const process = async () => {
        setIsLoading(true);
        try {
          const text = post?.files?.filter(
            (el) => el?.content_type === ContentType.text,
          );
          const buttons = post?.files?.filter(
            (el) => el?.content_type === ContentType.button,
          );

          const backFiles = post?.files?.filter(
            (el) => el?.content_type === ContentType.file,
          );
          const backMedia = post?.files?.filter((el) =>
            [ContentType.photo, ContentType.video].includes(el?.content_type),
          );

          let files: File[] | undefined;
          let media: File[] | undefined;

          if (backFiles?.length) {
            files = await downloadAllFiles(backFiles);
          }
          if (backMedia?.length) {
            media = await downloadAllFiles(backMedia);
          }

          // Создаем новый пост
          const newPost: ICreatePost = {
            platform: formState?.platformFilter?.id,
            post_type: formState?.selectedPostType,
            files: files?.length ? files : undefined,
            media: media?.length ? media : undefined,
            text: text?.length ? text : undefined,
            buttons: buttons?.length ? buttons : undefined,
          };

          setProcessedPost(newPost);
        } catch (error) {
          console.log("Error processing template post: ", error);
        }
        setIsLoading(false);
      };

      process();
    } else if (!post) {
      // Сбрасываем состояние когда post становится null
      setProcessedPost(undefined);
      setIsLoading(false);
    }
  }, [
    post,
    post?.files,
    formState?.platformFilter?.id,
    formState?.selectedPostType,
  ]);

  return { processedPost, isLoading: isLoading };
};
