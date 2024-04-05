import { AddToBasket } from "@features/addToBasket";
import { CatalogCard } from "@features/catalogCard";
import { FormatList } from "@features/formatList";
import { ICatalogCards } from "@shared/types/platform";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RecomendationList: FC<ICatalogCards> = ({
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
          {cards.map((card) => (
            <CatalogCard
              card={card}
              key={card.id}
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
