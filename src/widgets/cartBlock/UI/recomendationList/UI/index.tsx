import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { CatalogCard } from "@features/catalogCard";
import { AddToBasket } from "@features/addToBasket";
import { FormatList } from "@features/formatList";
import { CartIcon } from "@shared/assets";
import { IChangeCards, IPlatform } from "@shared/types/platform";

interface RecomendationListProps extends IChangeCards {
  cards: IPlatform[];
}

export const RecomendationList: FC<RecomendationListProps> = ({
  cards,
  onChangeCard,
}) => {
  const { t } = useTranslation();
  const [isVisible, setVisible] = useState(true);
  const handleChange = () => {
    setVisible(!isVisible);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p>{t("cart.recomendation")}</p>
        <button onClick={handleChange}>
          {isVisible ? t("cart.hide") : t("cart.show")}
        </button>
      </div>

      {isVisible && (
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <CatalogCard
              card={card}
              key={index}
              AddToBasketBtn={AddToBasket}
              FormatList={FormatList}
              onChangeCard={onChangeCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};
