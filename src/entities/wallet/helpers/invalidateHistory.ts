import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { BALANCE, VIEWS_TRANSACTIONS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { walletAPI } from "../api";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof walletAPI.useLazyGetHistoryQuery>[0];
  language: ILanguage;
}

export const invalidateHistory = async ({
  dispatch,
  trigger,
  language,
}: Props) => {
  try {
    // 1. Получаем page=1
    const params = {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.HISTORY,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      date_sort: dateSortingTypes.decrease,
      __isWebsocket: true,
    };
    await trigger(params).unwrap();

    // 3. Обновляем кэш кружочков
    dispatch(walletAPI.util.invalidateTags([BALANCE, VIEWS_TRANSACTIONS]));
  } catch (err) {
    console.error("ERROR: INVALIDATE TRANSACTION HISTORY - ", err);
  }
};
