import { IAdminChannelInfo } from "@entities/admin-panel";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ICardContentProps {
  channel: IAdminChannelInfo;
}

export const CardContent: FC<ICardContentProps> = ({ channel }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.info__top}>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.rate")}:</p>
            <span>{channel?.rate || 0}</span>
          </div>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.complete")}:</p>
            <span>{channel?.complete || 0}</span>
          </div>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.complaints")}:</p>
            <span>{channel?.complaints || 0}</span>
          </div>
        </div>
        <div className={styles.info__bottom}>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.on_hold")}:</p>
            <span>{channel?.on_hold || 0}</span>
          </div>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.cancel")}:</p>
            <span>{channel?.cancel || 0}</span>
          </div>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.not_complete")}:</p>
            <span>{channel?.not_complete || 0}</span>
          </div>
          <div className={styles.block}>
            <p>{t("admin_panel.channels.card.in_progress")}:</p>
            <span>{channel?.in_progress || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
