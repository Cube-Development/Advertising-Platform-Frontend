import {
  // ContentType,
  ICreatePostForm,
  // getContentType,
  useApproveProjectMutation,
  useCreateOrderDatesMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  // useGetUploadLinkMutation,
  useProjectNameMutation,
  useProjectOrdersQuery,
} from "@entities/project";
import { usePaymentProjectMutation } from "@entities/wallet";
import { Languages } from "@shared/config/languages";
// import { getFileExtension } from "@shared/functions";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { SpinnerLoader, useToast } from "@shared/ui";
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
import { roles } from "@entities/user";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);

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
          offset: -70,
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
  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
  };
  const { data: projectChannels, isLoading: isOrdersLoading } =
    useProjectOrdersQuery(projectChannelsReq, {
      skip: !project_id || !isAuth,
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
  // const [getUploadLink] = useGetUploadLinkMutation();
  const [projectName] = useProjectNameMutation();
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();
  const [approveProject] = useApproveProjectMutation();

  // загрузка файлов и медиа
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      project_id &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length
    ) {
      try {
        setIsLoading(true);
        // Загрузка файлов и медиа
        // Загрузка файлов и медиа

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
              setIsUploadLoading={setIsUploadLoading}
            />
            <CreateOrderDatetime
              cards={projectChannels?.orders || []}
              isBlur={blur.datetime}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
              isUploadLoading={isUploadLoading}
            />
            <CreateOrderPayment
              isBlur={blur.payment}
              total_price={10000000}
              role={role}
            />
          </>
        )}
      </form>
    </>
  );
};
