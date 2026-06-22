import { useGoogleAuthCallback } from "@features/google-auth";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const OAuthCallbackPage: FC = () => {
  useGoogleAuthCallback();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <Loader className="animate-spin" width={32} height={32} />
      <p>{t("auth.oauth_callback_loading")}</p>
    </div>
  );
};
