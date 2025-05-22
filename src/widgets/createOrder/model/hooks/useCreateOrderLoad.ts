import {
  useGetPostsRereviewQuery,
  useGetProjectAmountQuery,
  useGetProjectNameQuery,
  useProjectOrdersQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  projectId: string;
}

export const useCreateOrderLoad = ({ projectId }: Props) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const language = useFindLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // total price
  const { data: totalPrice, isLoading: isTotalPriceLoading } =
    useGetProjectAmountQuery(projectNameReq, {
      skip: !projectId || !isAuth,
    });

  useEffect(() => {
    if (!isOrdersLoading && projectChannels?.orders?.length === 0) {
      toast({
        variant: "error",
        title: "Сначала нужно добавить каналы в корзину",
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
    totalPrice,
    isTotalPriceLoading,
  };
};
