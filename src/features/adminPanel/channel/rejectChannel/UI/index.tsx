import { useAdminChannelRejectMutation } from "@entities/admin";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface RejectChannelProps {
  id: string;
}

export const RejectChannel: FC<RejectChannelProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [rejectChannel, { isLoading }] = useAdminChannelRejectMutation();
  const reason = "reason";
  const finish_date = "10.11.2025";
  const handleOnClick = () => {
    id &&
      !isLoading &&
      rejectChannel({
        channel_id: id,
        reason: reason,
        finish_date: finish_date,
      })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.channel.reject.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.channel.reject.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__orange_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.reject")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
