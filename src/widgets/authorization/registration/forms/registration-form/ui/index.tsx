import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { registrationSteps } from "../../config";
import { roles, useLoginMutation, useRegisterMutation } from "@entities/user";
import { Languages } from "@shared/config";
import { useTranslation } from "react-i18next";
import { ToastAction, useToast } from "@shared/ui";
import { useHandleAuth } from "@features/useHandleAuth";

interface RegistrationFormProps {
  onNavigate: (direction: registrationSteps) => void;
  email: string;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  onNavigate,
  email,
}) => {
  const { handleAuth } = useHandleAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  // get_user запрос и user_id надо передать в handleAuth и там засетить в userSlice setUserId

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
      const req = {
        email: email,
        password: password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        role: roles.advertiser,
        language: language?.id || Languages[0].id,
      };
      register(req)
        .unwrap()
        .then((data) => {
          toast({
            variant: "success",
            title: t("auth.auth_success"),
          });
          const loginReq = {
            username: data?.email,
            password: password,
          };
          login(loginReq)
            .unwrap()
            .then(() => {
              // get_user запрос добавится
              handleAuth(roles.advertiser, "user_id");
            })
            .catch(() => {
              toast({
                variant: "error",
                title: t("auth.auth_error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
            });
        })
        .catch((error) => {
          if (error.status === 400) {
            toast({
              variant: "error",
              title: t("auth.accound_exist"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          } else {
            toast({
              variant: "error",
              title: t("auth.registration_error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          }
        });
    }
  };

  return (
    <>
      <button
        className={styles.back__btn}
        onClick={() => onNavigate(registrationSteps.email)}
      >
        <img src="/images/authorization/back.svg" alt="" />
        {t("auth.back_to_login")}
      </button>

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

        <div className={styles.news}>
          <input type="checkbox" name="agree" />
          {t("auth.subscribtion")}
        </div>

        <p className={styles.agreement}>
          {t("auth.by_clicking_sign_up")} <span>{t("auth.terms")}</span>{" "}
          {t("auth.and")} <span>{t("auth.privacy_policy")}</span>
        </p>

        <button type="submit" className={styles.button__sign}>
          {t("auth.sign_up")}
        </button>
      </form>
    </>
  );
};