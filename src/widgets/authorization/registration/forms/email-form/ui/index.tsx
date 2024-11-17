import { FC, useState } from "react";
import { registrationSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface EmailFormProps {
  onNavigate: (direction: registrationSteps) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const EmailForm: FC<EmailFormProps> = ({
  onNavigate,
  email,
  setEmail,
}) => {
  const { t } = useTranslation();

  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError(t("auth.email_required"));
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(t("auth.email_invalid"));
    } else {
      setEmailError("");
      onNavigate(registrationSteps.code);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          placeholder="Sample@gmail.com"
        />
        {emailError && <small>{emailError}</small>}
      </div>

      <button type="submit" className={styles.button_sign}>
        {t("auth.sign_up_registration")}
      </button>
    </form>
  );
};
