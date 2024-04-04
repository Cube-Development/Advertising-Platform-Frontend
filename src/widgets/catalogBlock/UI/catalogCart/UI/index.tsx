import { paths } from "@shared/routing";
import { IToCart } from "@shared/types/platform";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface CatalogCartProps {
  currentCart: IToCart[];
}

export const CatalogCart: FC<CatalogCartProps> = ({ currentCart }) => {
  const { t } = useTranslation();

  const channels = currentCart.length;
  const { views, cost } = currentCart.reduce(
    (totals, channel) => {
      totals.views += channel.format.views;
      totals.cost += channel.format.price;
      return totals;
    },
    { views: 0, cost: 0 },
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.channels")}</p>
        <span>{channels}</span>
      </div>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.views")}</p>
        <span>{views}</span>
      </div>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.cost")}</p>
        <span>{cost}</span>
      </div>
      <div className={styles.cart}>
        <Link to={paths.cart}>
          <MyButton>
            <p>{t("catalog.current_cart.cart")}</p>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};
