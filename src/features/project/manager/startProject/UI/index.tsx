import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";

interface StartProjectProps {
  project_id: string;
}

export const StartProject: FC<StartProjectProps> = ({ project_id }) => {
  const { t } = useTranslation();
  const handleOnClick = () => {
    Cookies.set("project_id", project_id);
  };

  return (
    <Link to={paths.catalog} className={styles.wrapper} onClick={handleOnClick}>
      <MyButton className={styles.button}>
        <p>{t("orders_manager.card.start_btn")}</p>
        <ArrowLongHorizontalIcon className="default__icon__white" />
      </MyButton>
    </Link>
  );
};
