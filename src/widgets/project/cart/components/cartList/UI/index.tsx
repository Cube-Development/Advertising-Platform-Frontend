import { CartIcon, SadSmileIcon } from "@shared/assets";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { pageFilter } from "@shared/config/pageFilter";
import { IPlatform } from "@shared/types/platform";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  AddMore,
  AddToBasket,
  CatalogCard,
  FormatList,
  SaveCart,
  SkeletonCatalogCard,
} from "@features/project";
import { Accordion } from "@shared/ui";

interface CartListProps {
  channels: IPlatform[];
  // setValue: UseFormSetValue<getCatalogReq>;
  onChangeCard: (cart: IPlatform) => void;
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
        <Accordion type="single" collapsible className={styles.cards}>
          {channels?.map((card) => (
            <CatalogCard
              page={pageFilter.cart}
              card={card}
              key={card.id}
              AddToBasketBtn={AddToBasket}
              FormatList={FormatList}
              onChangeCard={onChangeCard}
            />
          ))}
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.catalog }).map(
              (_, index) => <SkeletonCatalogCard key={index} />,
            )}
        </Accordion>
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
