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
  useGetUploadLinkMutation,
  useProjectNameMutation,
  useProjectOrdersQuery,
} from "@entities/project";
import { roles } from "@entities/user";
import { usePaymentProjectMutation } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { Languages } from "@shared/config/languages";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { paths } from "@shared/routing";
import { SpinnerLoader, useToast } from "@shared/ui";
import { getFileExtension } from "@shared/utils";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import {
  CreateOrderDatetime,
  CreateOrderLoading,
  CreateOrderPayment,
  CreateOrderPost,
  CreateOrderTop,
} from "../components";
import { ICreateOrderBlur } from "../config";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const project_id = Cookies.get("project_id");
  const isChannelReplace = Boolean(Cookies.get("channel_to_be_replaced"));
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const screen = useWindowWidth();
  const navigate = useNavigate();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getUploadLink] = useGetUploadLinkMutation();
  const [projectName] = useProjectNameMutation();
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();
  const [approveProject] = useApproveProjectMutation();
  const { register, getValues, handleSubmit, setValue, watch } =
    useForm<ICreatePostForm>({
      defaultValues: {
        posts: [],
        datetime: { project_id: project_id, orders: [] },
        isMultiPost: false,
      },
    });
  const formState = watch();
  const [blur, setBlur] = useState<ICreateOrderBlur>({
    post: true,
    datetime: true,
    payment: true,
  });

  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const projectPostsReq = {
    project_id: project_id!,
    page: 1,
  };

  const { data: projectChannels, isLoading: isOrdersLoading } =
    useProjectOrdersQuery(projectChannelsReq, {
      skip: !project_id || !isAuth,
    });

  const { data: projectPosts, isLoading: isPostsLoading } =
    useGetPostsRereviewQuery(projectPostsReq, {
      skip: !project_id && !isChannelReplace,
    });

  console.log(formState);

  // total price
  const { data: totalPrice } = useGetProjectAmountQuery(
    { project_id: project_id || "" },
    {
      skip: !project_id,
    },
  );

  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
    switch (key) {
      case "post":
        scroller.scrollTo("post", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? -20 : -70,
        });
        break;
      case "datetime":
        scroller.scrollTo("datetime", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? -30 : -80,
        });
        break;
      case "payment":
        scroller.scrollTo("payment", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? -20 : -60,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      project_id &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length
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
          project_id,
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
            (role === roles.advertiser
              ? paymentProject(project_id)
              : approveProject({ project_id: project_id })
            )
              .unwrap()
              .then(() => {
                toast({
                  variant: "success",
                  title: t("toasts.create_order.payment.success"),
                });
                navigate(paths.orders);
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
            />
          </>
        )}
      </form>
    </>
  );
};
