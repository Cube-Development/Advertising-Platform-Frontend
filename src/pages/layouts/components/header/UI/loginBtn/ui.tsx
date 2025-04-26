import { FC } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { LoginIcon } from "@shared/assets";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

export const LoginBtn: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Link to={ENUM_PATHS.REGISTRATION} className={styles.registrationBtn}>
        <MyButton>{t("registration")}</MyButton>
      </Link>
      <Link to={ENUM_PATHS.LOGIN} className={styles.loginBtn}>
        <button>{t("login")}</button>
        <LoginIcon />
      </Link>
    </div>
  );
};
