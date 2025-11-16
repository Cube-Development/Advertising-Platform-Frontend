import {
  adminChannelsAPI,
  IAdminEditChannelData,
  useAdminChannelEditMutation,
} from "@entities/admin-panel";
import { ADMIN_CHANNELS } from "@shared/api";
import { useAppDispatch } from "@shared/hooks";
import { AccountsLoader, MyButton, useToast } from "@shared/ui";
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
  const [editChannel, { isLoading }] = useAdminChannelEditMutation();
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    if (isLoading || !channel || !id) return;

    try {
      await editChannel({ ...channel, channel_id: id }).unwrap();
      dispatch(adminChannelsAPI.util.invalidateTags([ADMIN_CHANNELS]));
      toast({
        variant: "success",
        title: t("toasts.admin.channel.remoderation.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.remoderation.error"),
      });
      console.error("error: ", error);
    }
  };

  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.accept")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
