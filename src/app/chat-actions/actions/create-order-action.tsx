import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { useChatCartSummary } from "../model/use-cart-summary";
import { ActionStats } from "../ui";
import { DeepLinkAction } from "../ui/deep-link-action";

/**
 * Order creation is a multi-step wizard (post editor, schedule, budget,
 * payment) that redirects to /cart when it has no project_id, so it cannot live
 * in a panel. What the panel can do is show what is waiting to be ordered and
 * send the user straight there.
 */
const CreateOrderAction = () => {
  const { t } = useTranslation();
  const { cart, isLoading, isError, refetch } = useChatCartSummary();

  return (
    <DeepLinkAction
      title={t("chat_actions.create_order.title", "Оформление кампании")}
      subtitle={t(
        "chat_actions.create_order.subtitle",
        "Даты, бюджет и рекламный пост",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      preview={
        <ActionStats
          items={[
            {
              label: t("chat_actions.cart.count", "Каналов"),
              value: cart?.count ?? 0,
            },
            {
              label: t("chat_actions.cart.amount", "Сумма"),
              value: formatMoney(cart?.amount ?? 0),
            },
          ]}
        />
      }
      bullets={[
        t(
          "chat_actions.create_order.b1",
          "Рекламный пост: текст, медиа, ссылки",
        ),
        t("chat_actions.create_order.b2", "Даты и время публикации по каналам"),
        t("chat_actions.create_order.b3", "Проверка бюджета и оплата"),
      ]}
      ctaLabel={t("chat_actions.create_order.cta", "Оформить кампанию")}
      to={cart?.count ? ENUM_PATHS.CREATE_ORDER : ENUM_PATHS.CART}
    />
  );
};

export default CreateOrderAction;
