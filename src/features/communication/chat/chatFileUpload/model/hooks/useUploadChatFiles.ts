import {
  ContentType,
  getContentType,
  useGetUploadLinkMutation,
} from "@entities/project";
import { IMess } from "@entities/communication";
import { getFileExtension } from "@shared/utils";

export const useUploadChatFiles = () => {
  const [getUploadLink] = useGetUploadLinkMutation();

  const uploadFiles = async (files: File[]): Promise<IMess[]> => {
    const messages: IMess[] = [];

    for (const file of files) {
      try {
        const contentType = getContentType(file);
        const data = await getUploadLink({
          extension: getFileExtension(file),
          content_type: contentType,
        }).unwrap();

        await fetch(data.url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        messages.push({
          content_type: contentType,
          content: data.file_name,
          name: file.name,
        });
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }

    return messages;
  };

  return { uploadFiles };
};
