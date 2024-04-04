import { AddCart } from "@features/addCart";
import { AddToBasket } from "@features/addToBasket";
import { CatalogCard } from "@features/catalogCard";
import { FormatList } from "@features/formatList";
import { SaveCart } from "@features/saveCart";
import { CartIcon } from "@shared/assets";
import { ICatalogCards } from "@shared/types/platform";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const CartList: FC<ICatalogCards> = ({ cards, onChangeCard }) => {
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
            onChangeCard={onChangeCard}
            isCart={true}
          />
        ))}
      </div>
    </div>
  );
};
