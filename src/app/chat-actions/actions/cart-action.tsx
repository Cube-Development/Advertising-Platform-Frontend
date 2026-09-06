import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { useChatCartSummary } from "../model/use-cart-summary";
import { ActionList, ActionRow, ActionStats, IStatTile } from "../ui";
import { useCompactNumber } from "../model/use-compact-number";
import { ActionShell } from "../ui/action-shell";

/** Read-only cart summary. Adding / removing channels stays on the cart page. */
const CartAction = () => {
  const { t } = useTranslation();
  const compact = useCompactNumber();
  const { cart, isLoading, isError, refetch } = useChatCartSummary();

  const tiles: IStatTile[] = [
    {
      label: t("chat_actions.cart.count", "Каналов"),
      value: cart?.count ?? 0,
    },
    {
      label: t("chat_actions.cart.amount", "Сумма"),
      value: formatMoney(cart?.amount ?? 0),
    },
    {
      label: t("chat_actions.cart.coverage", "Охват"),
      value: compact(cart?.coverage),
    },
    {
      label: t("chat_actions.cart.subscribers", "Подписчиков"),
      value: compact(cart?.subscribers),
    },
  ];

  const channels = cart?.channels ?? [];

  return (
    <ActionShell
      title={t("chat_actions.cart.title", "Корзина")}
      subtitle={t(
        "chat_actions.cart.subtitle",
        "Выбранные каналы для размещения",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && !cart?.count}
      emptyText={t(
        "chat_actions.cart.empty",
        "В корзине пока нет каналов — добавьте их из каталога",
      )}
      cta={{ to: ENUM_PATHS.CART }}
    >
      <div className="flex flex-col gap-3">
        <ActionStats items={tiles} />
        {channels.length > 0 && (
          <ActionList>
            {channels.map((channel) => (
              <ActionRow
                key={channel.id}
                title={channel.name}
                subtitle={channel.category}
                meta={
                  channel.selected_format?.price
                    ? formatMoney(channel.selected_format.price)
                    : undefined
                }
              />
            ))}
          </ActionList>
        )}
      </div>
    </ActionShell>
  );
};

export default CartAction;
