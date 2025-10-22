import { FC } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form"
import { PostFiles, AddFiles, AddMediaFiles } from "@features/createOrder";
import { PlatformFilter } from "@features/project";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { Input } from "@shared/ui"
import { IPostTemplate } from "@entities/project";
import { TypeRenderEditor } from "../typeRenderEditor";

interface CreateTemplateFormData extends IPostTemplate {
    platform: platformTypesNum;
    post_type: PostTypesNum;
    media?: File[];
    fileInputs?: File[];
}

interface PostCreatorProps {
    platform: platformTypesNum;
    post_type: PostTypesNum;
    register: UseFormRegister<CreateTemplateFormData>;
    errors: FieldErrors<CreateTemplateFormData>;
    formState: CreateTemplateFormData;
    setFormValue: UseFormSetValue<CreateTemplateFormData>;
}

export const PostCreator:FC<PostCreatorProps> = ({ register, errors, platform, post_type, formState, setFormValue }) => {
    return (
        <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Template Post</h2>
        
        {/* Name input */}
        <div>
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter template name"
                className="w-full"
            />
            {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
        </div>

        {/* Platform and Post Type Filter */}
        <div>
            <label className="block text-sm font-medium mb-2">Platform & Post Type</label>
            <PlatformFilter
                selectedPlatform={platform}
                selectedPostType={post_type}
                onPlatformChange={(platform) => setFormValue("platform", platform)}
                onPostTypeChange={(post_type) => setFormValue("post_type", post_type)}
            />
        </div>

        {/* Text Editor */}
        <div>
            <label className="block text-sm font-medium mb-2">Post Content</label>
            <TypeRenderEditor formState={formState} setValue={setFormValue} />
        </div>

        {/* File Upload */}
        <div>
            <label className="block text-sm font-medium mb-2">Files & Media</label>
            <PostFiles
                AddFiles={AddFiles}
                AddMediaFiles={AddMediaFiles}
                setValue={setFormValue}
                platformId={platform}
                formState={formState}
                type={post_type}
            />
        </div>
    </div>
    )
}