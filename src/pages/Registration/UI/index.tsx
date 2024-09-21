import {
  CodeForm,
  EmailForm,
  RegistrationForm,
  registrationSteps,
} from "@widgets/authorization";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { paths } from "@shared/routing";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RegistrationPage: FC = () => {
  const { t } = useTranslation();
  const [currentForm, setCurrentForm] = useState<registrationSteps>(
    registrationSteps.email,
  );

  const navigateForms = (direction: registrationSteps) => {
    setCurrentForm(direction);
  };

  const [email, setEmail] = useState("");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src="/images/authorization/logo.svg"
          alt="Logo"
          className={styles.logo}
        />
        {currentForm === registrationSteps.email && (
          <EmailForm
            onNavigate={navigateForms}
            email={email}
            setEmail={(email: string) => setEmail(email)}
          />
        )}
        {currentForm === registrationSteps.code && (
          <CodeForm onNavigate={navigateForms} />
        )}
        {currentForm === registrationSteps.registration && (
          <RegistrationForm onNavigate={navigateForms} email={email} />
        )}
        <p className={styles.account}>
          {t("auth.have_account")}
          <span>
            <Link to={paths.login}>{t("sign_in")}</Link>
          </span>
        </p>

        <div className={styles.login__with}>
          <p className={styles.login__with__title}>{t("auth.login_with")}</p>
        </div>
        <div className={styles.signin}>
          <div className={styles.signin__container}>
            <button type="button" className={styles.button__login}>
              <img src="/images/authorization/facebook.svg" alt="" />
            </button>
            <button type="button" className={styles.button__login}>
              <img src="/images/authorization/google.svg" alt="" />
            </button>
            <button type="button" className={styles.button__login}>
              <img src="/images/authorization/apple.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
