import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { CartList } from "./cartList";
import { CreatePost } from "./createPost";
import { RecomendationList } from "@widgets/cartBlock/UI/recomendationList";
import { IPlatform, IToCart } from "@shared/types/platform";

const cards = [
  {
    id: "1",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 1,
  },
  {
    id: "2",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 2,
  },
  {
    id: "3",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 1,
  },
];

const reccartCards = [
  {
    id: "4",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [
      { format: 0, views: 32222, price: 150000, er: 27, cpv: 121 },
      { format: 1, views: 42222, price: 250000, er: 37, cpv: 221 },
      { format: 2, views: 52222, price: 350000, er: 47, cpv: 321 },
    ],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 1,
  },
  {
    id: "5",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 2,
  },
  {
    id: "6",
    rate: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    name: "MDK",
    category: "Юмор и развлечения",
    description: "fdkmfdslmsl",
    format: [{ format: 0, views: 32222, price: 150000, er: 27, cpv: 121 }],
    subscribers: 301975,
    male: 50,
    female: 50,
    platform: 1,
  },
];

export const CartBlock: FC = () => {
  const [cartCards, setCartCards] = useState<IPlatform[]>(cards);
  const [recomendCards, setRecomendCards] = useState<IPlatform[]>(reccartCards);

  const handleChangeCartCards = (cart: IToCart) => {
    setCartCards([
      ...cartCards.filter((card) => card.id !== cart.channel.channel_id),
    ]);
    // запрос в бек
    console.log(cart.channel);
  };

  const handleChangeRecomendCards = (cart: IToCart) => {
    setRecomendCards([
      ...recomendCards.filter((card) => card.id !== cart.channel.channel_id),
    ]);

    const recommendedCard = recomendCards.find(
      (card) => card.id === cart.channel.channel_id,
    );
    if (recommendedCard) {
      setCartCards([...cartCards, recommendedCard]);
    }
    // запрос в бек
    console.log(cart.channel);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div>
          <div className={styles.cards}>
            <CartList cards={cartCards} onChangeCard={handleChangeCartCards} />
            <RecomendationList
              cards={recomendCards}
              onChangeCard={handleChangeRecomendCards}
            />
          </div>
        </div>
        <CreatePost />
      </div>
    </div>
  );
};
