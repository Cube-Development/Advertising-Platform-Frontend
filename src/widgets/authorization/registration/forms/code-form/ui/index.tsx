import { FC, FormEvent, useState } from "react";
import { registrationSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useGetCodeForRegistrationMutation } from "@entities/user";
import { useToast } from "@shared/ui";

interface CodeFormProps {
  onNavigate: (direction: registrationSteps) => void;
  email: string;
  code: string;
  setCode: (code: string) => void;
}

export const CodeForm: FC<CodeFormProps> = ({
  onNavigate,
  email,
  code,
  setCode,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [getCodeForRegistration, { isLoading }] =
    useGetCodeForRegistrationMutation();

  const [codeError, setCodeError] = useState("");

  const resendCode = () => {
    !isLoading &&
      getCodeForRegistration({ email })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: `${t("toasts.registration.email_verify.resend_code_success")} ${email}`,
          });
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
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (code.trim() === "") {
      setCodeError(t("auth.email_required"));
    } else if (code.length !== 6) {
      setCodeError(t("auth.code_invalid"));
    } else {
      setCodeError("");
      onNavigate(registrationSteps.registration);
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
        <div className={styles.texts}>
          <p>{t("auth.verify_code")}</p>
          <span>
            {t("auth.code_send_to_email")} {email}
          </span>
        </div>
        <div
          className={`${styles.input__container} ${codeError && styles.error}`}
        >
          <label>
            <span>{t("auth.enter_code")}</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            name="code"
            placeholder="312412"
            maxLength={6}
          />
          {codeError && <small>{codeError}</small>}
          <p className={styles.code__resend}>
            {t("auth.didnt_receive_code")}{" "}
            <span onClick={resendCode}>{t("auth.resend")}</span>
          </p>
        </div>

        <button type="submit" className={styles.button__sign}>
          {t("auth.sign_up_registration")}
          <img src="/images/authorization/arrow.svg" alt="" />
        </button>
      </form>
    </>
  );
};
