import {
  ENUM_ROLES,
  USER_ROLES,
  useLazyGoogleAuthorizeQuery,
} from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useGoogleLogin = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);
  const [googleAuthorize, { isLoading }] = useLazyGoogleAuthorizeQuery();

  const authRole = USER_ROLES.includes(role) ? role : ENUM_ROLES.ADVERTISER;

  const startGoogleLogin = async () => {
    if (isLoading) return;

    try {
      const { authorization_url } = await googleAuthorize({
        role: authRole,
      }).unwrap();
      window.location.href = authorization_url;
    } catch {
      toast({
        variant: "error",
        title: t("toasts.authorization.auth_error"),
      });
    }
  };

  return { startGoogleLogin, isLoading };
};
