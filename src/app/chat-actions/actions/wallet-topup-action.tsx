import { ENUM_PATHS } from "@shared/routing";
import { CreditCard } from "@widgets/wallet/transactions/components";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

/**
 * Card top-up, embedded.
 *
 * `CreditCard` is the one payment path safe to run from a panel: it posts to
 * Payme/Click and hands off to a new window, so nothing has to render above the
 * popover. Its own stylesheet only tunes padding and font sizes at breakpoints,
 * so a narrow panel stays readable.
 *
 * The legal-entity path is not embedded: it needs a signed offer, and signing
 * opens a Radix dialog that would paint behind this panel. That path is a
 * deep-link to /wallet/topup instead.
 */
const WalletTopupAction = () => {
  const { t } = useTranslation();
  return (
    <ActionShell
      title={t("chat_actions.wallet_topup.title", "Пополнить баланс")}
      subtitle={t("chat_actions.wallet_topup.subtitle", "Оплата картой")}
      cta={{
        to: ENUM_PATHS.WALLET_TOP_UP,
        label: t("chat_actions.wallet_topup.cta", "Оплата по счёту"),
      }}
    >
      <CreditCard />
    </ActionShell>
  );
};

export default WalletTopupAction;
