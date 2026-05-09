import { GenerateGuestId } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { ENUM_PATHS } from "@shared/routing";
import {
  QueryParams,
  QueryParamsUUID,
  buildPathWithQuery,
  queryParamKeys,
} from "@shared/utils";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { validate as isValidUUID } from "uuid";

export const useChannelParams = () => {
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID);
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) || GenerateGuestId();
  const projectId = QueryParamsUUID(queryParamKeys.saveProject);
  const { id: channel_id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const params = QueryParams();

  useEffect(() => {
    if (params.save_project && !isValidUUID(params.save_project)) {
      const { save_project, ...otherParams } = params;
      const path = channel_id
        ? generatePath(ENUM_PATHS.CHANNEL, { id: channel_id })
        : window.location.pathname;
      const newPath = buildPathWithQuery(path, otherParams);
      navigate(newPath, { replace: true });
    }
  }, [params.save_project, navigate, channel_id]);

  return { userId, guestId, projectId, channel_id };
};
