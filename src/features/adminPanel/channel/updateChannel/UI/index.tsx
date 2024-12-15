import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface UpdateChannelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

export const UpdateChannel = forwardRef<HTMLButtonElement, UpdateChannelProps>(
  ({ id, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <MyButton buttons_type="button__green_light" ref={ref} {...props}>
        <p>{t("admin_panel.channels.card.buttons.update")}</p>
      </MyButton>
    );
  },
);
