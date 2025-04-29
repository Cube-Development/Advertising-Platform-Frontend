import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface StartAdvProps {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const StartAdv: FC<StartAdvProps> = ({ props }) => {
  const { t } = useTranslation();

  return (
    <Link to={ENUM_PATHS.CATALOG}>
      <MyButton {...props}>{t(`btn_start_adv`)}</MyButton>
    </Link>
  );
};
