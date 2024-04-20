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
} from "@shared/store/services/advOrdersService";
import { usePaymentProjectMutation } from "@shared/store/services/walletService";

const ChannelCards = [
  {
    order_id: "101",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    date: null,
    time: null,
    post: null,
    platform: 1,
  },
  {
    order_id: "102",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
  {
    order_id: "103",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
  {
    order_id: "104",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
];

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const onBlur = { post: true, datetime: true, payment: true };
  const [blur, setBlur] = useState<ICreateOrderBlur>(onBlur);
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
  };

  const project_id = Cookies.get("project_id");

  const { register, getValues, reset, handleSubmit, setValue } =
    useForm<ICreatePostForm>({
      defaultValues: {
        project_id: project_id,
        posts: [],
        datetime: { project_id: project_id, orders: [] },
      },
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
      createOrderDates(formData.datetime)
        .unwrap()
        .then(() => {
          formData.posts.map((post, index) => {
            const postReq = { ...post, project_id: project_id };
            createPost(postReq)
              .unwrap()
              .then(() => {
                console.log("Пост: ", index);
              })
              .catch(() => {
                alert("Ошибка в создании поста");
              });
          });
        })
        .then(() =>
          paymentProject(project_id)
            .unwrap()
            .then((data) => {
              console.log(data.success);
            })
            .catch(() => alert("Ошибка в оплате заказа")),
        )
        .catch(() => {
          alert("Ошибка в создании дат для каналов");
        });
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
        cards={ChannelCards}
        isBlur={blur.post}
        onChangeBlur={handleOnChangeBlur}
        setValue={setValue}
        getValues={getValues}
      />
      <CreateOrderDatetime
        cards={ChannelCards}
        isBlur={blur.datetime}
        onChangeBlur={handleOnChangeBlur}
        setValue={setValue}
        getValues={getValues}
      />
      <CreateOrderPayment isBlur={blur.payment} />
    </form>
  );
};
