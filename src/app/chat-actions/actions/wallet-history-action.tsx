import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetHistoryQuery } from "@entities/wallet";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActionList, ActionRow, CHAT_ACTION_PAGE_SIZE } from "../ui";
import { ActionShell } from "../ui/action-shell";

/**
 * Last few wallet operations.
 *
 * `elements_on_page` is CHAT_ACTION_PAGE_SIZE rather than
 * `INTERSECTION_ELEMENTS.HISTORY`, so this subscribes to its own RTK Query
 * cache entry and can never make the history page refetch and flicker.
 */
const WalletHistoryAction = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();

  const params = useMemo(
    () => ({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: 1,
      elements_on_page: CHAT_ACTION_PAGE_SIZE,
      date_sort: dateSortingTypes.decrease,
    }),
    [language?.id],
  );

  const { data, isLoading, isError, refetch } = useGetHistoryQuery(params);
  const transactions = data?.transactions ?? [];

  return (
    <ActionShell
      title={t("chat_actions.wallet_history.title", "История операций")}
      subtitle={t(
        "chat_actions.wallet_history.subtitle",
        "Последние транзакции по кошельку",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && transactions.length === 0}
      emptyText={t("chat_actions.wallet_history.empty", "Операций пока нет")}
      cta={{ to: ENUM_PATHS.WALLET_HISTORY }}
    >
      <ActionList>
        {transactions.map((item) => (
          <ActionRow
            key={item.id}
            title={item.transaction_type}
            subtitle={item.transaction_datetime}
            meta={formatMoney(item.amount ?? 0)}
          />
        ))}
      </ActionList>
    </ActionShell>
  );
};

export default WalletHistoryAction;
