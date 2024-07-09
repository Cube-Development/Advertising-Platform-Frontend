import { getContentType } from "@features/getContentType";
import { getFileExtension } from "@features/getFileExtension";
import { ContentType } from "@shared/config/createPostData";
import { Languages } from "@shared/config/languages";
import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import {
  useCreateOrderDatesMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  useGetUploadLinkMutation,
  useProjectOrdersQuery,
} from "@shared/store/services/advOrdersService";
import {
  useApproveProjectMutation,
  useGetManagerProjectOrdersQuery,
  useGetManagerProjectOrdersRereviewQuery,
  useGetPostsRereviewQuery,
} from "@shared/store/services/managerOrdersService";
import { usePaymentProjectMutation } from "@shared/store/services/walletService";
import { ICreatePostForm } from "@shared/types/createPost";
import { ICreateOrderBlur } from "@shared/types/platform";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { CreateOrderDatetime } from "./createOrderDatetime";
import { CreateOrderLoading } from "./createOrderLoading";
import { CreateOrderPayment } from "./createOrderPayment";
import { CreateOrderPost } from "./createOrderPost";
import { CreateOrderTop } from "./createOrderTop";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const role = Cookies.get("role");
  const project_id = Cookies.get("project_id");
  const rereview = Cookies.get("rereview");

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

  // useEffect(()=>{
  //   if (!project_id) {
  //     navigate(paths.cart);
  //   }
  // }, [])

  const [currentPostUploadType, setCurrentPostUploadType] = useState<number>(1);

  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  const getPostsReq = {
    project_id: project_id!,
    post_upload_type: currentPostUploadType,
    language: language?.id || Languages[0].id,
    page: 1,
  };

  // получение ордеров во время формирования поста Рекламодателем
  const { data: advOrders, isLoading: isOrdersLoading } = useProjectOrdersQuery(
    projectChannelsReq,
    {
      skip: !project_id || role !== roles.advertiser,
    },
  );

  // получение ордеров во время формирования поста Манагером
  const { data: managerOrders, isLoading: isManagerOrdersLoading } =
    useGetManagerProjectOrdersQuery(projectChannelsReq, {
      skip: !project_id || role !== roles.manager,
    });

  // получение ордеров во время изменения канала / поста Манагером
  const {
    data: managerOrdersReview,
    isLoading: isManagerOrdersLoadingRereview,
  } = useGetManagerProjectOrdersRereviewQuery(projectChannelsReq, {
    skip: !project_id || role !== roles.manager || !rereview,
  });

  // получение постов во время изменения канала / поста Манагером
  const { data: managerPostsReview, isLoading: isPostsLoadingRereview } =
    useGetPostsRereviewQuery(getPostsReq, {
      skip: !project_id || role !== roles.manager || !rereview,
    });

  useEffect(() => {
    if (managerPostsReview?.posts.length === 0) {
      setCurrentPostUploadType(2);
    }
  }, [managerPostsReview]);

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
  const [approveProject] = useApproveProjectMutation();

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
            if (role === roles.advertiser && project_id) {
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
            } else if (role === roles.manager && project_id) {
              approveProject({ project_id: project_id })
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
            }
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
        {isOrdersLoading ||
        isManagerOrdersLoading ||
        isManagerOrdersLoadingRereview ||
        isPostsLoadingRereview ? (
          <div className="h-[80svh] w-full backdrop-blur-3xl flex justify-center items-center">
            <SpinnerLoader />
          </div>
        ) : (
          <>
            <CreateOrderPost
              cards={
                advOrders?.orders ||
                managerOrders?.orders ||
                managerOrdersReview?.orders ||
                []
              }
              isBlur={blur.post}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />
            <CreateOrderDatetime
              cards={
                advOrders?.orders ||
                managerOrders?.orders ||
                managerOrdersReview?.orders ||
                []
              }
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
