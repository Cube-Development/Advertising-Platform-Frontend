import {
  IAdminEditChannelData,
  useAdminChannelEditMutation,
} from "@entities/admin";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface UpdateChannelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  channel: IAdminEditChannelData;
  id: string;
}

export const UpdateChannel = forwardRef<HTMLButtonElement, UpdateChannelProps>(
  ({ channel, id, ...props }, ref) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [editChannel, { isLoading }] = useAdminChannelEditMutation();

    const handleOnClick = () => {
      const { ...editData } = channel;
      !isLoading &&
        editChannel({ ...editData, channel_id: id })
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              title: t("toasts.admin.channel.edit.success"),
            });
          })
          .catch((error) => {
            toast({
              variant: "error",
              title: t("toasts.admin.channel.edit.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            console.error("error: ", error);
          });
    };

    return (
      <MyButton
        onClick={handleOnClick}
        buttons_type="button__green_light"
        ref={ref}
        {...props}
      >
        <p>{t("admin_panel.channels.card.buttons.update")}</p>
        {isLoading && (
          <div className="loader">
            <AccountsLoader />
          </div>
        )}
      </MyButton>
    );
  },
);
