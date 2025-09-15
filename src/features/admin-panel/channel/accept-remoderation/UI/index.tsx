import {
  IAdminEditChannelData,
  useAdminChannelAcceptRemoderationMutation,
  useAdminChannelEditMutation,
} from "@entities/admin-panel";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptRemoderationProps {
  id: string;
  channel: IAdminEditChannelData;
}

export const AcceptRemoderation: FC<AcceptRemoderationProps> = ({
  id,
  channel,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [editChannel, { isLoading: isLoadingEdit }] =
    useAdminChannelEditMutation();
  const [acceptChannel, { isLoading }] =
    useAdminChannelAcceptRemoderationMutation();

  const handleOnClick = async () => {
    if (isLoading || isLoadingEdit || !channel || !id) return;

    try {
      await editChannel({ ...channel, channel_id: id }).unwrap();
      await acceptChannel({ channel_id: id }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.admin.channel.remoderation.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.remoderation.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      console.error("error: ", error);
    }
  };

  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.accept")}</p>
      {isLoading ||
        (isLoadingEdit && (
          <div className="loader">
            <AccountsLoader />
          </div>
        ))}
    </MyButton>
  );
};
