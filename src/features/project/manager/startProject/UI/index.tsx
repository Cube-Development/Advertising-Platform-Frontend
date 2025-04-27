import { ArrowLongHorizontalIcon } from "@shared/assets";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface StartProjectProps {
  project_id: string;
}

export const StartProject: FC<StartProjectProps> = ({ project_id }) => {
  const { t } = useTranslation();
  const handleOnClick = () => {
    Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, project_id);
  };

  return (
    <Link
      to={ENUM_PATHS.CATALOG}
      className={styles.wrapper}
      onClick={handleOnClick}
    >
      <MyButton className={styles.button}>
        <p>{t("orders_manager.card.start_btn")}</p>
        <ArrowLongHorizontalIcon className="icon__white" />
      </MyButton>
    </Link>
  );
};
