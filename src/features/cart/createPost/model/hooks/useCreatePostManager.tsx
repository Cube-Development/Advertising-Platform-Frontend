import {
  cartStatusFilter,
  useCheckCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { buildPathWithQuery, queryParamKeys, QueryParamsUUID } from "@shared/utils";
import Cookies from "js-cookie";
import { ENUM_COOKIES_TYPES } from "@shared/config";

export const useCreatePostManager = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { role } = useAppSelector((state) => state.user);
  const [createProjectCart, { isLoading: isLoadingCreate }] =
    useCreateProjectCartMutation();
  const [checkProjectCart, { isLoading: isLoadingCheck }] =
    useCheckCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const projectId = QueryParamsUUID(queryParamKeys.saveProject);

  const createPostManager = async () => {
    if (isLoadingCreate || isLoadingCheck) return;

    try {
      await createProjectCart({
        project_id: projectId,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
      }).unwrap();

      if (role === ENUM_ROLES.AGENCY) {
        navigate(buildPathWithQuery(ENUM_PATHS.CREATE_ORDER, { project_id: projectId }));
        return;
      }

      const data = await checkProjectCart({
        project_id: projectId,
      }).unwrap();

      let message = "";

      if (data.state === cartStatusFilter.success) {
        navigate(buildPathWithQuery(ENUM_PATHS.CREATE_ORDER, { project_id: projectId }));
        return;
      } else if (data.state === cartStatusFilter.channel_to_be_replaced) {
        Cookies.set(ENUM_COOKIES_TYPES.IS_CHANNEL_REPLACED, "true");
        navigate(buildPathWithQuery(ENUM_PATHS.CREATE_ORDER, { project_id: projectId }));
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
        });
      }

      return;
    } catch (error) {
      console.error("Ошибка во время создания корзины", error);
      toast({
        variant: "error",
        title: t("toasts.cart.error"),
      });
    }
  };
  return {
    createPostManager,
    isLoading: isLoadingCreate || isLoadingCheck,
  };
};
