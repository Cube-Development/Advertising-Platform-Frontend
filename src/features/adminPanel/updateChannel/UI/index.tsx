import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface UpdateChannelProps {
  id: string;
}

export const UpdateChannel: FC<UpdateChannelProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton>
      <p>{t("admin_panel.channels.card.buttons.update")}</p>
    </MyButton>
  );
};
