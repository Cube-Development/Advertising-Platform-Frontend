import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const SeeOffers: FC = () => {
  const { t } = useTranslation();
  return (
    <Link to={paths.offers} className="h-full">
      <MyButton
        buttons_type="button__blue"
        className={`${styles.button} truncate h-full`}
      >
        {t(`platform_btn.offer`)}
        <div>
          <ArrowLongHorizontalIcon className="icon__white" />
        </div>
      </MyButton>
    </Link>
  );
};
