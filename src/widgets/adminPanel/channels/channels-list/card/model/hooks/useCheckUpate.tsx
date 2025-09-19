import { IAdminEditChannelData } from "@entities/admin-panel";
import { isEqual } from "lodash";
import { useMemo } from "react";

export const useCheckUpdate = (
  newData: IAdminEditChannelData,
  oldData: IAdminEditChannelData | undefined,
) => {
  console.log("useCheckUpdate", newData, oldData);
  const isUpdate = useMemo(() => {
    return !isEqual(newData, oldData);
  }, [newData, oldData]);

  return {
    isUpdate,
  };
};
