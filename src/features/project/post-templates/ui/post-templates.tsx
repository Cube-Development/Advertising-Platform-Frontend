import { useState, useCallback, FC } from "react";
import { PlatformFilter } from "../platform-filter";
import { PostsList } from "../posts-list/posts-list";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { useGetTemplatesListQuery } from "@entities/project";
import { ShowMoreBtn, SpinnerLoaderSmall, ScrollArea } from "@shared/ui";

interface PostTemplatesProps {
  canDelete?: boolean;
}

export const PostTemplates: FC<PostTemplatesProps> = ({ canDelete = true }) => {
  const [page, setPage] = useState<number>(1);
  const {
    data: templates,
    isLoading,
    isFetching,
  } = useGetTemplatesListQuery({
    page: page,
    // elements_on_page: 10,
  });
  const [selectedPlatform, setSelectedPlatform] = useState<platformTypesNum>(
    platformTypesNum.telegram,
  );
  const [selectedPostType, setSelectedPostType] = useState<PostTypesNum>(
    PostTypesNum.default,
  );

  const handlePlatformChange = useCallback((platform: platformTypesNum) => {
    setSelectedPlatform(platform);
  }, []);

  const handlePostTypeChange = useCallback((postType: PostTypesNum) => {
    setSelectedPostType(postType);
  }, []);

  // const handleOnChangePage = useCallback(() => {
  //     setPage(page + 1);
  // }, [page]);

  return (
    <div className="grid grid-flow-row justify-items-center">
      <PlatformFilter
        selectedPlatform={selectedPlatform}
        selectedPostType={selectedPostType}
        onPlatformChange={handlePlatformChange}
        onPostTypeChange={handlePostTypeChange}
      />
      <PostsList
        posts={templates?.posts || []}
        selectedPlatform={selectedPlatform}
        selectedPostType={selectedPostType}
        canDelete={canDelete}
      />
      {/* <div className="mx-auto mobile-xl:mt-8 mt-6 text-sm font-semibold cursor-pointer" onClick={handleOnChangePage}>
                {isLoading || isFetching ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
            </div> */}
    </div>
  );
};
