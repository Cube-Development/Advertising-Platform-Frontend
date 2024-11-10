import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BanChannelProps {
  id: string;
}

export const BanChannel: FC<BanChannelProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton>
      <p>{t("admin_panel.channels.card.buttons.ban")}</p>
    </MyButton>
  );
};
