import { paths } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { ICart } from "@entities/project";

interface CatalogCartProps {
  cart: ICart;
}

export const CatalogCart: FC<CatalogCartProps> = ({ cart }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.channels")}:</p>
          <span>{cart?.count?.toLocaleString()}</span>
        </div>
        <div className={`${styles.info} ${styles.views}`}>
          <p>{t("catalog.current_cart.views")}:</p>
          <span>{cart?.coverage?.toLocaleString()}</span>
        </div>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.cost")}:</p>
          <span>
            {cart?.amount?.toLocaleString()}{" "}
            <span className={styles.symbol}>{t("symbol")}</span>
          </span>
        </div>
      </div>
      <div className={styles.cart}>
        <Link to={paths.cart}>
          <MyButton buttons_type="button__green" className={styles.button}>
            <p>{t("catalog.current_cart.cart")}</p>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};
