import {
  adminChannelsAPI,
  IAdminEditChannelData,
  useAdminChannelAcceptMutation,
  useAdminChannelEditMutation,
} from "@entities/admin-panel";
import { ADMIN_CHANNELS } from "@shared/api";
import { useAppDispatch } from "@shared/hooks";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptChannelProps {
  id: string;
  channel: IAdminEditChannelData;
  isEdited?: boolean;
}

export const AcceptChannel: FC<AcceptChannelProps> = ({
  id,
  channel,
  isEdited = false,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptChannel, { isLoading }] = useAdminChannelAcceptMutation();
  const [editChannel, { isLoading: isLoadingEdit }] =
    useAdminChannelEditMutation();
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    if (isLoading || isLoadingEdit || !channel || !id) return;

    try {
      await acceptChannel({ channel_id: id }).unwrap();
      if (isEdited) await editChannel({ ...channel, channel_id: id }).unwrap();
      dispatch(adminChannelsAPI.util.invalidateTags([ADMIN_CHANNELS]));
      toast({
        variant: "success",
        title: t("toasts.admin.channel.accept.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.accept.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      console.error("error: ", error);
    }
  };

  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.accept")}</p>
      {(isLoading || isLoadingEdit) && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
