import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  useCreateOrderDatesMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  useGetUploadLinkMutation,
  useProjectOrdersQuery,
} from "@shared/store/services/advOrdersService";
import { usePaymentProjectMutation } from "@shared/store/services/walletService";
import { useTranslation } from "react-i18next";
import { Languages } from "@shared/config/languages";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";
import { scroller } from "react-scroll";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import {
  CreateOrderDatetime,
  CreateOrderLoading,
  CreateOrderPayment,
  CreateOrderPost,
  CreateOrderTop,
} from "../components";
import { getContentType, getFileExtension } from "@shared/functions";
import { ICreateOrderBlur } from "../config";
import { ContentType, ICreatePostForm } from "@entities/project";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const [blur, setBlur] = useState<ICreateOrderBlur>({
    post: true,
    datetime: true,
    payment: true,
  });
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
    switch (key) {
      case "post":
        scroller.scrollTo("post", {
          smooth: true,
          offset: -80,
        });
        break;
      case "datetime":
        scroller.scrollTo("datetime", {
          smooth: true,
          offset: -80,
        });
        break;
      case "payment":
        scroller.scrollTo("payment", {
          smooth: true,
        });
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const project_id = Cookies.get("project_id");
  // useEffect(()=>{
  //   if (!project_id) {
  //     navigate(paths.cart);
  //   }
  // }, [])
  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const { data: projectChannels, isLoading: isOrdersLoading } =
    useProjectOrdersQuery(projectChannelsReq, {
      skip: !project_id,
    });

  const { register, getValues, handleSubmit, setValue, watch } =
    useForm<ICreatePostForm>({
      defaultValues: {
        posts: [],
        datetime: { project_id: project_id, orders: [] },
        isMultiPost: false,
      },
    });
  const formState = watch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getUploadLink] = useGetUploadLinkMutation();
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      project_id &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length
    ) {
      try {
        setIsLoading(true);
        // Загрузка файлов и медиа
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
            formData.posts.map(async (post) => {
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

        // Создание постов
        if (formData?.isMultiPost && formData?.multiposts) {
          await Promise.all(
            formData.multiposts.map(async (post) => {
              if (post.order_id) {
                const postReq = {
                  files: post.content,
                  comment: post?.comment,
                  project_id: project_id,
                  orders: [post?.order_id],
                };
                return createUniquePost(postReq)
                  .unwrap()
                  .catch(() => {
                    toast({
                      variant: "error",
                      title: t("toasts.create_order.post.error"),
                    });
                  });
              }
            }),
          );
        } else {
          await Promise.all(
            formData.posts.map(async (post) => {
              if (post.post_type) {
                const postReq = {
                  files: post.content,
                  comment: post?.comment,
                  project_id: project_id,
                  post_type: post?.post_type,
                };
                return createPost(postReq)
                  .unwrap()
                  .catch(() => {
                    toast({
                      variant: "error",
                      title: t("toasts.create_order.post.error"),
                    });
                  });
              }
            }),
          );
        }

        // Создание дат заказа и оплата
        await createOrderDates(formData.datetime)
          .unwrap()
          .then(() => {
            paymentProject(project_id)
              .unwrap()
              .then(() => {
                toast({
                  variant: "success",
                  title: t("toasts.create_order.payment.success"),
                });
                navigate(paths.orders);
              })
              .catch(() => {
                toast({
                  variant: "error",
                  title: t("toasts.create_order.payment.error"),
                });
              });
          })
          .catch(() => {
            toast({
              variant: "error",
              title: t("toasts.create_order.date.error"),
            });
          });
      } catch (error) {
        toast({
          variant: "error",
          title: t("toasts.create_order.post.error"),
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <CreateOrderLoading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateOrderTop
          onChangeBlur={handleOnChangeBlur}
          register={register}
          getValues={getValues}
        />
        {isOrdersLoading ? (
          <div className="h-[80svh] w-full backdrop-blur-3xl flex justify-center items-center">
            <SpinnerLoader />
          </div>
        ) : (
          <>
            <CreateOrderPost
              cards={projectChannels?.orders || []}
              isBlur={blur.post}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />
            <CreateOrderDatetime
              cards={projectChannels?.orders || []}
              isBlur={blur.datetime}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />
            <CreateOrderPayment isBlur={blur.payment} />
          </>
        )}
      </form>
    </>
  );
};
