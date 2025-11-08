import { ICart } from "@entities/project";
import { ENUM_PATHS } from "@shared/routing";
import { InfoTooltip, MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { ENUM_ROLES } from "@entities/user";

interface CatalogCartProps {
  cart: ICart;
  role: ENUM_ROLES;
}

export const CatalogCart: FC<CatalogCartProps> = ({ cart, role }) => {
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
        <div className={`${styles.info} ${styles.coast}`}>
          <p>{t("catalog.current_cart.cost")}:</p>
          <span>
            {role === ENUM_ROLES.MANAGER ? (
              <InfoTooltip
                text={t("catalog.current_cart.information")}
                className="!text-[var(--Personal-colors-white)]"
              />
            ) : (
              cart?.amount?.toLocaleString()
            )}
          </span>
        </div>
      </div>
      <div className={styles.cart}>
        <Link to={ENUM_PATHS.CART}>
          <MyButton buttons_type="button__green" className={styles.button}>
            <p>{t("catalog.current_cart.cart")}</p>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};
