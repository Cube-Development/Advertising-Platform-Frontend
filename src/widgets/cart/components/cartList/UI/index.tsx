import { ICatalogChannel } from "@entities/project";
import { AddMore, AddToBasket, SaveCart } from "@features/cart";
import {
  CatalogCard,
  FormatList,
  SkeletonCatalogCard,
} from "@features/catalog";
import { CartIcon, SadSmileIcon } from "@shared/assets";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ENUM_PAGE_FILTER } from "@shared/routing";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ClearActiveProject } from "@features/project";

interface CartListProps {
  channels: ICatalogChannel[];
  onChangeCard: (cart: ICatalogChannel) => void;
  isLoading: boolean;
  projectId?: string;
}

export const CartList: FC<CartListProps> = ({
  channels,
  onChangeCard,
  isLoading,
  projectId,
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
      <ClearActiveProject projectId={projectId} i18nKey="cart.badge.text" />
      {channels?.length || isLoading ? (
        <div className={styles.cards}>
          {channels?.length && !isLoading ? (
            <>
              {channels?.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial="hidden"
                  animate="visible"
                  custom={Math.min(index, 10)}
                  variants={PAGE_ANIMATION.animationUp}
                  style={{ pointerEvents: "auto" }}
                >
                  <CatalogCard
                    page={ENUM_PAGE_FILTER.CART}
                    card={card}
                    AddToBasketBtn={AddToBasket}
                    FormatList={FormatList}
                    onChangeCard={onChangeCard}
                  />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: INTERSECTION_ELEMENTS.CART }).map(
                (_, index) => (
                  <SkeletonCatalogCard key={index} />
                ),
              )}
            </>
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
