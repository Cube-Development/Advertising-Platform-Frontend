import { useGoogleLogin } from "@features/google-auth";
import { ENUM_PATHS } from "@shared/routing";
import {
  CodeReceiveForm,
  ConfirmPasswordForm,
  ForgotPasswordForm,
  LoginForm,
  loginSteps,
} from "@widgets/authorization";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

/**
 * The real login flow, minus the page shell.
 *
 * The forms themselves carry almost no viewport breakpoints, so they render
 * correctly at any panel width. What we deliberately leave behind is the page:
 * `useClearCookiesOnPage()` (which mutates a cookie during render) and the
 * `.container` wrapper whose 70px side padding is keyed to the viewport.
 *
 * On success `useHandleAuth` signs the user in; this action is ONLY_PUBLIC, so
 * the registry drops it, the custom element disconnects and the plugin closes
 * the panel on its own.
 */
const AuthLoginAction = () => {
  const { t } = useTranslation();
  const { startGoogleLogin, isLoading: isGoogleLoading } = useGoogleLogin();
  const [step, setStep] = useState<loginSteps>(loginSteps.login);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <ActionShell
      title={t("chat_actions.auth_login.title", "Вход в аккаунт")}
      subtitle={t(
        "chat_actions.auth_login.subtitle",
        "Email и пароль или Google",
      )}
      cta={{
        to: ENUM_PATHS.REGISTRATION,
        label: t("auth.sign_up", "Регистрация"),
      }}
    >
      <div className="flex flex-col gap-4">
        {step === loginSteps.login && <LoginForm onNavigate={setStep} />}
        {step === loginSteps.forgot && (
          <ForgotPasswordForm
            onNavigate={setStep}
            email={email}
            setEmail={setEmail}
          />
        )}
        {step === loginSteps.code && (
          <CodeReceiveForm
            onNavigate={setStep}
            email={email}
            setCurrentCode={setCode}
          />
        )}
        {step === loginSteps.confirm && (
          <ConfirmPasswordForm
            onNavigate={setStep}
            email={email}
            currentCode={code}
          />
        )}

        {step === loginSteps.login && (
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

export default AuthLoginAction;
