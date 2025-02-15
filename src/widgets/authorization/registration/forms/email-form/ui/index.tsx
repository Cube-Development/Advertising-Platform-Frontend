import { FC, useState } from "react";
import { registrationSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useGetCodeForRegistrationMutation } from "@entities/user";
import { useToast } from "@shared/ui";

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
  const { toast } = useToast();

  const [emailError, setEmailError] = useState("");

  const [getCodeForRegistration, { isLoading }] =
    useGetCodeForRegistrationMutation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (email.trim() === "") {
      setEmailError(t("auth.email_required"));
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(t("auth.email_invalid"));
    } else {
      setEmailError("");
      onNavigate(registrationSteps.code);
      getCodeForRegistration({ email })
        .unwrap()
        .then(() => {
          onNavigate(registrationSteps.code);
        })
        .catch((error) => {
          if (error.status === 423) {
            toast({
              variant: "error",
              title: t("toasts.registration.email_verify.email_exists"),
            });
          } else {
            toast({
              variant: "error",
              title: t("toasts.registration.email_verify.other_error"),
            });
          }
        });
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
