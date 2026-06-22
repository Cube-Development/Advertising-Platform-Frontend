import { useGoogleLogin } from "@features/google-auth";
import { useClearCookiesOnPage } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  CodeForm,
  EmailForm,
  RegistrationForm,
  registrationSteps,
} from "@widgets/authorization";
import { Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

export const RegistrationPage: FC = () => {
  useClearCookiesOnPage();
  const { startGoogleLogin, isLoading: isGoogleLoading } = useGoogleLogin();
  const { t } = useTranslation();
  const [currentForm, setCurrentForm] = useState<registrationSteps>(
    registrationSteps.email,
  );

  const navigateForms = (direction: registrationSteps) => {
    setCurrentForm(direction);
  };

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const location = useLocation();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {currentForm === registrationSteps.email && (
          <EmailForm
            onNavigate={navigateForms}
            email={email}
            setEmail={(email: string) => setEmail(email)}
          />
        )}
        {currentForm === registrationSteps.code && (
          <CodeForm
            onNavigate={navigateForms}
            email={email}
            code={code}
            setCode={setCode}
          />
        )}
        {currentForm === registrationSteps.registration && (
          <RegistrationForm
            onNavigate={navigateForms}
            email={email}
            code={code}
          />
        )}
        {currentForm !== registrationSteps.registration && (
          <>
            <p className={styles.account}>
              {t("auth.have_account")}
              <span>
                <Link to={`${ENUM_PATHS.LOGIN}${location.search}`}>
                  {t("auth.sign_in")}
                </Link>
              </span>
            </p>

            {currentForm === registrationSteps.email && (
              <>
                <div className={styles.login__with}>
                  <p className={`${styles.login__with__title} truncate`}>
                    {t("auth.login_with")}
                  </p>
                </div>
                <div className={styles.signin}>
                  <div className={styles.signin__container}>
                    <button
                      type="button"
                      className={styles.button__login}
                      onClick={startGoogleLogin}
                      disabled={isGoogleLoading}
                      aria-label={t("auth.login_with_google")}
                    >
                      {isGoogleLoading ? (
                        <Loader className="animate-spin" width={20} height={20} />
                      ) : (
                        <img
                          src="/images/authorization/google.svg"
                          alt="Google"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};
