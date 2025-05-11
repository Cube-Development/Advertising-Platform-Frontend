import { dateSortingTypes } from "@entities/platform";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { HistoryReq, walletAPI } from "../api";
import { AppDispatch } from "@app/providers/store";

interface Props {
  dispatch: AppDispatch;
  triggerHistory: ReturnType<typeof walletAPI.useLazyGetHistoryQuery>[0];
  language: ILanguage;
}

export const invalidateHistory = async ({
  dispatch,
  triggerHistory,
  language,
}: Props) => {
  try {
    // 1. Получаем page=1
    const elements = INTERSECTION_ELEMENTS.HISTORY;
    const params: HistoryReq = {
      page: 1,
      elements_on_page: elements,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      date_sort: dateSortingTypes.decrease,
    };
    const result = await triggerHistory(params).unwrap();

    // 2. Обновляем общий кэш, сравнивая первые N элементов
    dispatch(
      walletAPI.util.updateQueryData(
        "getHistory",
        {} as HistoryReq, // ключ кэша, т.к. serializeQueryArgs без page
        (draft) => {
          console.log("draft", draft.transactions);
          const existingIds = new Set(draft.transactions.map((tx) => tx.id));
          const toAdd = result.transactions.filter(
            (tx) => !existingIds.has(tx.id),
          );

          if (toAdd.length === 0) return;

          draft.transactions.unshift(...toAdd);

          // очистка дубликатов
          const seen = new Set<string>();
          draft.transactions = draft.transactions.filter((tx) => {
            if (seen.has(tx.id)) return false;
            seen.add(tx.id);
            return true;
          });
        },
      ),
    );
  } catch (err) {
    console.error("ERROR: INVALIDATE TRANSACTION HISTORY - ", err);
  }
};
