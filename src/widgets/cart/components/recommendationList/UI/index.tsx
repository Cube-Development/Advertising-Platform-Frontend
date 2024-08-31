import { ICatalogChannel } from "@entities/project";
import { AddToBasket } from "@features/cart";
import { CatalogCard, FormatList } from "@features/catalog";
import { PAGE_ANIMATION } from "@shared/config";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface RecommendationListProps {
  channels: ICatalogChannel[];
  onChangeCard: (card: ICatalogChannel) => void;
}

export const RecommendationList: FC<RecommendationListProps> = ({
  channels,
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
          {channels.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={PAGE_ANIMATION.animationUp}
            >
              <CatalogCard
                card={card}
                key={card.id}
                AddToBasketBtn={AddToBasket}
                FormatList={FormatList}
                onChangeCard={onChangeCard}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};