import {
  ContentType,
  getContentType,
  useGetUploadLinkMutation,
} from "@entities/project";
import { getFileExtension } from "@shared/utils";
import { IPostData } from "@entities/project";
import { CreateTemplateFormData } from "../model/createTemplateFormType";

export const useUploadFilesAndMedia = () => {
  const [getUploadLink] = useGetUploadLinkMutation();

  const uploadFiles = async (
    formData: CreateTemplateFormData,
  ): Promise<IPostData[]> => {
    if (!formData.localFiles || formData.localFiles.length === 0) return [];

    const uploads = formData.localFiles.map(async (file) => {
      const data = await getUploadLink({
        extension: getFileExtension(file),
        content_type: ContentType.file,
      }).unwrap();

      await fetch(data?.url, {
        headers: {
          "Content-Type": file.type,
        },
        method: "PUT",
        body: file,
      });

      return {
        content_type: ContentType.file,
        content: data.file_name,
        name: file.name,
      };
    });

    return await Promise.all(uploads);
  };

  const uploadMedia = async (
    formData: CreateTemplateFormData,
  ): Promise<IPostData[]> => {
    if (!formData.localMedia || formData.localMedia.length === 0) return [];

    const uploads = formData.localMedia.map(async (media) => {
      const contentType = getContentType(media);
      const data = await getUploadLink({
        extension: getFileExtension(media),
        content_type: contentType,
      }).unwrap();

      await fetch(data?.url, {
        headers: {
          "Content-Type": media.type,
        },
        method: "PUT",
        body: media,
      });

      return {
        content_type: contentType,
        content: data.file_name,
        name: media.name,
      };
    });

    return await Promise.all(uploads);
  };

  const uploadFilesAndMedia = async (
    formData: CreateTemplateFormData,
  ): Promise<IPostData[]> => {
    const [filesResult, mediaResult] = await Promise.all([
      uploadFiles(formData),
      uploadMedia(formData),
    ]);

    return [...filesResult, ...mediaResult];
  };

  return {
    uploadFilesAndMedia,
  };
};
