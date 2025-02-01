import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { paths } from "@shared/routing";

export const useCurrentPathEnum = () => {
  const location = useLocation();

  return useMemo(() => {
    const currentPath = location.pathname;

    // Ищем соответствие в enum
    const matchedPath = Object.values(paths).find((path) => {
      // Учитываем динамические пути типа "/channel/:id"
      const pathRegex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
      return pathRegex.test(currentPath);
    });

    const finalPath = matchedPath ? `?from=${matchedPath}` : ``;

    return finalPath;
  }, [location.pathname]);
};
