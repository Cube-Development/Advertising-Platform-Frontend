import { IPostTemplate } from "@entities/project";
import { PostCard } from "./post-card";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { FC } from "react";
import { SearchX } from "lucide-react";
import { SpinnerLoader } from "@shared/ui";

interface PostsListProps {
  posts: IPostTemplate[];
  selectedPlatform: platformTypesNum;
  selectedPostType: PostTypesNum;
  canDelete?: boolean;
  handlePostSelect?: (template: IPostTemplate) => void;
  isLoading?: boolean;
}

export const PostsList: FC<PostsListProps> = ({
  posts,
  selectedPlatform,
  selectedPostType,
  canDelete = true,
  handlePostSelect,
  isLoading,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh] w-full">
            <SpinnerLoader />
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              selectedPlatform={selectedPlatform}
              selectedPostType={selectedPostType}
              canDelete={canDelete}
              handlePostSelect={handlePostSelect}
            />
          ))
        )}
      </div>

      {posts.length === 0 && !isLoading && (
        <div className="mx-auto mobile-xl:h-[50vh] h-[30vh] flex items-center justify-center mobile-xl:w-[20vw] w-[50vw] text-gray-400 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1px]">
          <SearchX />
        </div>
      )}
    </div>
  );
};
