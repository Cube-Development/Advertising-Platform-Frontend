import { ENUM_WALLETS_TYPE, useGetBalanceQuery } from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { ActionStats, IStatTile } from "../ui";
import { ActionShell } from "../ui/action-shell";

const WALLET_LABELS: Record<string, [string, string]> = {
  [ENUM_WALLETS_TYPE.DEPOSIT]: ["chat_actions.wallet.deposit", "Депозит"],
  [ENUM_WALLETS_TYPE.PROFIT]: ["chat_actions.wallet.profit", "Заработано"],
  [ENUM_WALLETS_TYPE.SPENDING]: ["chat_actions.wallet.spending", "Расходы"],
  [ENUM_WALLETS_TYPE.PREPAYMENT]: ["chat_actions.wallet.prepayment", "Аванс"],
};

/** Read-only balance summary. `getBalance` takes no args — no cache collision. */
const WalletBalanceAction = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetBalanceQuery();

  const tiles: IStatTile[] = (data?.items ?? []).map((item) => {
    const [key, fallback] = WALLET_LABELS[item.wallet] ?? [
      `chat_actions.wallet.${item.wallet}`,
      item.wallet,
    ];
    return { label: t(key, fallback), value: formatMoney(item.balance ?? 0) };
  });

  return (
    <ActionShell
      title={t("chat_actions.wallet_balance.title", "Баланс кошелька")}
      subtitle={t("chat_actions.wallet_balance.subtitle", "Средства на счетах")}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && tiles.length === 0}
      emptyText={t("chat_actions.wallet_balance.empty", "Кошельки не найдены")}
      cta={{
        to: ENUM_PATHS.WALLET_HISTORY,
        label: t("chat_actions.wallet_balance.cta", "История операций"),
      }}
    >
      <ActionStats items={tiles} />
    </ActionShell>
  );
};

export default WalletBalanceAction;
