import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { platformTypes, platformTypesNum, PostTypesNum } from "@entities/platform";
interface PlatformFilterProps {
    selectedPlatform: platformTypesNum;
    selectedPostType: PostTypesNum;
    onPlatformChange: (platform: platformTypesNum) => void;
    onPostTypeChange: (postType: PostTypesNum) => void;
}

export const PlatformFilter = ({ selectedPlatform, selectedPostType, onPlatformChange, onPostTypeChange }: PlatformFilterProps) => {
    const { t } = useTranslation();
    
    const platforms = useMemo(() => 
        platformTypes.filter(platform => 
            platform.id === platformTypesNum.telegram || 
            platform.id === platformTypesNum.instagram || 
            platform.id === platformTypesNum.youtube
        ), []
    );

    const postTypes = useMemo(() => 
        platformTypes.find(platform => platform.id === selectedPlatform)?.post_types,
        [selectedPlatform]
    );

    return (
        <div className="grid grid-flow-row gap-5">
            <div className="flex items-center gap-2 mobile-xl:justify-start justify-center">
                {platforms.map((platform) => {
                    const IconComponent = platform.img;
                    const isActive = selectedPlatform === platform.id;
                    
                    return (
                        <button
                            key={platform.id}
                            className={`flex items-center gap-2 rounded-[8px] text-[var(--Personal-colors-light-black)] border-[1.5px] md:p-3 p-2 ${isActive ? 'border-[var(--Personal-colors-main)]' : ''}`}
                            onClick={() => onPlatformChange(platform.id)}
                        >
                            <div className="mobile-xl:size-6 size-4 rounded-full [&>svg]:w-full [&>svg]:h-full">
                                <IconComponent />
                            </div>
                            <span className="md:text-sm text-[10px] truncate font-medium">{t(platform.name)}</span>
                        </button>
                    );
                })}
            </div>
            
            {postTypes && postTypes.length > 0 && (
                <div className="flex items-center gap-2">
                    {postTypes.map((postType) => {
                        const isActive = selectedPostType === postType.id;
                        
                        return (
                            <button
                                key={postType.id}
                                className={`${isActive ? 'text-[var(--Personal-colors-main)] underline' : 'text-[var(--Personal-colors-light-black)]'}`}
                                onClick={() => onPostTypeChange(postType.id)}
                            >
                                <span className="md:text-base text-xs font-medium">{t(postType.name)}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    )
}