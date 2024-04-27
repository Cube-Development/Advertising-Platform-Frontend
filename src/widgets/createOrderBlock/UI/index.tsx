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

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const onBlur = { post: true, datetime: true, payment: true };
  const [blur, setBlur] = useState<ICreateOrderBlur>(onBlur);
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
  };

  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const project_id = Cookies.get("project_id");

  const { register, getValues, handleSubmit, setValue } =
    useForm<ICreatePostForm>({
      defaultValues: {
        project_id: project_id,
        posts: [],
        datetime: { project_id: project_id, orders: [] },
      },
    });

  const projectChannelsReq = {
    project_id: project_id!,
    language: language?.id || Languages[0].id,
    page: 1,
    // elements_on_page: 100,
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
                console.log("Пост: ", index);
              })
              .catch(() => {
                alert("Ошибка в создании поста");
              });
          })
        );
        await createOrderDates(formData.datetime)
          .unwrap()
          .then(() => {
            paymentProject(project_id)
              .unwrap()
              .then(() => {
                navigate(paths.orders);
              })
              .catch(() => alert("Ошибка в оплате заказа"));
          })
          .catch(() => {
            alert("Ошибка в создании дат для каналов");
          });
      } catch (error) {
        alert("Произошла ошибка: " + error);
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
