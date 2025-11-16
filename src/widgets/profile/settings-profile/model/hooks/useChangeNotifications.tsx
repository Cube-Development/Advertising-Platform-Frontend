import { eventForm, IEventsData, useEditProfileMutation } from "@entities/user";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface IChangeNotificationsFormProps {
  events: IEventsData;
}

export const useChangeNotifications = ({
  events,
}: IChangeNotificationsFormProps) => {
  const [edit, { isLoading }] = useEditProfileMutation();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleChangeNotifications = (event: eventForm) => {
    const newValue = !events?.user_events?.[event];
    const updatedEvents: IEventsData = {
      user_events: {
        ...events?.user_events,
        [event]: newValue,
      },
    };
    !isLoading &&
      edit(updatedEvents)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.profile.edit.event.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.profile.edit.event.error"),
          });
          console.error("error: ", error);
        });
  };

  return {
    isLoading,
    handleChangeNotifications,
  };
};
