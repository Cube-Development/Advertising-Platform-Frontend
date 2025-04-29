import { LoginIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

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
