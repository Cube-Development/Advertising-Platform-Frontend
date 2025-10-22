import { useState, useEffect, useMemo, useCallback } from "react";
import { PlatformFilter } from "../platform-filter"
import { PostsList } from "../posts-list/posts-list"
import { platformTypesNum, PostTypesNum, platformTypes } from "@entities/platform";
import { useGetTemplatesListQuery } from "@entities/project";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";

export const PostTemplates = () => {
    const [page, setPage] = useState<number>(1);
    const { data: mockTemplates, isLoading, isFetching } = useGetTemplatesListQuery({
        page: page,
        // elements_on_page: 10,
    });
    const [selectedPlatform, setSelectedPlatform] = useState<platformTypesNum>(platformTypesNum.telegram);
    const [selectedPostType, setSelectedPostType] = useState<PostTypesNum>(PostTypesNum.default);

    const currentPlatform = useMemo(() => 
        platformTypes.find(platform => platform.id === selectedPlatform),
        [selectedPlatform]
    );
    
    // Автоматически устанавливаем первый тип поста при смене платформы
    useEffect(() => {
        if (currentPlatform?.post_types && currentPlatform.post_types.length > 0) {
            setSelectedPostType(currentPlatform.post_types[0].id);
        }
    }, [currentPlatform]);
    
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
        <div>
            <PlatformFilter 
                selectedPlatform={selectedPlatform}
                selectedPostType={selectedPostType}
                onPlatformChange={handlePlatformChange}
                onPostTypeChange={handlePostTypeChange}
            />
            <PostsList 
                posts={mockTemplates?.posts || []} 
                selectedPlatform={selectedPlatform}
                selectedPostType={selectedPostType}
            />
            {/* <div className="mx-auto mobile-xl:mt-8 mt-6 text-sm font-semibold cursor-pointer" onClick={handleOnChangePage}>
                {isLoading || isFetching ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
            </div> */}
        </div>
    )
}