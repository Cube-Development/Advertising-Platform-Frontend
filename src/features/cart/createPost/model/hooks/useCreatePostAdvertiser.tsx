import { useCreateCartMutation } from "@entities/project";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useCreatePostAdvertiser = () => {
  const { t } = useTranslation();
  const [createCart, { isLoading }] = useCreateCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const createPostAdvertiser = async () => {
    if (isLoading) return;

    try {
      const data = await createCart().unwrap();
      Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, data.project_id);
      navigate(ENUM_PATHS.CREATE_ORDER);
    } catch (error) {
      console.error("Ошибка во время создания корзины", error);
      toast({
        variant: "error",
        title: t("toasts.cart.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  };

  return {
    createPostAdvertiser,
    isLoading,
  };
};
