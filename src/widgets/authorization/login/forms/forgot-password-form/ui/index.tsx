import { FC, FormEvent, useState } from "react";
import { loginSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface Props {
  onNavigate: (form: loginSteps) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const ForgotPasswordForm: FC<Props> = ({
  onNavigate,
  email,
  setEmail,
}) => {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") {
      setEmailError(t("auth.email_required"));
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(t("auth.email_invalid"));
    } else {
      setEmailError("");
      onNavigate(loginSteps.code);
    }
  };

  return (
    <>
      <button
        className={styles.back__btn}
        onClick={() => onNavigate(loginSteps.login)}
      >
        <img src="/images/authorization/back.svg" alt="" />
        {t("auth.back_to_login")}
      </button>
      <form onSubmit={handleSubmit}>
        <div className={styles.texts}>
          <p>{t("auth.forgot_password")}</p>
          <span>{t("auth.enter_email")}</span>
        </div>

        <div
          className={`${styles.input__container} ${emailError && styles.error}`}
        >
          <label>
            <span>{t("auth.email")}</span>
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small>{emailError}</small>}
        </div>

        <button type="submit" className={styles.button__sign}>
          {t("auth.continue")}
          <img src="/images/authorization/arrow.svg" alt="" />
        </button>
      </form>
    </>
  );
};
