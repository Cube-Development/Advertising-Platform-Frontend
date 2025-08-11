import { AppDispatch } from "@app/providers/store";
import {
  INotificationCard,
  INotificationData,
  notificationsAPI,
} from "@entities/communication";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { convertUTCToLocalDateTime } from "@shared/utils";
import { v4 as uuidv4 } from "uuid";

interface Props {
  dispatch: AppDispatch;
  message: INotificationData;
}

export const invalidateNotification = async ({ dispatch, message }: Props) => {
  const datetime = convertUTCToLocalDateTime(
    message?.created_date!,
    message?.created_time!,
  );

  const newNotification: INotificationCard = {
    id: message.id || uuidv4(),
    text: message.text || "new notification",
    method: message.method,
    created_date: message?.created_date,
    created_time: message?.created_time,
    formatted_date: message?.created_date
      ? datetime.localDate
      : new Date().toLocaleDateString("ru-RU"),
    formatted_time: message?.created_time
      ? datetime.localTime
      : new Date().toLocaleTimeString("ru-RU"),
    is_read: false,
    data: message,
  };

  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.NOTIFICATIONS,
  };

  dispatch(
    notificationsAPI.util.updateQueryData(
      "getNotifications",
      params,
      (draft) => {
        const notifications = [newNotification, ...draft?.notifications];
        draft.notifications.splice(
          0,
          draft.notifications.length,
          ...notifications,
        );
      },
    ),
  );
};
