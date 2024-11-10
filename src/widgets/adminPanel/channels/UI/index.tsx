import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ChannelsList } from "../channelsList";
import { AdminChannels } from "@shared/config";

export const Channels: FC = () => {
  const { t } = useTranslation();
  const channels = AdminChannels;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.channels")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.channels")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <ChannelsList channels={channels} />
        </div>
      </div>
    </div>
  );
};
