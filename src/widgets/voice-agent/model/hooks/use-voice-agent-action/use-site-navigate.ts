import { ENUM_PATHS } from "@shared/routing";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useSiteNavigate(): {
  handleNavigate: (path: ENUM_PATHS) => Promise<void>;
} {
  const navigate = useNavigate();

  const handleNavigate = useCallback(async (path: ENUM_PATHS) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  }, []);

  return { handleNavigate };
}
