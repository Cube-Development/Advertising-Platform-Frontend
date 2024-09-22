import { FC, FormEvent, useState } from "react";
import { registrationSteps } from "../../config";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface CodeFormProps {
  onNavigate: (direction: registrationSteps) => void;
}

export const CodeForm: FC<CodeFormProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const userCode = "1111"; // Example user code for validation

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (code.trim() === "") {
      setCodeError(t("auth.email_required"));
    } else if (code.trim() !== userCode) {
      setCodeError(t("auth.email_invalid"));
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
          <span>{t("auth.code_send_to_email")}</span>
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
            placeholder="31241231MMSASD"
          />
          {codeError && <small>{codeError}</small>}
          <p className={styles.code__resend}>
            {t("auth.didnt_receive_code")} <span>{t("auth.resend")}</span>{" "}
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
