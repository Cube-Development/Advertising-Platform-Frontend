import { CartMinusIcon, CartPlusIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IAddToBasketProps } from "@entities/catalog";

export const AddToBasket: FC<IAddToBasketProps> = ({
  FormatList,
  changeFormat,
  changeCard,
  card,
  page,
  selectedFormat,
}) => {
  const { t } = useTranslation();

  return (
    <MyButton
      buttons_type={
        !card.selected_format && !page
          ? "button__blue"
          : page
            ? "button__yellow"
            : "button__green"
      }
      className={styles.button}
      onClick={changeCard}
    >
      <FormatList
        selectedFormat={selectedFormat}
        changeFormat={changeFormat}
        card={card}
      />
      <div className={styles.price}>
        {selectedFormat.price.toLocaleString()} {t("symbol")}
        {page || card.selected_format ? <CartMinusIcon /> : <CartPlusIcon />}
      </div>
    </MyButton>
  );
};
