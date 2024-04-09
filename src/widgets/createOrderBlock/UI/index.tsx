import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CreateOrderTop } from "./createOrderTop";
import { CreateOrderPost } from "./createOrderPost";
import { CreateOrderDatetime } from "./createOrderDatetime";
import { CreateOrderPayment } from "./createOrderPayment";
import { ICreateOrderBlur } from "@shared/types/platform";
import { useForm } from "react-hook-form";
import { ICreatePost, ICreatePostForm } from "@shared/types/createPost";
import { platform } from "os";
import { CreatePostData } from "@shared/config/createPostData";

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

const onBlur = { post: true, datetime: true, payment: true };

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const [blur, setBlur] = useState<ICreateOrderBlur>(onBlur);
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    console.log(newBlur);
    setBlur(newBlur);
  };

  const project_id = "1111";

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreatePostForm>({
    defaultValues: {
      project_id: project_id,
      posts: [],
      datetime: { project_id: project_id, orders: [] },
    },
  });

  // const platforms: number[] = [
  //   ...new Set(ChannelCards.map((card) => card.platform)),
  // ];

  // register(createPostData.project_id, {value: project_id})

  //   const posts: ICreatePost[] = platforms.map((platform) => ({
  //     project_id: project_id,
  //     platform: platform
  // }));

  //   const mainForm = {
  //   }

  return (
    <div>
      <CreateOrderTop onChangeBlur={handleOnChangeBlur} register={register} />
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
    </div>
  );
};
