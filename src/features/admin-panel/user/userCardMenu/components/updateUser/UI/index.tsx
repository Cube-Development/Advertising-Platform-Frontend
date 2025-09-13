import { IAdminUserInfo } from "@entities/admin";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface UpdateUserProps {
  user: IAdminUserInfo;
}

export const UpdateUser: FC<UpdateUserProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <MyButton buttons_type="button__green_light">
      <p>{t("admin_panel.users.card.menu.editing.buttons.update")}</p>
    </MyButton>
  );
};
