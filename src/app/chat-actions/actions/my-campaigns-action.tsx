import { dateSortingTypes } from "@entities/platform";
import {
  ENUM_ADV_MY_PROJECT_STATUS,
  useGetAdvProjectsQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionList,
  ActionRow,
  ActionTabs,
  CHAT_ACTION_PAGE_SIZE,
} from "../ui";
import { ActionShell } from "../ui/action-shell";

const STATUS_TABS = [
  {
    value: ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
    key: "orders_advertiser.status_filter.active",
    fallback: "Активные",
  },
  {
    value: ENUM_ADV_MY_PROJECT_STATUS.COMPLETED,
    key: "orders_advertiser.status_filter.complete",
    fallback: "Завершённые",
  },
];

/** Advertiser's campaigns with their per-status order counts. */
const MyCampaignsAction = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const [status, setStatus] = useState<ENUM_ADV_MY_PROJECT_STATUS>(
    ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
  );

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAdvProjectsQuery({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: 1,
      elements_on_page: CHAT_ACTION_PAGE_SIZE,
      date_sort: dateSortingTypes.decrease,
      status,
    });

  const projects = data?.projects ?? [];

  return (
    <ActionShell
      title={t("chat_actions.my_campaigns.title", "Мои кампании")}
      subtitle={t(
        "chat_actions.my_campaigns.subtitle",
        "Статусы размещений и бюджеты",
      )}
      isLoading={isLoading || isFetching}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && !isFetching && projects.length === 0}
      emptyText={t("chat_actions.my_campaigns.empty", "Кампаний пока нет")}
      cta={{ to: ENUM_PATHS.ORDERS }}
      toolbar={
        <ActionTabs
          value={status}
          onChange={setStatus}
          tabs={STATUS_TABS.map((tab) => ({
            value: tab.value,
            label: t(tab.key, tab.fallback),
          }))}
        />
      }
    >
      <ActionList>
        {projects.map((project) => (
          <ActionRow
            key={project.id}
            title={project.project_name || `#${project.identifier}`}
            subtitle={t("chat_actions.my_campaigns.channels", {
              defaultValue: "Каналов: {{count}}",
              count: project.count_channels ?? 0,
            })}
            meta={formatMoney(project.budget ?? 0)}
          />
        ))}
      </ActionList>
    </ActionShell>
  );
};

export default MyCampaignsAction;
