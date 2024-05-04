import { paths } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { ICart } from "@shared/types/cart";

interface CatalogCartProps {
  cart: ICart;
}

export const CatalogCart: FC<CatalogCartProps> = ({ cart }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.channels")}</p>
        <span>{cart?.count?.toLocaleString()}</span>
      </div>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.views")}</p>
        <span>{cart?.coverage?.toLocaleString()}</span>
      </div>
      <div className={styles.info}>
        <p>{t("catalog.current_cart.cost")}</p>
        <span>{cart?.amount?.toLocaleString()}</span>
      </div>
      <div className={styles.cart}>
        <Link to={paths.cart}>
          <MyButton className={styles.button}>
            <p>{t("catalog.current_cart.cart")}</p>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};
