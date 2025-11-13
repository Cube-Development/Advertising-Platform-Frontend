import { SquarePen } from "lucide-react";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export interface EditProjectProps {
  project_id: string;
}

export const EditProject: FC<EditProjectProps> = ({ project_id }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, project_id);
  };

  return (
    <Link to={ENUM_PATHS.CART} onClick={handleOnClick}>
      <MyButton className={styles.button} buttons_type="button__white">
        <SquarePen className="size-5 stroke-[1.5px]" />
        <p>{t("orders_manager.card.edit_btn")}</p>
      </MyButton>
    </Link>
  );
};
