import {
  BLOGGER_OFFER_TABS_LIST,
  ENUM_OFFER_STATUS,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionList,
  ActionRow,
  ActionTabs,
  CHAT_ACTION_PAGE_SIZE,
} from "../ui";
import { ActionShell } from "../ui/action-shell";

/** Incoming ad offers for a blogger. Read-only; accepting stays on /offers. */
const MyOffersAction = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const [status, setStatus] = useState<ENUM_OFFER_STATUS>(
    ENUM_OFFER_STATUS.WAIT,
  );

  const { data, isLoading, isFetching, isError, refetch } =
    useGetBloggerOrdersQuery({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: 1,
      date_sort: dateSortingTypes.decrease,
      elements_on_page: CHAT_ACTION_PAGE_SIZE,
      status,
    });

  const orders = data?.orders ?? [];

  return (
    <ActionShell
      title={t("chat_actions.my_offers.title", "Мои заказы")}
      subtitle={t(
        "chat_actions.my_offers.subtitle",
        "Предложения о размещении рекламы",
      )}
      isLoading={isLoading || isFetching}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && !isFetching && orders.length === 0}
      emptyText={t(
        "chat_actions.my_offers.empty",
        "В этом статусе заказов нет",
      )}
      cta={{ to: ENUM_PATHS.OFFERS }}
      toolbar={
        <ActionTabs
          value={status}
          onChange={setStatus}
          tabs={BLOGGER_OFFER_TABS_LIST.map((tab) => ({
            value: tab.type,
            label: t(tab.name),
          }))}
        />
      }
    >
      <ActionList>
        {orders.map((order) => (
          <ActionRow
            key={order.id}
            title={order.name}
            subtitle={order.category}
            meta={order.order_status}
            leading={
              order.avatar ? (
                <img
                  src={order.avatar}
                  alt=""
                  className="size-8 shrink-0 rounded-full object-cover"
                />
              ) : undefined
            }
          />
        ))}
      </ActionList>
    </ActionShell>
  );
};

export default MyOffersAction;
