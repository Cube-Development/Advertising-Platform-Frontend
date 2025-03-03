import { useResetPasswordMutation } from "@entities/user";
import { useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { loginSteps } from "../../config";
import styles from "./styles.module.scss";

interface ConfirmPasswordFormProps {
  onNavigate: (direction: loginSteps) => void;
  email: string;
  currentCode: string;
}

export const ConfirmPasswordForm: FC<ConfirmPasswordFormProps> = ({
  onNavigate,
  email,
  currentCode,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordError("");
    setConfirmPasswordError("");

    if (password.trim() === "" || confirmPassword.trim() === "") {
      if (password.trim() === "") {
        setPasswordError(t("auth.password_required"));
      }
      if (confirmPassword.trim() === "") {
        setConfirmPasswordError(t("auth.confirm_password_required"));
      }
    } else if (password.length < 3) {
      setPasswordError(t("auth.more_characters"));
    } else if (password.length > 15) {
      setPasswordError(t("auth.less_characters"));
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t("auth.passwords_dont_match"));
    } else {
      console.log("Passwords match! Proceed to next step.");
      !isLoading &&
        resetPassword({
          email,
          code: Number(currentCode),
          password: password,
        })
          .unwrap()
          .then(() => {
            onNavigate(loginSteps.login);
            toast({
              variant: "success",
              title: t("toasts.forgot_password.password_changed"),
            });
          })
          .catch((error) => {
            if (error.status === 423) {
              onNavigate(loginSteps.login);
              toast({
                variant: "error",
                title: t("toasts.forgot_password.wrong_code"),
              });
            } else {
              onNavigate(loginSteps.login);
              toast({
                variant: "error",
                title: t("toasts.forgot_password.other_error"),
              });
            }
          });
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

      <div className={styles.texts}>
        <p>{t("auth.set_new_password")}</p>
        <span>{t("auth.previous_reseted")}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <label>
            <span>{t("auth.email")}</span>
          </label>
          <input type="text" name="email" value={email} readOnly />
        </div>

        <div
          className={`${styles.input__container} ${passwordError && styles.error}`}
        >
          <label>
            <span>{t("auth.password")}</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <small>{passwordError}</small>}
        </div>

        <div
          className={`${styles.input__container} ${confirmPasswordError && styles.error}`}
        >
          <label>
            <span>{t("auth.confirm_password")}</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <small>{confirmPasswordError}</small>}
        </div>
        <button type="submit" className={styles.button__sign}>
          {isLoading ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={20}
              height={20}
            />
          ) : (
            t("auth.set_password")
          )}
        </button>
      </form>
    </>
  );
};
