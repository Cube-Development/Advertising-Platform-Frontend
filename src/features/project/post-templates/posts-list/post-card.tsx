import { FC, useMemo } from "react";
import { Trash2 } from "lucide-react";
import {
  GetPostRes,
  IPostTemplate,
  useDeleteTemplateMutation,
} from "@entities/project";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import {
  DisplayTelegram,
  DisplayFeed,
  DisplayStories,
  DisplayShorts,
  DisplayVideos,
} from "@entities/platform";
import { useToast, SpinnerLoaderSmall } from "@shared/ui";

interface PostCardProps {
  post: IPostTemplate;
  selectedPlatform: platformTypesNum;
  selectedPostType: PostTypesNum;
  canDelete?: boolean;
}

export const PostCard: FC<PostCardProps> = ({
  post,
  selectedPlatform,
  selectedPostType,
  canDelete = true,
}) => {
  const [deleteTemplate, { isLoading: isDeleting }] =
    useDeleteTemplateMutation();
  const displayPost = useMemo(
    () => ({
      ...post,
      platform: selectedPlatform,
      post_type: selectedPostType,
    }),
    [post, selectedPlatform, selectedPostType, post.files],
  );
  const { toast } = useToast();

  const handleDeleteTemplate = () => {
    deleteTemplate({ id: post?.id || "" })
      .unwrap()
      .then(() => {
        toast({
          title: "Success...",
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Failed...",
          variant: "error",
        });
      });
  };

  return (
    <div className="grid grid-flow-row gap-4 p-10">
      {canDelete && (
        <div className="flex items-center gap-2 justify-center truncate">
          <h2 className="max-w-[80%] truncate text-[var(--Personal-colors-light-black)] md:text-base text-sm font-semibold text-center">
            {post?.name}
          </h2>
          <div
            onClick={handleDeleteTemplate}
            className="cursor-pointer hover:bg-red-300 hover:scale-105 transition-all duration-300 rounded-full mobile-xl:p-2 p-1.5 bg-red-500 text-white mobile-xl:size-8 size-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
          >
            {isDeleting ? <SpinnerLoaderSmall /> : <Trash2 />}
          </div>
        </div>
      )}
      {selectedPlatform === platformTypesNum.telegram && (
        <DisplayTelegram
          post={displayPost as GetPostRes}
          platformId={platformTypesNum.telegram}
        />
      )}
      {selectedPlatform === platformTypesNum.instagram &&
        selectedPostType === PostTypesNum.feed && (
          <DisplayFeed
            post={displayPost as GetPostRes}
            platformId={platformTypesNum.instagram}
          />
        )}
      {selectedPlatform === platformTypesNum.instagram &&
        selectedPostType === PostTypesNum.FullHd_vertical && (
          <DisplayStories
            post={displayPost as GetPostRes}
            platformId={platformTypesNum.instagram}
          />
        )}
      {selectedPlatform === platformTypesNum.youtube &&
        selectedPostType === PostTypesNum.FullHd_vertical && (
          <DisplayShorts
            post={displayPost as GetPostRes}
            platformId={platformTypesNum.youtube}
          />
        )}
      {selectedPlatform === platformTypesNum.youtube &&
        selectedPostType === PostTypesNum.FullHd_horizontal && (
          <DisplayVideos
            post={displayPost as GetPostRes}
            platformId={platformTypesNum.youtube}
          />
        )}
    </div>
  );
};
