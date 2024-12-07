import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface UpdateChannelProps {
  id: string;
}

export const UpdateChannel: FC<UpdateChannelProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__green_light">
      <p>{t("admin_panel.channels.card.buttons.update")}</p>
    </MyButton>
  );
};
