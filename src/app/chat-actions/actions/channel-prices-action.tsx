import {
  ENUM_CHANNEL_STATUS,
  useGetChannelsByStatusQuery,
} from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { ActionList, ActionRow, CHAT_ACTION_PAGE_SIZE } from "../ui";
import { ActionShell } from "../ui/action-shell";
import { useChatActionNav } from "../ui/use-chat-action-nav";

/**
 * Which channels the blogger can reprice, and a way into each one.
 *
 * Editing prices is part of the channel edit wizard (formats, symbol limits,
 * moderation) — far too much for a panel — so each row opens that channel on
 * the real page.
 */
const ChannelPricesAction = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { go } = useChatActionNav();

  const { data, isLoading, isError, refetch } = useGetChannelsByStatusQuery({
    language: language?.id || USER_LANGUAGES_LIST[0].id,
    page: 1,
    date_sort: dateSortingTypes.decrease,
    elements_on_page: CHAT_ACTION_PAGE_SIZE,
    status: ENUM_CHANNEL_STATUS.ACTIVE,
  });

  const channels = data?.channels ?? [];

  return (
    <ActionShell
      title={t("chat_actions.channel_prices.title", "Цены на размещение")}
      subtitle={t(
        "chat_actions.channel_prices.subtitle",
        "Выберите канал, чтобы изменить форматы и цены",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && channels.length === 0}
      emptyText={t(
        "chat_actions.channel_prices.empty",
        "Активных каналов пока нет",
      )}
      cta={{ to: ENUM_PATHS.MY_CHANNELS }}
    >
      <ActionList>
        {channels.map((channel) => (
          <ActionRow
            key={channel.id}
            title={channel.name}
            subtitle={channel.category}
            onClick={() => go(ENUM_PATHS.MY_CHANNELS)}
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

export default ChannelPricesAction;
