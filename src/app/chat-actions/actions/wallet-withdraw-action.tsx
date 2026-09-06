import { ENUM_WALLETS_TYPE, useGetBalanceQuery } from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { ActionStats } from "../ui";
import { DeepLinkAction } from "../ui/deep-link-action";

/**
 * Withdrawal shows what is available and sends the user to the real page.
 *
 * It is not embedded on purpose: withdrawing requires a signed offer and an
 * ECP session, and the offer-sign step is a Radix dialog portalled to
 * document.body — which paints *behind* a top-layer popover panel. Rather than
 * ship a form whose confirmation step is invisible, the panel deep-links out.
 */
const WalletWithdrawAction = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetBalanceQuery();

  const withdrawable = (data?.items ?? []).filter((item) =>
    [ENUM_WALLETS_TYPE.PROFIT, ENUM_WALLETS_TYPE.DEPOSIT].includes(item.wallet),
  );

  return (
    <DeepLinkAction
      title={t("chat_actions.wallet_withdraw.title", "Вывод средств")}
      subtitle={t(
        "chat_actions.wallet_withdraw.subtitle",
        "На карту или расчётный счёт",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      preview={
        withdrawable.length > 0 ? (
          <ActionStats
            items={withdrawable.map((item) => ({
              label:
                item.wallet === ENUM_WALLETS_TYPE.PROFIT
                  ? t("chat_actions.wallet.profit", "Заработано")
                  : t("chat_actions.wallet.deposit", "Депозит"),
              value: formatMoney(item.balance ?? 0),
            }))}
          />
        ) : undefined
      }
      bullets={[
        t("chat_actions.wallet_withdraw.b1", "Выбор кошелька и суммы"),
        t("chat_actions.wallet_withdraw.b2", "Реквизиты для перевода"),
        t("chat_actions.wallet_withdraw.b3", "Подписание документов через ЭЦП"),
      ]}
      ctaLabel={t("chat_actions.wallet_withdraw.cta", "Вывести средства")}
      to={ENUM_PATHS.WALLET_WITHDRAW}
    />
  );
};

export default WalletWithdrawAction;
