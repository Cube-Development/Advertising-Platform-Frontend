import { FC } from "react";
import { IPostTemplate } from "@entities/project";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { PostCard } from "@features/project/post-templates/posts-list/post-card";

interface RenderPostProps {
    post: IPostTemplate;
    selectedPlatform: platformTypesNum;
    selectedPostType: PostTypesNum;
}

export const RenderPost: FC<RenderPostProps> = ({ post, selectedPlatform, selectedPostType }) => {
    return (
        <div>
            <p className="text-2xl font-bold text-center">Preview</p>
            <div className="lg:max-w-[50%] md:max-w-[30%] w-full mx-auto">
                <PostCard post={post} selectedPlatform={selectedPlatform} selectedPostType={selectedPostType} />
            </div>
        </div>
    )
}