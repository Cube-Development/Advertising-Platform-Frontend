import { AppDispatch } from "@app/providers/store";
import { adminAPI, getAdminAccountingReq } from "@entities/admin/api";
import {
  ADMIN_ACCOUNTING_STATUS,
  ADMIN_ACCOUNTING_TYPE,
} from "@entities/admin/config";
import { IAdminAccounting } from "@entities/admin/types";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";

interface Props {
  dispatch: AppDispatch;
  //   wallet: ENUM_WALLETS_TYPE;
  //   type: ADMIN_ACCOUNTING_TYPE;
  //   date_sort: dateSortingTypes;
  //   status: ADMIN_ACCOUNTING_STATUS;
  id: string;
}

export const invalidateAccounting = async ({
  dispatch,
  //   wallet,
  //   type,
  //   date_sort,
  //   status,
  id,
}: Props) => {
  const baseParams = {
    //   wallet,
    //   type,
    // date_sort,
    // status,
  };

  dispatch(
    adminAPI.util.updateQueryData(
      "getAdminAccounting",
      baseParams as getAdminAccountingReq,
      (draft: IAdminAccounting) => {
        draft.items = draft.items.filter((el) => el.id !== id);
      },
    ),
  );
};
