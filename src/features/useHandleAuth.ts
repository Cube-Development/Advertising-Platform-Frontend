import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useToast } from "@shared/ui";
import { login, roles, setUserId, toggleRole } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { useTransferPublicMutation } from "@entities/project";
import { paths } from "@shared/routing";

export const useHandleAuth = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [transferPublic] = useTransferPublicMutation();

  const transferCart = async (id: string): Promise<void> => {
    try {
      await transferPublic({ guest_id: id }).unwrap();
      Cookies.remove("guest_id");
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
      dispatch(login());
      navigate(role === roles.advertiser ? paths.main : paths.mainBlogger);
      dispatch(toggleRole(role));
      dispatch(setUserId(user_id));

      const guestId = Cookies.get("guest_id");
      if (guestId) {
        await transferCart(guestId);
      }
    } catch (error) {
      console.error("Ошибка при обработке аутентификации", error);
    }
  };

  return { handleAuth };
};
