import {
  useGetOrderPricesQuery,
  useGetPostsRereviewQuery,
  useGetProjectAmountQuery,
  useGetProjectNameQuery,
  useProjectOrdersQuery,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  projectId: string;
  role: ENUM_ROLES;
}

export const useCreateOrderLoad = ({ projectId, role }: Props) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const language = useFindLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // project name
  const projectNameReq = {
    project_id: projectId,
  };

  const { data: projectName, isLoading: isProjectNameLoading } =
    useGetProjectNameQuery(projectNameReq, { skip: !projectId || !isAuth });

  //   project channels
  const projectChannelsReq = {
    project_id: projectId,
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
  };

  const { data: projectChannels, isLoading: isOrdersLoading } =
    useProjectOrdersQuery(projectChannelsReq, {
      skip: !projectId || !isAuth,
    });

  //   project posts
  const projectPostsReq = {
    project_id: projectId!,
    page: 1,
  };

  const { data: projectPosts, isLoading: isPostsLoading } =
    useGetPostsRereviewQuery(projectPostsReq, {
      skip: !projectId || !isAuth,
    });

  // project prices if manager own project
  const { data: projectPrices, isLoading: isProjectPricesLoading } =
    useGetOrderPricesQuery(projectNameReq, {
      skip: !projectId || !isAuth || role !== ENUM_ROLES.MANAGER,
    });

  // total price
  const { data: totalPrice, isLoading: isTotalPriceLoading } =
    useGetProjectAmountQuery(projectNameReq, {
      skip: !projectId || !isAuth,
    });

  useEffect(() => {
    if (!isOrdersLoading && projectChannels?.orders?.length === 0) {
      toast({
        variant: "error",
        title: t("toasts.create_order.channels.error"),
      });
      navigate(ENUM_PATHS.CATALOG);
    }
  }, [projectChannels, isOrdersLoading]);

  return {
    projectName,
    isProjectNameLoading,
    projectChannels,
    isOrdersLoading,
    projectPosts,
    isPostsLoading,
    projectPrices,
    isProjectPricesLoading,
    totalPrice,
    isTotalPriceLoading,
  };
};
