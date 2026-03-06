import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { AddFiles, AddMediaFiles } from "@features/createOrder";
import { PlatformFilter } from "@features/project";
import { Input, PostEditor } from "@shared/ui";
import { CreateTemplateFormData } from "@widgets/createTemplatePost/model/createTemplateFormType";
import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TemplatePostButtons } from "../templatePostButtons";
import { TemplatePostFiles } from "../templatePostFiles";

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
  const { t } = useTranslation();
  return (
    <div className="space-y-4 h-fit">
      <Input
        {...register("name", { required: "Name is required" })}
        placeholder={t("template_post.template_name_placeholder")}
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
      <PostEditor
        files={formState.files || []}
        onUpdate={(updatedFiles) => setFormValue("files", updatedFiles)}
      />

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
