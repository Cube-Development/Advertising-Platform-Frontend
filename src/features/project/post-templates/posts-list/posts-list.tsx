import { IPostTemplate } from "@entities/project";
import { PostCard } from "./post-card";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { FC } from "react";
import { SearchX } from "lucide-react";

interface PostsListProps {
  posts: IPostTemplate[];
  selectedPlatform: platformTypesNum;
  selectedPostType: PostTypesNum;
  canDelete?: boolean;
  handlePostSelect?: (template: IPostTemplate) => void;
}

export const PostsList: FC<PostsListProps> = ({
  posts,
  selectedPlatform,
  selectedPostType,
  canDelete = true,
  handlePostSelect,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            selectedPlatform={selectedPlatform}
            selectedPostType={selectedPostType}
            canDelete={canDelete}
            handlePostSelect={handlePostSelect}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mx-auto mobile-xl:h-[50vh] h-[30vh] flex items-center justify-center mobile-xl:w-[20vw] w-[50vw] text-gray-400 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1px]">
          <SearchX />
        </div>
      )}
    </div>
  );
};
