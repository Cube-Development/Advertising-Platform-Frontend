import { FC, FormEvent, useState } from "react";
import { loginSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useHandleAuth } from "@features/useHandleAuth";
import { ToastAction, useToast } from "@shared/ui";
import { useGetUserMutation, useLoginMutation } from "@entities/user";
import { Loader } from "lucide-react";

interface Props {
  onNavigate: (form: loginSteps) => void;
}

export const LoginForm: FC<Props> = ({ onNavigate }) => {
  const { handleAuth } = useHandleAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [login, { isLoading }] = useLoginMutation();
  const [getUser, { isLoading: getUserLoading }] = useGetUserMutation();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (email.trim() === "") {
      setEmailError(t("auth.email_required"));
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(t("auth.email_invalid"));
    } else if (password.length < 3) {
      setPasswordError(t("auth.more_characters"));
    } else if (password.length > 50) {
      setPasswordError(t("auth.less_characters"));
    } else {
      setEmailError("");
      setPasswordError("");

      const loginReq = {
        username: email,
        password: password,
      };
      login(loginReq)
        .unwrap()
        .then(() => {
          getUser()
            .unwrap()
            .then((data) => {
              handleAuth(data.role, data.id);
            })
            .catch((error) => {
              console.error("Something gone wrong: ", error);
            });
        })
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.authorization.auth_error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
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
        />
        {emailError && <small>{emailError}</small>}
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

      <div className={styles.forgot__password}>
        <button type="button" onClick={() => onNavigate(loginSteps.forgot)}>
          {t("auth.forgot_password")}
        </button>
      </div>

      <button type="submit" className={styles.button__sign}>
        {isLoading || getUserLoading ? (
          <Loader
            className="animate-spin"
            stroke="#fff"
            width={20}
            height={20}
          />
        ) : (
          t("auth.sign_in")
        )}
      </button>
    </form>
  );
};
