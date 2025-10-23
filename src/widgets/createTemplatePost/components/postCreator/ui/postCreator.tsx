import { FC } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { AddFiles, AddMediaFiles } from "@features/createOrder";
import { PlatformFilter } from "@features/project";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { Input } from "@shared/ui";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";
import { TemplatePostEditor } from "../templatePostEditor";
import { TemplatePostFiles } from "../templatePostFiles";
import { TemplatePostButtons } from "../templatePostButtons";

interface PostCreatorProps {
  platform: platformTypesNum;
  post_type: PostTypesNum;
  register: UseFormRegister<CreateTemplateFormData>;
  errors: FieldErrors<CreateTemplateFormData>;
  formState: CreateTemplateFormData;
  setFormValue: UseFormSetValue<CreateTemplateFormData>;
}

export const PostCreator: FC<PostCreatorProps> = ({
  register,
  errors,
  platform,
  post_type,
  formState,
  setFormValue,
}) => {
  return (
    <div className="space-y-4 h-fit">
      <Input
        {...register("name", { required: "Name is required" })}
        placeholder="Enter template name"
        className="w-full"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
      <PlatformFilter
        selectedPlatform={platform}
        selectedPostType={post_type}
        onPlatformChange={(platform) => setFormValue("platform", platform)}
        onPostTypeChange={(post_type) => setFormValue("post_type", post_type)}
      />
      <TemplatePostEditor setValue={setFormValue} formState={formState} />

      <TemplatePostFiles
        AddFiles={AddFiles}
        AddMediaFiles={AddMediaFiles}
        setValue={setFormValue}
        formState={formState}
        platformId={platform}
      />

      <TemplatePostButtons setValue={setFormValue} formState={formState} />
    </div>
  );
};
