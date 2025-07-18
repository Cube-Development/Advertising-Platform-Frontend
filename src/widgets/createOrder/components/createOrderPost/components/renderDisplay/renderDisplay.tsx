import {
  DisplayFeed,
  DisplayShorts,
  DisplaySite,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
  PostTypesNum,
  SkeletonDisplay,
  platformTypesStr,
} from "@entities/platform";
import { ICreatePostForm } from "@entities/project";
import { FC } from "react";

interface IRenderDisplayProps {
  formState: ICreatePostForm;
}

export const RenderDisplay: FC<IRenderDisplayProps> = ({ formState }) => {
  if (formState?.isDownloadPosts) {
    return <SkeletonDisplay />;
  }

  switch (formState.platformFilter?.type) {
    case platformTypesStr.telegram:
      return (
        <DisplayTelegram
          formState={formState}
          platformId={formState.platformFilter?.id}
        />
      );

    case platformTypesStr.instagram:
      if (formState.selectedPostType === PostTypesNum.feed) {
        return (
          <DisplayFeed
            formState={formState}
            platformId={formState.platformFilter?.id}
            postType={PostTypesNum.feed}
          />
        );
      }
      if (formState.selectedPostType === PostTypesNum.FullHd_vertical) {
        return (
          <DisplayStories
            formState={formState}
            platformId={formState.platformFilter?.id}
            postType={PostTypesNum.FullHd_vertical}
          />
        );
      }
      break;

    case platformTypesStr.youtube:
      if (formState.selectedPostType === PostTypesNum.FullHd_vertical) {
        return (
          <DisplayShorts
            formState={formState}
            platformId={formState.platformFilter?.id}
            postType={PostTypesNum.FullHd_vertical}
          />
        );
      }
      if (formState.selectedPostType === PostTypesNum.FullHd_horizontal) {
        return (
          <DisplayVideos
            formState={formState}
            platformId={formState.platformFilter?.id}
            postType={PostTypesNum.FullHd_horizontal}
          />
        );
      }
      break;

    case platformTypesStr.site:
      return <DisplaySite />;

    default:
      return null;
  }
};
