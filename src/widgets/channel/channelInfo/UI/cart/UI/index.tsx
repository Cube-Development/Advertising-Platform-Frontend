import { ICart } from "@entities/project";
import { ENUM_PATHS } from "@shared/routing";
import { InfoTooltip, MyButton, Skeleton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { ENUM_ROLES } from "@entities/user";

interface ChannelCartProps {
  cart: ICart;
  role: ENUM_ROLES;
  isLoading: boolean;
}

export const ChannelCart: FC<ChannelCartProps> = ({
  cart,
  role,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.channels")}:</p>
          {isLoading ? (
            <Skeleton className="h-[14px] w-10" />
          ) : (
            <span>{cart?.count?.toLocaleString()}</span>
          )}
        </div>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.views")}:</p>
          {isLoading ? (
            <Skeleton className="h-[14px] w-14" />
          ) : (
            <span>{cart?.coverage?.toLocaleString()}</span>
          )}
        </div>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.cost")}:</p>
          <span>
            {role === ENUM_ROLES.AGENCY ? (
              <InfoTooltip
                text={t("catalog.current_cart.information")}
                className="!text-[var(--Personal-colors-black)]"
              />
            ) : isLoading ? (
              <Skeleton className="h-[14px] w-20" />
            ) : (
              cart?.amount?.toLocaleString()
            )}
          </span>
        </div>
      </div>
      <Link to={ENUM_PATHS.CART} className={styles.link}>
        <MyButton buttons_type="button__green" className={styles.button}>
          <p>{t("catalog.current_cart.cart")}</p>
        </MyButton>
      </Link>
    </div>
  );
};
