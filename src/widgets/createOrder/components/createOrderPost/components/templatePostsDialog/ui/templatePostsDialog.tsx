import { CloudUpload, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  ScrollArea,
  MyButton,
  SpinnerLoaderSmall,
} from "@shared/ui";
import { PostTemplates } from "@features/project";
import { ICreatePostForm, IPostTemplate, ICreatePost } from "@entities/project";
import { useGetTemplatePost } from "../../../model/hooks/useGetTemplatePost";

interface TemplatePostsDialogProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const TemplatePostsDialog = ({
  setValue,
  formState,
}: TemplatePostsDialogProps) => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] =
    useState<IPostTemplate | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Используем хук для обработки выбранного шаблона
  const { processedPost, isLoading: isLoadingGetTemplatePost } =
    useGetTemplatePost({
      formState,
      post: selectedTemplate!,
    });

  // Стабильная функция для обновления формы
  const updateForm = useCallback(
    (newPost: ICreatePost) => {
      if (formState.isMultiPost) {
        // Для мультипостов
        const currentMultiposts = formState.multiposts || [];
        const updatedMultiposts = [...currentMultiposts];

        if (formState.selectedMultiPostId) {
          // Заменяем существующий пост
          const index = updatedMultiposts.findIndex(
            (post) => post.order_id === formState.selectedMultiPostId,
          );
          if (index !== -1) {
            updatedMultiposts[index] = {
              ...newPost,
              order_id: formState.selectedMultiPostId,
            };
          }
        } else {
          // Добавляем новый пост
          updatedMultiposts.push(newPost);
        }

        setValue("multiposts", updatedMultiposts);
      } else {
        // Для обычных постов
        const currentPosts = formState.posts || [];
        const updatedPosts = currentPosts.filter(
          (post) =>
            !(
              post.platform === formState.platformFilter?.id &&
              post.post_type === formState.selectedPostType
            ),
        );

        // Добавляем новый пост
        updatedPosts.push(newPost);
        setValue("posts", updatedPosts);
      }
    },
    [formState, setValue, processedPost],
  );

  // Обрабатываем результат когда processedPost готов
  useEffect(() => {
    if (processedPost && selectedTemplate) {
      // Небольшая задержка чтобы дать React время обновить состояние
      const timeoutId = setTimeout(() => {
        try {
          updateForm(processedPost);

          // Сбрасываем выбранный шаблон
          setSelectedTemplate(null);
        } catch (error) {
          console.error("Ошибка при загрузке шаблона:", error);
          setSelectedTemplate(null);
        } finally {
          setIsOpen(false);
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [processedPost, selectedTemplate, updateForm, formState]);

  const handlePostSelect = (templatePost: IPostTemplate) => {
    setSelectedTemplate(templatePost);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MyButton
          buttons_type="button__orange"
          className="hover:scale-[1.015] hover:opacity-80 transition-all duration-300 cursor-pointer flex items-center justify-center mobile-xl:ml-2 ml-0 mx-auto"
        >
          <CloudUpload className="mobile-xl:size-6 size-5 stroke-[2px]" />
          <p>{t("create_order.create.template")}</p>
        </MyButton>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] max-h-[96vh] overflow-hidden md:!p-6 !p-4">
        <DialogDescription className="sr-only"></DialogDescription>
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogClose className="flex items-center justify-end">
          <X className="size-[30px] md:scale-[2] scale-[1.5] rounded-full md:p-2 p-1 bg-white cursor-pointer text-black" />
        </DialogClose>
        <ScrollArea className="max-h-[70vh] relative">
          <PostTemplates
            canDelete={false}
            handlePostSelect={handlePostSelect}
            formStateSelectedPlatform={formState.platformFilter?.id}
            formStateSelectedPostType={formState.selectedPostType}
          />
          {isLoadingGetTemplatePost && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/30 z-10 backdrop-blur-lg">
              <SpinnerLoaderSmall />
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
