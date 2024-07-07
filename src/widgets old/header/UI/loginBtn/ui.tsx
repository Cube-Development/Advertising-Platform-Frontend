import { FC } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { LoginIcon } from "@shared/assets";
import { AuthStateGenerator } from "@features/authStateGenerator";

export const LoginBtn: FC = () => {
  const { t } = useTranslation();

  const handleRegistrationClick = () => {
    const { registrationLink } = AuthStateGenerator();
    window.location.href = registrationLink;
  };

  const handleLoginClick = () => {
    const { loginLink } = AuthStateGenerator();
    window.location.href = loginLink;
  };

  return (
    <div className={styles.wrapper}>
      <a className={styles.registrationBtn} onClick={handleRegistrationClick}>
        <MyButton>{t("registration")}</MyButton>
      </a>
      <a className={styles.loginBtn} onClick={handleLoginClick}>
        <button>{t("login")}</button>
        <LoginIcon />
      </a>
    </div>
  );
};
