import { useAdminChannelBanMutation } from "@entities/admin";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BanChannelProps {
  id: string;
}

export const BanChannel: FC<BanChannelProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [banChannel, { isLoading }] = useAdminChannelBanMutation();
  const reason = "reason";
  const finish_date = "10.11.2025";

  const handleOnClick = () => {
    id &&
      banChannel({ channel_id: id, reason: reason, finish_date: finish_date })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.channel.ban.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.channel.ban.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__orange_light" onClick={handleOnClick}>
      <p>{t("admin_panel.channels.card.buttons.ban")}</p>
      {isLoading && (
        <div className={styles.loader}>
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
