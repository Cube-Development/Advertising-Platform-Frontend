import { ICart } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { InfoTooltip, MyButton, Skeleton } from "@shared/ui";
import {
  buildPathWithQuery,
  queryParamKeys,
  QueryParamsUUID
} from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface CatalogCartProps {
  cart: ICart;
  role: ENUM_ROLES;
  isFetching: boolean;
}

export const CatalogCart: FC<CatalogCartProps> = ({
  cart,
  role,
  isFetching,
}) => {
  const { t } = useTranslation();
  const saveProjectId = QueryParamsUUID(queryParamKeys.saveProject);

  const cartPath = saveProjectId
    ? buildPathWithQuery(ENUM_PATHS.CART, {
        [queryParamKeys.saveProject]: saveProjectId,
      })
    : ENUM_PATHS.CART;

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.info}>
          <p>{t("catalog.current_cart.channels")}:</p>
          {isFetching ? (
            <Skeleton className="mx-5 h-[22px]" />
          ) : (
            <span>{cart?.count?.toLocaleString()}</span>
          )}
        </div>
        <div className={`${styles.info} ${styles.views}`}>
          <p>{t("catalog.current_cart.views")}:</p>
          {isFetching ? (
            <Skeleton className="mx-5 h-[22px]" />
          ) : (
            <span>{cart?.coverage?.toLocaleString()}</span>
          )}
        </div>
        <div className={`${styles.info} ${styles.coast}`}>
          <p>{t("catalog.current_cart.cost")}:</p>
          {isFetching ? (
            <Skeleton className="mx-5 h-[22px]" />
          ) : (
            <span>
              {role === ENUM_ROLES.AGENCY ? (
                <InfoTooltip
                  text={t("catalog.current_cart.information")}
                  className="!text-[var(--Personal-colors-white)]"
                />
              ) : (
                cart?.amount?.toLocaleString()
              )}
            </span>
          )}
        </div>
      </div>
      <div className={styles.cart}>
        <Link to={cartPath}>
          <MyButton buttons_type="button__green" className={styles.button}>
            <p>{t("catalog.current_cart.cart")}</p>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};
