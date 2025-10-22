import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { ContentType, getContentType, IPostTemplate, useGetUploadLinkMutation } from "@entities/project";
import { getFileExtension } from "@shared/utils";
import { IPostData } from "@entities/project";

interface CreateTemplateFormData extends IPostTemplate {
    platform: platformTypesNum;
    post_type: PostTypesNum;
}

export const useUploadFilesAndMedia = () => {
    const [getUploadLink] = useGetUploadLinkMutation();
  
    const uploadFilesAndMedia = async (formData: CreateTemplateFormData): Promise<IPostData[]> => {
      if (!formData.files || formData.files.length === 0) return [];
  
      const uploads = formData.files.map(async (file) => {
        const contentType = getContentType(file);
        const data = await getUploadLink({
          extension: getFileExtension(file),
          content_type: contentType,
        }).unwrap();
        
        await fetch(data?.url, {
          headers: {
            "Content-Type": file.type,
          },
          method: "PUT",
          body: file,
        });
        
        return {
          content_type: contentType,
          content: data.file_name,
          name: file.name,
        };
      });
  
      return await Promise.all(uploads);
    };
  
    return {
      uploadFilesAndMedia,
    };
  };