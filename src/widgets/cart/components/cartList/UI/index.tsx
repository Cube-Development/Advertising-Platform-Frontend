import { ICatalogChannel } from "@entities/project";
import { AddMore, AddToBasket, SaveCart } from "@features/cart";
import {
  CatalogCard,
  FormatList,
  SkeletonCatalogCard,
} from "@features/catalog";
import { CartIcon, SadSmileIcon } from "@shared/assets";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CartListProps {
  channels: ICatalogChannel[];
  onChangeCard: (cart: ICatalogChannel) => void;
  isLoading: boolean;
}

export const CartList: FC<CartListProps> = ({
  channels,
  onChangeCard,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>
          <CartIcon />
          <p>{t("cart.cart")}</p>
        </div>
        <div className={styles.buttons}>
          <SaveCart />
          <AddMore />
        </div>
      </div>
      {channels?.length ? (
        <div className={styles.cards}>
          {channels?.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={PAGE_ANIMATION.animationUp}
            >
              <CatalogCard
                page={pageFilter.cart}
                card={card}
                AddToBasketBtn={AddToBasket}
                FormatList={FormatList}
                onChangeCard={onChangeCard}
              />
            </motion.div>
          ))}
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.catalog }).map(
              (_, index) => <SkeletonCatalogCard key={index} />,
            )}
        </div>
      ) : (
        <div className={styles.empty__block}>
          <div className={styles.icon}>
            <SadSmileIcon />
          </div>
          <h3 className={styles.title}>{t("cart.empty")}</h3>
        </div>
      )}
    </div>
  );
};
