import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { CreateOrderTop } from "./createOrderTop";
import { CreateOrderPost } from "./createOrderPost";
import { CreateOrderDatetime } from "./createOrderDatetime";
import { CreateOrderPayment } from "./createOrderPayment";
import { ICreateOrderBlur } from "@shared/types/platform";

const ChannelCards = [
  {
    id: "fdsfsdfsfd",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
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

const onBlur = { post: false, datetime: false, payment: false };

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const [blur, setBlur] = useState<ICreateOrderBlur>(onBlur);
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = blur;
    newBlur[key] = false;
    setBlur(newBlur);
  };
  return (
    <div>
      <CreateOrderTop onChangeBlur={handleOnChangeBlur} />
      <CreateOrderPost
        cards={ChannelCards}
        isBlur={blur.post}
        onChangeBlur={handleOnChangeBlur}
      />
      <CreateOrderDatetime
        cards={ChannelCards}
        isBlur={blur.datetime}
        onChangeBlur={handleOnChangeBlur}
      />
      <CreateOrderPayment isBlur={blur.datetime} />
    </div>
  );
};
