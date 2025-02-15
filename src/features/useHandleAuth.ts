import { useTransferPublicMutation } from "@entities/project";
import { login, roles, toggleRole } from "@entities/user";
import { authApi, baseApi } from "@shared/api";
import { cookiesTypes } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export const useHandleAuth = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [transferPublic] = useTransferPublicMutation();

  const transferCart = async (id: string): Promise<void> => {
    try {
      await transferPublic({ guest_id: id }).unwrap();
      Cookies.remove(cookiesTypes.guestId);
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.auth.cart.error"),
      });
      console.error("Ошибка при трансфере корзины", error);
    }
  };

  const handleAuth = async (role: roles, user_id: string): Promise<void> => {
    try {
      dispatch(baseApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
      dispatch(login());
      dispatch(toggleRole(role));
      Cookies.set(cookiesTypes.userId, user_id);

      const guestId = Cookies.get(cookiesTypes.guestId);
      if (guestId) {
        await transferCart(guestId);
      }
    } catch (error) {
      console.error("Ошибка при обработке аутентификации", error);
    }
  };

  return { handleAuth };
};
