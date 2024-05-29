import { FC, useState } from "react";
import { CreateOrderTop } from "./createOrderTop";
import { CreateOrderPost } from "./createOrderPost";
import { CreateOrderDatetime } from "./createOrderDatetime";
import { CreateOrderPayment } from "./createOrderPayment";
import { ICreateOrderBlur } from "@shared/types/platform";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreatePostForm } from "@shared/types/createPost";
import Cookies from "js-cookie";
import {
  useCreateOrderDatesMutation,
  useCreatePostMutation,
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
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { ContentType } from "@shared/config/createPostData";
import { getFileExtension } from "@features/getFileExtension";
import { getContentType } from "@features/getContentType";
import loadingAnimation from "@shared/assets/img/loadingAnimation.gif";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const onBlur = { post: true, datetime: true, payment: true };
  const [blur, setBlur] = useState<ICreateOrderBlur>(onBlur);
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

  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const project_id = Cookies.get("project_id");

  const { register, getValues, handleSubmit, setValue, watch } =
    useForm<ICreatePostForm>({
      defaultValues: {
        project_id: project_id,
        posts: [],
        datetime: { project_id: project_id, orders: [] },
      },
    });

  const formState = watch();

  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const { data: projectChannels } = useProjectOrdersQuery(projectChannelsReq, {
    skip: !project_id,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [getUploadLink] = useGetUploadLinkMutation();
  const [createPost] = useCreatePostMutation();
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
                })
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
                })
              );
            }
          })
        );

        // Создание постов
        await Promise.all(
          formData.posts.map(async (post) => {
            const postReq = {
              files: post.content,
              comment: post?.comment,
              project_id: project_id,
              platform: post?.platform,
            };
            return createPost(postReq)
              .unwrap()
              .catch((error) => {
                toast({
                  variant: "error",
                  title: t("toasts.create_order.post.error"),
                  description: error,
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                });
              });
          })
        );

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
              .catch((error) => {
                toast({
                  variant: "error",
                  title: t("toasts.create_order.payment.error"),
                  description: error,
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                });
              });
          })
          .catch((error) => {
            toast({
              variant: "error",
              title: t("toasts.create_order.date.error"),
              description: error,
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          });
      } catch (error) {
        toast({
          variant: "error",
          title: t("toasts.create_order.post.error"),
          description: String(error),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="fixed w-[100vw] h-[100svh] z-50 backdrop-blur-xl flex flex-col justify-center items-center transition-all">
          <img src={loadingAnimation} alt="isLoading..." className="w-[14vw]" />
          <p className="-mt-10 text-[44px] font-medium text-black/60">
            Loading...
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateOrderTop
          onChangeBlur={handleOnChangeBlur}
          register={register}
          getValues={getValues}
        />
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
      </form>
    </>
  );
};
