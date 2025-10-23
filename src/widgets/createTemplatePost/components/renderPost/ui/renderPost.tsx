import { FC, useMemo } from "react";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";
import { ContentType, ICreatePostForm } from "@entities/project";
import {
  DisplayTelegram,
  DisplayFeed,
  DisplayStories,
  DisplayShorts,
  DisplayVideos,
  PostTypesNum,
  platformTypesNum,
  platformTypesStr,
} from "@entities/platform";

interface RenderPostProps {
  formState: CreateTemplateFormData;
}

export const RenderPost: FC<RenderPostProps> = ({ formState }) => {
  const displayFormState: ICreatePostForm = useMemo(() => {
    // Извлекаем text из files
    const textFiles = formState.files.filter(
      (file) => file.content_type === ContentType.text,
    );

    // Создаем posts с правильной структурой
    const posts = [
      {
        platform: formState.platform,
        post_type: formState.post_type,
        text: textFiles,
        media: formState.localMedia || [],
        files: formState.localFiles || [],
        buttons:
          formState.files?.filter(
            (file) => file.content_type === ContentType.button,
          ) || [],
        order_id: undefined,
      },
    ];

    return {
      name: formState.name,
      posts,
      multiposts: [],
      selectedMultiPostId: null,
      isMultiPost: false,
      selectedPostType: formState.post_type,
      platformFilter: {
        id: formState.platform,
        name: "",
        type: formState.platform as unknown as platformTypesStr,
        default_value: "",
        post_types: [],
      },
      datetime: {
        project_id: "",
        orders: [],
      },
      isLoading: false,
      isDownloadPosts: false,
    };
  }, [formState]);

  return (
    <div className="">
      {formState.platform === platformTypesNum.telegram && (
        <DisplayTelegram
          formState={displayFormState}
          platformId={platformTypesNum.telegram}
        />
      )}
      {formState.platform === platformTypesNum.instagram &&
        formState.post_type === PostTypesNum.feed && (
          <DisplayFeed
            formState={displayFormState}
            platformId={platformTypesNum.instagram}
            postType={formState.post_type}
          />
        )}
      {formState.platform === platformTypesNum.instagram &&
        formState.post_type === PostTypesNum.FullHd_vertical && (
          <DisplayStories
            formState={displayFormState}
            platformId={platformTypesNum.instagram}
            postType={formState.post_type}
          />
        )}
      {formState.platform === platformTypesNum.youtube &&
        formState.post_type === PostTypesNum.FullHd_vertical && (
          <DisplayShorts
            formState={displayFormState}
            platformId={platformTypesNum.youtube}
            postType={formState.post_type}
          />
        )}
      {formState.platform === platformTypesNum.youtube &&
        formState.post_type === PostTypesNum.FullHd_horizontal && (
          <DisplayVideos
            formState={displayFormState}
            platformId={platformTypesNum.youtube}
            postType={formState.post_type}
          />
        )}
    </div>
  );
};
