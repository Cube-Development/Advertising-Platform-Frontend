import {
  ContentType,
  getContentType,
  ICreatePostForm,
  useApproveProjectMutation,
  useCreateOrderDatesMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  useGetPostsRereviewQuery,
  useGetProjectAmountQuery,
  useGetProjectNameQuery,
  useGetUploadLinkMutation,
  useProjectNameMutation,
  useProjectOrdersQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { usePaymentProjectMutation } from "@entities/wallet";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { SpinnerLoader, useToast } from "@shared/ui";
import { getFileExtension } from "@shared/utils";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CreateOrderDatetime,
  CreateOrderLoading,
  CreateOrderPayment,
  CreateOrderPost,
  CreateOrderTop,
} from "../components";
import { useChangeBlur } from "../model";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID);
  const isChannelReplace = Boolean(
    Cookies.get(ENUM_COOKIES_TYPES.IS_CHANNEL_REPLACED),
  );
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  // const screen = useWindowWidth();
  const { blur, handleOnChangeBlur } = useChangeBlur();
  const navigate = useNavigate();
  const language = useFindLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getUploadLink] = useGetUploadLinkMutation();
  const [projectName] = useProjectNameMutation();
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();
  const [approveProject] = useApproveProjectMutation();

  const { data: projectNameData, isLoading: isProjectNameLoading } =
    useGetProjectNameQuery(
      {
        project_id: projectId!,
      },
      { skip: !projectId || !isAuth },
    );

  const { register, getValues, handleSubmit, setValue, watch } =
    useForm<ICreatePostForm>({
      defaultValues: {
        posts: [],
        datetime: { project_id: projectId, orders: [] },
        isMultiPost: false,
        isDownloadPosts: false,
        name: projectNameData?.name || "",
      },
    });
  const formState = watch();

  useEffect(() => {
    if (!isProjectNameLoading && projectNameData?.name) {
      setValue("name", projectNameData?.name);
    }
  }, [projectNameData, isProjectNameLoading]);

  const projectChannelsReq = {
    project_id: projectId!,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };
  const projectPostsReq = {
    project_id: projectId!,
    page: 1,
  };

  const { data: projectChannels, isLoading: isOrdersLoading } =
    useProjectOrdersQuery(projectChannelsReq, {
      skip: !projectId || !isAuth,
    });

  useEffect(() => {
    if (!isOrdersLoading && projectChannels?.orders?.length === 0) {
      toast({
        variant: "error",
        title: "Сначала нужно добавить каналы в корзину",
      });
      navigate(ENUM_PATHS.CATALOG);
    }
  }, [projectChannels, isOrdersLoading]);

  const { data: projectPosts, isLoading: isPostsLoading } =
    useGetPostsRereviewQuery(projectPostsReq, {
      skip: !projectId && !isChannelReplace,
    });

  // total price
  const { data: totalPrice } = useGetProjectAmountQuery(
    { project_id: projectId || "" },
    {
      skip: !projectId,
    },
  );

  // const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
  //   const newBlur = { ...blur };
  //   newBlur[key] = false;
  //   setBlur(newBlur);
  //   switch (key) {
  //     case "post":
  //       scroller.scrollTo("post", {
  //         smooth: true,
  //         offset: screen > BREAKPOINT.MD ? 0 : -60,
  //       });
  //       break;
  //     case "datetime":
  //       scroller.scrollTo("datetime", {
  //         smooth: true,
  //         offset: screen > BREAKPOINT.MD ? -30 : -80,
  //       });
  //       break;
  //     case "payment":
  //       scroller.scrollTo("payment", {
  //         smooth: true,
  //         offset: screen > BREAKPOINT.MD ? 0 : -60,
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      projectId &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
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
            formData.posts.map(async (post) => {
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
    }
  };
  return (
    <>
      {isLoading && <CreateOrderLoading />}
      <CreateOrderTop
        onChangeBlur={handleOnChangeBlur}
        register={register}
        getValues={getValues}
        formState={formState}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {isOrdersLoading ? (
          <div className="h-[80svh] w-full backdrop-blur-3xl flex justify-center items-center">
            <SpinnerLoader />
          </div>
        ) : (
          <>
            <CreateOrderPost
              cards={projectChannels?.orders || []}
              posts={projectPosts?.posts || []}
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

            <CreateOrderPayment
              isBlur={blur.payment}
              total_price={totalPrice?.amount || 0}
              role={role}
              isAllowed={
                !formState?.isDownloadPosts &&
                !isOrdersLoading &&
                !isPostsLoading
              }
            />
          </>
        )}
      </form>
    </>
  );
};
