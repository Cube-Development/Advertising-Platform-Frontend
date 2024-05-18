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

  const [createPost] = useCreatePostMutation();
  const [createOrderDates] = useCreateOrderDatesMutation();
  const [paymentProject] = usePaymentProjectMutation();

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      project_id &&
      formData.posts.length &&
      formData.datetime.orders.length
    ) {
      try {
        await Promise.all(
          formData.posts.map((post, index) => {
            const postReq = { ...post, project_id: project_id };
            return createPost(postReq)
              .unwrap()
              .then(() => {
                toast({
                  variant: "success",
                  title: `${t("toasts.create_order.post.success")}: ${index}`,
                });
                console.log("Пост: ", index);
              })
              .catch((error) => {
                toast({
                  variant: "error",
                  title: t("toasts.create_order.post.error"),
                  description: error,
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                });
              });
          }),
        );
        await createOrderDates(formData.datetime)
          .unwrap()
          .then(() => {
            paymentProject(project_id)
              .unwrap()
              .then(() => {
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
      }
    }
  };

  return (
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
      />
      <CreateOrderPayment isBlur={blur.payment} />
    </form>
  );
};
