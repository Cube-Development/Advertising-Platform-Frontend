import { useState, useCallback, FC } from "react";
import { PlatformFilter } from "../platform-filter";
import { PostsList } from "../posts-list/posts-list";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { useGetTemplatesListQuery, IPostTemplate } from "@entities/project";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";
import { CirclePlus } from "lucide-react";

interface PostTemplatesProps {
  canDelete?: boolean;
  handlePostSelect?: (template: IPostTemplate) => void;
  formStateSelectedPlatform?: platformTypesNum;
  formStateSelectedPostType?: PostTypesNum;
}

export const PostTemplates: FC<PostTemplatesProps> = ({
  canDelete = true,
  handlePostSelect,
  formStateSelectedPlatform,
  formStateSelectedPostType,
}) => {
  const [page] = useState<number>(1);
  const { data: templates, isLoading: isTemplatesLoading } = useGetTemplatesListQuery({
    page: page,
    // elements_on_page: 10,
  });
  const [internalSelectedPlatform, setInternalSelectedPlatform] =
    useState<platformTypesNum>(platformTypesNum.telegram);
  const [internalSelectedPostType, setInternalSelectedPostType] =
    useState<PostTypesNum>(PostTypesNum.default);

  // Используем внешние значения если они переданы, иначе внутренние
  const selectedPlatform =
    formStateSelectedPlatform ?? internalSelectedPlatform;
  const selectedPostType =
    formStateSelectedPostType ?? internalSelectedPostType;

  const handlePlatformChange = useCallback(
    (platform: platformTypesNum) => {
      if (!formStateSelectedPlatform) {
        setInternalSelectedPlatform(platform);
      }
    },
    [formStateSelectedPlatform],
  );

  const handlePostTypeChange = useCallback(
    (postType: PostTypesNum) => {
      if (!formStateSelectedPostType) {
        setInternalSelectedPostType(postType);
      }
    },
    [formStateSelectedPostType],
  );

  // const handleOnChangePage = useCallback(() => {
  //     setPage(page + 1);
  // }, [page]);

  return (
    <div className="grid grid-flow-row justify-items-center">
      {!formStateSelectedPlatform && !formStateSelectedPostType && (
        <PlatformFilter
          selectedPlatform={selectedPlatform}
          selectedPostType={selectedPostType}
          onPlatformChange={handlePlatformChange}
          onPostTypeChange={handlePostTypeChange}
        />
      )}
      {formStateSelectedPlatform &&
        formStateSelectedPostType &&
        templates?.posts?.length === 0 && (
          <Link
            to={ENUM_PATHS.POST_TEMPLATES}
            className="flex items-center justify-center gap-2 hover:scale-[1.005] transition-all duration-500 cursor-pointer rounded-full py-2 px-3 bg-[var(--Personal-colors-main2)] text-white"
          >
            <CirclePlus className="size-8 stroke-[1.5px]" />
            <p className="text-sm font-semibold">Add new template</p>
          </Link>
        )}
      <PostsList
        posts={templates?.posts || []}
        selectedPlatform={selectedPlatform}
        selectedPostType={selectedPostType}
        canDelete={canDelete}
        handlePostSelect={handlePostSelect}
        isLoading={isTemplatesLoading}
      />
      {/* <div className="mx-auto mobile-xl:mt-8 mt-6 text-sm font-semibold cursor-pointer" onClick={handleOnChangePage}>
                {isLoading || isFetching ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
            </div> */}
    </div>
  );
};
