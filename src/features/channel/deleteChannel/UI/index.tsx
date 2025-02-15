import { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { CancelIcon2, CloseIcon, YesIcon } from "@shared/assets";
import { MyModal, ToastAction, useToast } from "@shared/ui";
import { useDeleteChannelMutation } from "@entities/channel";

interface DeleteChannelProps {
  channel_id: string;
  onChange: () => void;
}

export const DeleteChannel: FC<DeleteChannelProps> = ({
  channel_id,
  onChange,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();
  const handleDeleteChannel = () => {
    channel_id &&
      isLoading &&
      deleteChannel({ channel_id })
        .unwrap()
        .then(() => {
          onChange();
          toast({
            variant: "success",
            title: t("toasts.offers_blogger.channel.delete.success"),
          });
        })
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.offers_blogger.channel.delete.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
        });
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onChange();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <MyModal>
      <div className={styles.content} ref={menuRef}>
        <div className={styles.content__top}>
          <p>{t("platforms_blogger.delete_channel.title")}</p>
          <button className={styles.close} onClick={onChange}>
            <CancelIcon2 />
          </button>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleDeleteChannel}>
            <p>{t("platforms_blogger.delete_channel.yes")}</p>
            <YesIcon />
          </button>
          <button onClick={onChange}>
            <p>{t("platforms_blogger.delete_channel.no")}</p>
            <CloseIcon />
          </button>
        </div>
      </div>
    </MyModal>
  );
};
