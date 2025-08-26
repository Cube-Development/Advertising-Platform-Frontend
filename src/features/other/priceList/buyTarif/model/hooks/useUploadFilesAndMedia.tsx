import {
  ContentType,
  tariffData,
  useGetUploadLinkMutation,
} from "@entities/project";
import { getFileExtension } from "@shared/utils";
import axios from "axios";
import { UseFormSetValue } from "react-hook-form";
import { IBuyTariffForm } from "../types";

export const useUploadFilesAndMedia = (
  formState: IBuyTariffForm,
  setValue: UseFormSetValue<IBuyTariffForm>,
) => {
  const [getUploadLink] = useGetUploadLinkMutation();

  const uploadSingleFile = async (file: File) => {
    const { url, file_name } = await getUploadLink({
      extension: getFileExtension(file),
      content_type: ContentType.file,
    }).unwrap();

    await axios.put(url, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (e) => {
        if (!e.total) return;
        const percent = (e.loaded / e.total) * 100;

        setValue(tariffData.uploadProgress, {
          ...formState?.uploadProgress,
          [file.name]: percent,
        });
      },
    });

    return {
      content_type: ContentType.file,
      content: file_name,
      name: file.name,
    };
  };

  const uploadFilesAndMedia = async (files: File[]) => {
    try {
      const uploaded = await Promise.all(files.map(uploadSingleFile));

      setValue(tariffData.attached_files, [
        ...(formState?.attached_files || []),
        ...uploaded,
      ]);
    } catch (error) {
      console.error("Ошибка при загрузке файлов", error);
    }
  };

  return { uploadFilesAndMedia };
};
