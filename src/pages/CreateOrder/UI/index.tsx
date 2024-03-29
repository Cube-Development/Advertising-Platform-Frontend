import { IOrder } from "@shared/types/createPost";
import { CreateOrderDatetime } from "@widgets/createOrderDatetime";
import { CreateOrderPayment } from "@widgets/createOrderPayment";
import { CreateOrderPost } from "@widgets/createOrderPost";
import { CreateOrderTop } from "@widgets/createOrderTop";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ChannelCards = [
  {
    id: "fdsfsdfsfd",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
    name: "MDK",
    category: "Юмор и развлечения",
    platform: 1,
    date: null,
    time: null,
    post: null,
  },
  {
    id: "fdsfsdfsfd",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
  {
    id: "fdsfsdfsfd",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
  {
    id: "fdsfsdfsfd",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
    name: "MDK",
    category: "Юмор и развлечения",
    date: "09/03/2025",
    time: ["16:00-21:00"],
    post: null,
    platform: 2,
  },
];

export const CreateOrderPage: FC = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<IOrder>();

  const onSubmit = () => {
    console.log(getValues());
    return true;
  };

  useEffect;

  return (
    <>
      <CreateOrderTop onChange={setValue} />
      <CreateOrderPost cards={ChannelCards} isBlur={false} />
      <CreateOrderDatetime cards={ChannelCards} isBlur={false} />
      <CreateOrderPayment isBlur={false} />
    </>
  );
};
