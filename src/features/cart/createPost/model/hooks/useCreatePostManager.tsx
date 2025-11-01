import {
  cartStatusFilter,
  useCheckCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useCreatePostManager = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const [createProjectCart, { isLoading: isLoadingCreate }] =
    useCreateProjectCartMutation();
  const [checkProjectCart, { isLoading: isLoadingCheck }] =
    useCheckCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
  const isManagerProject = "true";

  const createPostManager = async () => {
    if (isLoadingCreate || isLoadingCheck) return;

    try {
      await createProjectCart({
        project_id: projectId,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      }).unwrap();

      if (isManagerProject === "true") {
        navigate(ENUM_PATHS.CREATE_ORDER);
        return;
      }

      const data = await checkProjectCart({
        project_id: projectId,
      }).unwrap();

      let message = "";

      if (data.state === cartStatusFilter.success) {
        navigate(ENUM_PATHS.CREATE_ORDER);
        return;
      } else if (data.state === cartStatusFilter.channel_to_be_replaced) {
        Cookies.set(ENUM_COOKIES_TYPES.IS_CHANNEL_REPLACED, "true");
        navigate(ENUM_PATHS.CREATE_ORDER);
        return;
      } else if (data.state === cartStatusFilter.amount) {
        message = t("cart.check.amount");
      } else if (data.state === cartStatusFilter.not_found) {
        message = t("cart.check.not_found");
      } else if (data.state === cartStatusFilter.no_data) {
        message = t("cart.check.no_data");
      }

      if (message) {
        toast({
          variant: "error",
          title: message,
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      }

      return;
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
    createPostManager,
    isLoading: isLoadingCreate || isLoadingCheck,
  };
};
