import { useGoogleLogin } from "@features/google-auth";
import { ENUM_PATHS } from "@shared/routing";
import {
  CodeForm,
  EmailForm,
  RegistrationForm,
  RegistrationRoleSwitcher,
  registrationSteps,
} from "@widgets/authorization";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

/** The real registration flow, minus the page shell. See auth-login-action. */
const AuthRegisterAction = () => {
  const { t } = useTranslation();
  const { startGoogleLogin, isLoading: isGoogleLoading } = useGoogleLogin();
  const [step, setStep] = useState<registrationSteps>(registrationSteps.email);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <ActionShell
      title={t("chat_actions.auth_register.title", "Регистрация")}
      subtitle={t(
        "chat_actions.auth_register.subtitle",
        "Выберите роль и создайте аккаунт",
      )}
      cta={{ to: ENUM_PATHS.LOGIN, label: t("auth.sign_in", "Войти") }}
    >
      <div className="flex flex-col gap-4">
        {step === registrationSteps.email && (
          <>
            <RegistrationRoleSwitcher />
            <EmailForm onNavigate={setStep} email={email} setEmail={setEmail} />
          </>
        )}
        {step === registrationSteps.code && (
          <CodeForm
            onNavigate={setStep}
            email={email}
            code={code}
            setCode={setCode}
          />
        )}
        {step === registrationSteps.registration && (
          <RegistrationForm onNavigate={setStep} email={email} code={code} />
        )}

        {step === registrationSteps.email && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-500">{t("auth.login_with")}</p>
            <button
              type="button"
              onClick={startGoogleLogin}
              disabled={isGoogleLoading}
              aria-label={t("auth.login_with_google")}
              className="flex size-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:border-blue-600 disabled:opacity-60"
            >
              {isGoogleLoading ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                <img
                  src="/images/authorization/google.svg"
                  alt="Google"
                  className="size-5"
                />
              )}
            </button>
          </div>
        )}
      </div>
    </ActionShell>
  );
};

export default AuthRegisterAction;
