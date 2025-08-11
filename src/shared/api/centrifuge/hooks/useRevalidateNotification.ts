import { INotificationData } from "@entities/communication";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { invalidateNotification } from "../helpers";

export const useRevalidateNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const revalidateNotifications = async (message: INotificationData) => {
    await invalidateNotification({ dispatch, message });
    toast({
      variant: "default",
      title: t("toasts.websocket.new_notification"),
    });
  };

  return {
    revalidateNotifications,
  };
};
