import { FC } from "react";
import styles from "./styles.module.scss";
import { SaveCart } from "@features/saveCart";
import { AddCart } from "@features/addCart";
import { useTranslation } from "react-i18next";
import { CatalogCard } from "@features/catalogCard";
import { AddToBasket } from "@features/addToBasket";
import { FormatList } from "@features/formatList";
import { CartIcon } from "@shared/assets";

const cards = [
  {
    id: "fdsfsdfsfd",
    rate: 4,
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    id: "fdsfsdfsfd",
    rate: 4,
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    id: "fdsfsdfsfd",
    rate: 4,
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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

export const CartList: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>
          <CartIcon />
          <h1>{t("cart.cart")}</h1>
        </div>
        <div className={styles.buttons}>
          <SaveCart />
          <AddCart />
        </div>
      </div>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <CatalogCard
            card={card}
            key={index}
            AddToBasketBtn={AddToBasket}
            FormatList={FormatList}
          />
        ))}
      </div>
    </div>
  );
};
