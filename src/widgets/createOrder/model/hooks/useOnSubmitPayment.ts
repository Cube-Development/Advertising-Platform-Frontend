import {
  ContentType,
  getContentType,
  ICreatePostForm,
  useApproveProjectMutation,
  useCreateOrderDatesMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  useGetUploadLinkMutation,
  useProjectNameMutation,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { usePaymentProjectMutation } from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { getFileExtension } from "@shared/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useOnSubmitPayment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getUploadLink] = useGetUploadLinkMutation();
  const [projectName] = useProjectNameMutation();
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();
  const [approveProject] = useApproveProjectMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const payment = async (
    formData: ICreatePostForm,
    projectId: string,
    role: ENUM_ROLES,
  ) => {
    try {
      setIsLoading(true);

      // загрузка файлов
      if (formData?.isMultiPost && formData?.multiposts) {
        await Promise.all(
          formData.multiposts.map(async (post) => {
            if (post?.buttons) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.buttons);
            }
            if (post?.text) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.text);
            }
            if (post?.files) {
              await Promise.all(
                post.files.map(async (file) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(file),
                    content_type: ContentType.file,
                  }).unwrap();
                  await fetch(data?.url, {
                    method: "PUT",
                    body: file,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: ContentType.file,
                    content: data.file_name,
                  });
                }),
              );
            }
            if (post?.media) {
              await Promise.all(
                post.media.map(async (media) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(media),
                    content_type: getContentType(media),
                  }).unwrap();
                  await fetch(data?.url, {
                    headers: {
                      "Content-Type": media.type,
                    },
                    method: "PUT",
                    body: media,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: getContentType(media),
                    content: data.file_name,
                  });
                }),
              );
            }
          }),
        );
      } else {
        await Promise.all(
          formData.posts!.map(async (post) => {
            if (post?.buttons) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.buttons);
            }
            if (post?.text) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.text);
            }
            if (post?.files) {
              await Promise.all(
                post.files.map(async (file) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(file),
                    content_type: ContentType.file,
                  }).unwrap();
                  await fetch(data?.url, {
                    method: "PUT",
                    body: file,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: ContentType.file,
                    content: data.file_name,
                  });
                }),
              );
            }
            if (post?.media) {
              await Promise.all(
                post.media.map(async (media) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(media),
                    content_type: getContentType(media),
                  }).unwrap();
                  await fetch(data?.url, {
                    headers: {
                      "Content-Type": media.type,
                    },
                    method: "PUT",
                    body: media,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: getContentType(media),
                    content: data.file_name,
                  });
                }),
              );
            }
          }),
        );
      }

      projectName({
        project_id: projectId,
        name: formData?.name || "Some project name",
      });

      // Создание постов
      if (formData?.isMultiPost && formData?.multiposts) {
        await Promise.all(
          formData.multiposts.map(async (post) => {
            if (post.order_id) {
              const postReq = {
                files: post.content,
                comment: post?.comment,
                project_id: projectId,
                orders: [post?.order_id],
              };
              return createUniquePost(postReq)
                .unwrap()
                .catch(() => {
                  toast({
                    variant: "error",
                    title: t("toasts.create_order.post.error"),
                  });
                  setIsLoading(false);
                });
            }
          }),
        );
      } else {
        await Promise.all(
          formData.posts!.map(async (post) => {
            if (post.post_type) {
              const postReq = {
                files: post.content,
                comment: post?.comment,
                project_id: projectId,
                post_type: post?.post_type,
              };
              return createPost(postReq)
                .unwrap()
                .catch(() => {
                  toast({
                    variant: "error",
                    title: t("toasts.create_order.post.error"),
                  });
                  setIsLoading(false);
                });
            }
          }),
        );
      }

      // Создание дат заказа и оплата
      await createOrderDates(formData.datetime)
        .unwrap()
        .then(() => {
          (role === ENUM_ROLES.ADVERTISER
            ? paymentProject(projectId)
            : approveProject({ project_id: projectId })
          )
            .unwrap()
            .then(() => {
              toast({
                variant: "success",
                title: t("toasts.create_order.payment.success"),
              });
              navigate(ENUM_PATHS.ORDERS);
              setIsLoading(false);
            })
            .catch(() => {
              toast({
                variant: "error",
                title: t("toasts.create_order.payment.error"),
              });
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.create_order.date.error"),
          });
          setIsLoading(false);
        });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.create_order.post.error"),
        description: String(error),
      });
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    payment,
  };
};
