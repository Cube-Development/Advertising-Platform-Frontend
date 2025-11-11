import { useState } from "react";
import { CirclePlus, CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
  SpinnerLoaderSmall,
  MyButton,
} from "@shared/ui";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { IPostTemplate, useAddTemplateMutation } from "@entities/project";
import { useUploadFilesAndMedia } from "../hooks/useUploadFiles";
import { PostCreator, RenderPost } from "../components";
import { CreateTemplateFormData } from "../model/createTemplateFormType";

export const CreateTemplatePost = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isOpen, setIsOpen] = useState<string>("");
  const [addTemplate, { isLoading }] = useAddTemplateMutation();
  const { uploadFilesAndMedia } = useUploadFilesAndMedia();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateFormData>({
    defaultValues: {
      name: "",
      platform: platformTypesNum.telegram,
      post_type: PostTypesNum.default,
      files: [],
      localMedia: [],
      localFiles: [],
    },
  });

  const formState = watch();

  const onSubmit = async (data: CreateTemplateFormData) => {
    try {
      setIsCreatingTemplate(true);
      const templateData = {
        name: data.name,
        localFiles: data.localFiles || [],
        localMedia: data.localMedia || [],
        files: data.files || [],
        platform: data.platform,
        post_type: data.post_type,
      };

      const uploadedFiles = await uploadFilesAndMedia(templateData);

      const allFiles = [...templateData.files, ...uploadedFiles];

      const templatePayload: IPostTemplate = {
        name: templateData.name,
        files: allFiles,
      };

      await addTemplate(templatePayload)
        .unwrap()
        .then(() => {
          toast({
            title: t("toasts.template_post.add.success"),
            variant: "success",
          });
        })
        .catch(() => {
          toast({
            title: t("toasts.template_post.add.error"),
            variant: "error",
          });
        })
        .finally(() => {
          reset();
        });
    } catch (error) {
      console.error("Something gone wrong: ", error);
    } finally {
      reset();
      setIsCreatingTemplate(false);
      setIsOpen("");
    }
  };

  console.log(formState);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={isOpen}
      onValueChange={setIsOpen}
    >
      <AccordionItem
        value="create-template"
        className="border rounded-[30px] mb-6 shadow-[0px_0px_5px_2px_rgba(10,165,190,0.3)]"
      >
        <AccordionTrigger className="data-[state=open]:bg-transparent data-[state=open]:text-[var(--Personal-colors-main2)] flex items-center justify-center gap-2 hover:scale-[1.005] transition-all duration-500 cursor-pointer rounded-[30px] p-2 bg-[var(--Personal-colors-main2)] text-white">
          <CirclePlus className="size-8 stroke-[1.5px]" />
          <p className="text-sm font-semibold">
            {t("template_post.add_template_post")}
          </p>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 mt-6 relative">
          <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid lg:grid-cols-[1fr,0.5fr] grid-cols-1 grid-flow-row gap-6">
                <PostCreator
                  register={register}
                  errors={errors}
                  platform={formState.platform}
                  post_type={formState.post_type}
                  formState={formState}
                  setFormValue={setValue}
                />
                <RenderPost formState={formState} />
              </div>
              <MyButton
                className="w-full hover:opacity-70 transition-all duration-500"
                type="submit"
                disabled={isLoading || isCreatingTemplate}
              >
                {isLoading || isCreatingTemplate ? (
                  <SpinnerLoaderSmall />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <p className="font-medium">
                      {t("template_post.create_template_post")}
                    </p>
                    <CloudUpload className="mobile-xl:size-6 size-5 stroke-[1.5px]" />
                  </div>
                )}
              </MyButton>
            </form>
          </div>
          {isCreatingTemplate && (
            <div className="rounded-[30px] z-[10] absolute -top-[100px] left-0 w-full h-[calc(100%_+_100px)] bg-white/30 backdrop-blur-md flex flex-col items-center justify-center gap-6">
              <p className="mobile-xl:text-base text-sm font-semibold text-gray-600">
                {t("template_post.uploading_files")}
              </p>
              <SpinnerLoaderSmall />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
