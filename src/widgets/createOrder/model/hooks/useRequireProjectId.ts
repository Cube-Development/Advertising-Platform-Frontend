import { ENUM_PATHS } from "@shared/routing";
import {
  QueryParamsUUID,
  buildPathWithQuery,
  queryParamKeys,
} from "@shared/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireProjectId = () => {
  const navigate = useNavigate();
  const projectId = QueryParamsUUID(queryParamKeys.projectId);

  useEffect(() => {
    if (!projectId) {
      const newPath = buildPathWithQuery(ENUM_PATHS.CART, {});
      navigate(newPath, { replace: true });
    }
  }, [projectId, navigate]);

  return { projectId };
};
