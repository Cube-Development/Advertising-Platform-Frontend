import {
  IRegister,
  roles,
  useFindLanguage,
  useGetUserMutation,
  useLoginMutation,
  useRegisterMutation,
  userRoles,
} from "@entities/user";
import { useHandleAuth } from "@features/useHandleAuth";
import { Languages } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { CustomCheckbox, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { registrationSteps } from "../../config";
import styles from "./styles.module.scss";

interface RegistrationFormProps {
  onNavigate: (direction: registrationSteps) => void;
  email: string;
  code: string;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  onNavigate,
  email,
  code,
}) => {
  const { handleAuth } = useHandleAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { user } = useAppSelector((state) => state);

  const [password, setPassword] = useState("");
  const [promo, setPromo] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [getUser, { isLoading: getUserLoading }] = useGetUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerLoading) return;

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
      const req: IRegister = {
        email: email,
        password: password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        role: userRoles.includes(user.role) ? user.role : roles.advertiser,
        language: language?.id || Languages[0].id,
        code: Number(code),
        promo: promo,
      };
      register(req)
        .unwrap()
        .then((data) => {
          toast({
            variant: "success",
            title: t("toasts.authorization.auth_success"),
          });
          const loginReq = {
            username: data?.email,
            password: password,
          };
          login(loginReq)
            .unwrap()
            .then(() => {
              {
                getUser()
                  .unwrap()
                  .then((data) => {
                    handleAuth(data.role, data.id);
                  })
                  .catch((error) => {
                    console.error("Something gone wrong: ", error);
                  });
              }
            })
            .catch(() => {
              toast({
                variant: "error",
                title: t("toasts.authorization.auth_error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
            });
        })
        .catch((error) => {
          if (error.status === 400) {
            toast({
              variant: "error",
              title: t("toasts.authorization.account_exist"),
              action: <ToastAction altText="Ok">OK</ToastAction>,
            });
          } else if (error.status === 423) {
            toast({
              variant: "error",
              title: t("toasts.registration.wrong_code"),
              action: <ToastAction altText="Ok">OK</ToastAction>,
            });
          } else {
            toast({
              variant: "error",
              title: t("toasts.authorization.registration_error"),
              action: <ToastAction altText="Ok">OK</ToastAction>,
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
          {/* <input
            type="checkbox"
            name="agree"
            checked={promo}
            onChange={() => setPromo((prev) => !prev)}
          /> */}
          <CustomCheckbox
            isSelected={promo}
            handleChange={() => setPromo((prev) => !prev)}
          />
          {t("auth.subscribtion")}
        </div>

        <p className={styles.agreement}>
          {t("auth.by_clicking_sign_up")}{" "}
          <Link target="_blank" to={paths.serviceRules}>
            {t("auth.terms")}
          </Link>{" "}
          {t("auth.and")}{" "}
          <Link target="_blank" to={paths.publicOffer}>
            {t("auth.privacy_policy")}
          </Link>
        </p>

        <button type="submit" className={styles.button__sign}>
          {registerLoading || loginLoading || getUserLoading ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={20}
              height={20}
            />
          ) : (
            t("auth.sign_up_registration")
          )}
        </button>
      </form>
    </>
  );
};
