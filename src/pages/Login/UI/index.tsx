import {
  CodeReceiveForm,
  ConfirmPasswordForm,
  ForgotPasswordForm,
  LoginForm,
  loginSteps,
} from "@widgets/authorization";
import { FC } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [currentForm, setCurrentForm] = useState<loginSteps>(loginSteps.login);

  const navigateForms = (form: loginSteps) => {
    setCurrentForm(form);
  };

  const [email, setEmail] = useState("");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {currentForm === loginSteps.login && (
          <LoginForm onNavigate={navigateForms} />
        )}
        {currentForm === loginSteps.forgot && (
          <ForgotPasswordForm
            onNavigate={navigateForms}
            email={email}
            setEmail={(email: string) => setEmail(email)}
          />
        )}
        {currentForm === loginSteps.code && (
          <CodeReceiveForm onNavigate={navigateForms} />
        )}
        {currentForm === loginSteps.confirm && (
          <ConfirmPasswordForm onNavigate={navigateForms} email={email} />
        )}
        {currentForm !== loginSteps.confirm && (
          <>
            <p className={styles.account}>
              {t("auth.dont_have_account")}
              <span>
                <Link to={paths.registration}>{t("auth.sign_up")}</Link>
              </span>
            </p>
            <div className={styles.login__with}>
              <p className={`${styles.login__with__title} truncate`}>
                {t("auth.login_with")}
              </p>
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
          </>
        )}
      </div>
    </section>
  );
};
