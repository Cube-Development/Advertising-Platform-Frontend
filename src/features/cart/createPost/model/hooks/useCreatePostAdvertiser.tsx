import {
  useCreateCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  buildPathWithQuery,
  QueryParamsUUID,
  queryParamKeys,
} from "@shared/utils";

export const useCreatePostAdvertiser = () => {
  const { t } = useTranslation();
  const [createCart, { isLoading: isLoadingCreate }] = useCreateCartMutation();
  const [createProjectCart, { isLoading: isLoadingCreateProject }] =
    useCreateProjectCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const projectId = QueryParamsUUID(queryParamKeys.saveProject);
  const language = useFindLanguage();
  const createPostAdvertiser = async () => {
    if (isLoadingCreate || isLoadingCreateProject) return;

    try {
      let finalProjectId = projectId;
      // saved project flow
      if (projectId) {
        await createProjectCart({
          project_id: projectId,
          language: language?.id || USER_LANGUAGES_LIST[0].id,
        }).unwrap();
      } else {
        const data = await createCart().unwrap();
        finalProjectId = data.project_id;
      }

      navigate(
        buildPathWithQuery(ENUM_PATHS.CREATE_ORDER, {
          project_id: finalProjectId,
        }),
      );
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
