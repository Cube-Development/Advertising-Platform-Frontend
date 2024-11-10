import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AcceptChannelProps {
  id: string;
}

export const AcceptChannel: FC<AcceptChannelProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__green_light">
      <p>{t("admin_panel.channels.card.buttons.accept")}</p>
    </MyButton>
  );
};
