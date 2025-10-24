import {
  ContentType,
  ICreatePost,
  ICreatePostForm,
  IPostTemplate,
  IPostData,
} from "@entities/project";
import { useEffect, useState } from "react";
import { downloadAllFiles } from "../helpers";

// Функция для определения MIME типа по URL или имени файла
const getMimeTypeFromUrl = (url: string, fileName?: string): string => {
  const name = fileName || url;
  const extension = name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "mp4":
      return "video/mp4";
    case "avi":
      return "video/avi";
    case "mov":
      return "video/quicktime";
    case "webm":
      return "video/webm";
    case "pdf":
      return "application/pdf";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "txt":
      return "text/plain";
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    default:
      return "application/octet-stream";
  }
};

// Обертка для downloadFile с исправлением типа
const downloadFileWithCorrectType = async (
  url: string,
  fileName: string,
): Promise<File> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();

  // Определяем правильный MIME тип по URL или имени файла
  const correctMimeType = getMimeTypeFromUrl(url, fileName);

  // Создаем новый blob с правильным типом
  const correctedBlob = new Blob([blob], { type: correctMimeType });

  // Создаем File с правильным типом
  const file = new File([correctedBlob], fileName, { type: correctMimeType });
  return file;
};

// Обертка для downloadAllFiles с исправлением типов
const downloadAllFilesWithCorrectTypes = async (
  files: IPostData[],
): Promise<File[]> => {
  const promises: Promise<File>[] = files.map((file) =>
    downloadFileWithCorrectType(
      file.url || file.content,
      file.name || file.content,
    ),
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
            files = await downloadAllFilesWithCorrectTypes(backFiles);
            // files = await downloadAllFiles(backFiles);
          }
          if (backMedia?.length) {
            media = await downloadAllFilesWithCorrectTypes(backMedia);
            // media = await downloadAllFiles(backMedia);
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
