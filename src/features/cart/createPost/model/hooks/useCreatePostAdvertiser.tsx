import {
  useCreateCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useCreatePostAdvertiser = () => {
  const { t } = useTranslation();
  const [createCart, { isLoading: isLoadingCreate }] = useCreateCartMutation();
  const [createProjectCart, { isLoading: isLoadingCreateProject }] =
    useCreateProjectCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
  const language = useFindLanguage();
  const createPostAdvertiser = async () => {
    if (isLoadingCreate || isLoadingCreateProject) return;

    try {
      // saved project flow
      if (projectId) {
        await createProjectCart({
          project_id: projectId,
          language: language?.id || USER_LANGUAGES_LIST[0].id,
        }).unwrap();
      } else {
        const data = await createCart().unwrap();
        Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, data.project_id);
      }

      navigate(ENUM_PATHS.CREATE_ORDER);
    } catch (error) {
      console.error("Ошибка во время создания корзины", error);
      toast({
        variant: "error",
        title: t("toasts.cart.error"),
      });
    }
  };

  return {
    createPostAdvertiser,
    isLoading: isLoadingCreate || isLoadingCreateProject,
  };
};
