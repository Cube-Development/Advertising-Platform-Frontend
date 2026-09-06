import { useGetNotificationsQuery } from "@entities/communication";
import { ENUM_PATHS } from "@shared/routing";
import { Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { parseNotification } from "../model/parse-notification";
import { ActionList, ActionRow, CHAT_ACTION_PAGE_SIZE } from "../ui";
import { ActionShell } from "../ui/action-shell";

/**
 * Latest notifications, read-only.
 *
 * Nothing here marks anything as read: a panel the AI opened is not a
 * deliberate visit, and `readNotification` would invalidate tags and refetch
 * the notification list on the page underneath.
 */
const NotificationsAction = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({
    page: 1,
    elements_on_page: CHAT_ACTION_PAGE_SIZE,
  });

  const notifications = data?.notifications ?? [];

  return (
    <ActionShell
      title={t("chat_actions.notifications.title", "Уведомления")}
      subtitle={t(
        "chat_actions.notifications.subtitle",
        "Последние события по вашему аккаунту",
      )}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      isEmpty={!isLoading && notifications.length === 0}
      emptyText={t("chat_actions.notifications.empty", "Новых уведомлений нет")}
      cta={{ to: ENUM_PATHS.PROFILE }}
    >
      <ActionList>
        {notifications.map((item) => {
          const { title } = parseNotification(item.text);
          return (
            <ActionRow
              key={item.id}
              title={title}
              subtitle={[item.formatted_date, item.formatted_time]
                .filter(Boolean)
                .join(" ")}
              leading={
                <Circle
                  className={
                    item.is_read
                      ? "size-2 fill-gray-300 text-gray-300"
                      : "size-2 fill-blue-600 text-blue-600"
                  }
                />
              }
            />
          );
        })}
      </ActionList>
    </ActionShell>
  );
};

export default NotificationsAction;
