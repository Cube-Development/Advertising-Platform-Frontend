import { useAdminChannelAcceptMutation } from "@entities/admin";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptChannelProps {
  id: string;
}

export const AcceptChannel: FC<AcceptChannelProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptChannel] = useAdminChannelAcceptMutation();
  const handleOnClick = () => {
    id &&
      acceptChannel({ channel_id: id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.channel.accept.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.channel.accept.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.accept")}</p>
    </MyButton>
  );
};
