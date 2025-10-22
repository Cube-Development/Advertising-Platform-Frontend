import { useState } from "react";
import { CirclePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogAction, useToast } from "@shared/ui";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { IPostTemplate, useAddTemplateMutation } from "@entities/project";
import { useUploadFilesAndMedia } from "../hooks/useUploadFiles";
import { PostCreator, RenderPost } from "../components";

interface CreateTemplateFormData extends IPostTemplate {
    platform: platformTypesNum;
    post_type: PostTypesNum;
}

export const CreateTemplatePost = () => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [addTemplate, { isLoading }] = useAddTemplateMutation();
    const { uploadFilesAndMedia } = useUploadFilesAndMedia();

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<CreateTemplateFormData>({
        defaultValues: {
            name: "",
            platform: platformTypesNum.telegram,
            post_type: PostTypesNum.default,
            files: [],
        },
    });

    const formState = watch();

    const onSubmit = async (data: CreateTemplateFormData) => {
        try {
            // Подготавливаем данные для загрузки
            const templateData = {
                name: data.name,
                files: data.files || [],
                platform: data.platform,
                post_type: data.post_type,
            };

            // Загружаем файлы на сервер
            await uploadFilesAndMedia(templateData);
            
            // Создаем шаблон с загруженными файлами
            const templatePayload: IPostTemplate = {
                id: templateData.id,
                name: templateData.name,
                files: templateData.files
            };

            await addTemplate(templatePayload).unwrap().then(() => {
                toast({
                    title: "Template created successfully",
                    variant: "success",
                });
            }).catch(() => {
                toast({
                    title: "Failed to create template",
                    variant: "error",
                });
            }).finally(() => {
                reset();
                setIsOpen(false);
            });
        } catch (error) {
            console.error("Something gone wrong: ", error);
        } finally {
            reset();
            setIsOpen(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild className="block w-full hover:scale-[1.015] transition-all duration-300 cursor-pointer rounded-full p-2 bg-[var(--Personal-colors-main2)] shadow-[0px_2px_5px_2px_rgba(10,165,190,0.5)] text-white hover:text-white/80 mb-6">
                <div className="flex items-center justify-center gap-2">
                    <CirclePlus className="size-8 stroke-[1.5px]" />
                    <p className="text-sm font-semibold">Add template</p>
                </div>  
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90vw] max-h-[90vh] overflow-y-auto">
                <AlertDialogDescription className="sr-only"></AlertDialogDescription>
                <AlertDialogTitle className="sr-only"></AlertDialogTitle>
                <div className="relative">
                    <AlertDialogAction className="!bg-transparent absolute -right-[60px] -top-8">
                        <X className="w-[30px] rounded-full p-2 bg-white cursor-pointer text-black" />
                    </AlertDialogAction>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                            <PostCreator
                                register={register}
                                errors={errors}
                                platform={formState.platform}
                                post_type={formState.post_type}
                                formState={formState}
                                setFormValue={setValue}
                            />
                            <RenderPost post={formState} selectedPlatform={formState.platform} selectedPostType={formState.post_type} />
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Template"}
                        </button>
                    </form>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};