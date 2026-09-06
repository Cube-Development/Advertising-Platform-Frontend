import {
  BLOGGER_CHANNEL_TABS_LIST,
  ENUM_CHANNEL_STATUS,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
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

/**
 * Blogger's channels, filtered by moderation status.
 *
 * Unlike `pages/MyChannels`, the selected status lives in component state
 * instead of the URL — a panel must never rewrite the address bar of the page
 * the user is looking at.
 */
const MyChannelsAction = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const [status, setStatus] = useState<ENUM_CHANNEL_STATUS>(
    ENUM_CHANNEL_STATUS.ACTIVE,
  );

  const { data, isLoading, isFetching, isError, refetch } =
    useGetChannelsByStatusQuery({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: 1,
      date_sort: dateSortingTypes.decrease,
      elements_on_page: CHAT_ACTION_PAGE_SIZE,
      status,
    });

  const channels = data?.channels ?? [];

  return (
    <ActionShell
      title={t("chat_actions.my_channels.title", "Мои каналы")}
      subtitle={t(
        "chat_actions.my_channels.subtitle",
        "Статус модерации и активность",
      )}
      isLoading={isLoading || isFetching}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && !isFetching && channels.length === 0}
      emptyText={t(
        "chat_actions.my_channels.empty",
        "В этом статусе каналов нет",
      )}
      cta={{ to: ENUM_PATHS.MY_CHANNELS }}
      toolbar={
        <ActionTabs
          value={status}
          onChange={setStatus}
          tabs={BLOGGER_CHANNEL_TABS_LIST.map((tab) => ({
            value: tab.type,
            label: t(tab.name),
          }))}
        />
      }
    >
      <ActionList>
        {channels.map((channel) => (
          <ActionRow
            key={channel.id}
            title={channel.name}
            subtitle={channel.category}
            leading={
              channel.avatar ? (
                <img
                  src={channel.avatar}
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

export default MyChannelsAction;
