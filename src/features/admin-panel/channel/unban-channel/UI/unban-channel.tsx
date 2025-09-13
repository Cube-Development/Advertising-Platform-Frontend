import { useAdminChannelUnbanMutation } from "@entities/admin";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface UnbanChannelProps {
  id: string;
}

export const UnbanChannel: FC<UnbanChannelProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [unbanChannel, { isLoading }] = useAdminChannelUnbanMutation();

  const handleOnClick = async () => {
    if (isLoading || !id) return;

    try {
      await unbanChannel({ channel_id: id }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.admin.channel.unban.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.unban.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      console.error("error: ", error);
    }
  };
  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.unban")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
