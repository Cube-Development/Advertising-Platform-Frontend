import { FC, FormEvent, useState } from "react";
import { loginSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useGetCodeForForgotPasswordMutation } from "@entities/user";

interface Props {
  onNavigate: (form: loginSteps) => void;
  email: string;
  setCurrentCode: (code: string) => void;
}

export const CodeReceiveForm: FC<Props> = ({
  onNavigate,
  email,
  setCurrentCode,
}) => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const [getCodeForForgotPassword] = useGetCodeForForgotPasswordMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (code.trim() === "") {
      setCodeError(t("auth.code_required"));
    } else if (code.length !== 6) {
      setCodeError(t("auth.code_invalid"));
    } else {
      setCodeError("");
      setCurrentCode(code);
      onNavigate(loginSteps.confirm);
    }
  };

  const resendCode = () => {
    getCodeForForgotPassword({ email });
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
          <p>{t("auth.verify_code")}</p>
          <span>
            {t("auth.code_send_to_email")}: {email}
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
          {t("auth.continue")}
          <img src="/images/authorization/arrow.svg" alt="" />
        </button>
      </form>
    </>
  );
};
