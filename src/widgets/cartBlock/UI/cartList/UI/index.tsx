import { AddCart } from "@features/addCart";
import { AddToBasket } from "@features/addToBasket";
import { CatalogCard } from "@features/catalogCard";
import { FormatList } from "@features/formatList";
import { SaveCart } from "@features/saveCart";
import { IPlatform } from "@shared/types/platform";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { CartIcon } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";

interface CartListProps {
  channels: IPlatform[];
  // setValue: UseFormSetValue<getCatalogReq>;
  onChangeCard: (cart: IPlatform) => void;
}

export const CartList: FC<CartListProps> = ({ channels, onChangeCard }) => {
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
        {/* {channels?.map((card) => (
          <CatalogCard
            card={card}
            key={card.id}
            AddToBasketBtn={AddToBasket}
            FormatList={FormatList}
            onChangeCard={onChangeCard}
            page={pageFilter.cart}
          />
        ))} */}
      </div>
    </div>
  );
};
