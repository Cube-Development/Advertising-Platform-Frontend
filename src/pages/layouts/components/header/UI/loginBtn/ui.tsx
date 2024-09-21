import { FC } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { LoginIcon } from "@shared/assets";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export const LoginBtn: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Link to={paths.registration} className={styles.registrationBtn}>
        <MyButton>{t("registration")}</MyButton>
      </Link>
      <Link to={paths.login} className={styles.loginBtn}>
        <button>{t("login")}</button>
        <LoginIcon />
      </Link>
    </div>
  );
};
