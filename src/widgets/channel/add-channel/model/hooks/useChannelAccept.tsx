import {
  IAddChannelData,
  useCreateChannelMutation,
  useEditChannelMutation,
} from "@entities/channel";
import { ToastAction, useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface IChannelAccept {
  channel_id: string;
  isEdit: boolean;
}

export const useChannelAccept = ({ channel_id, isEdit }: IChannelAccept) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [createChannel, { isLoading: isLoadingCreate }] =
    useCreateChannelMutation();
  const [editChannel, { isLoading: isLoadingEdit }] = useEditChannelMutation();

  const channelAccept = (data: IAddChannelData) => {
    if (isEdit) {
      const { ...editData } = data;
      !isLoadingEdit &&
        editChannel({ ...editData, channel_id: channel_id })
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              title: t("toasts.add_platform.edit.success"),
            });
          })
          .catch(() => {
            toast({
              variant: "error",
              title: t("toasts.add_platform.edit.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          });
    } else {
      !isLoadingCreate &&
        createChannel(data)
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              title: t("toasts.add_platform.create.success"),
            });
          })
          .catch(() => {
            toast({
              variant: "error",
              title: t("toasts.add_platform.create.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          });
    }
  };
  return { channelAccept };
};
