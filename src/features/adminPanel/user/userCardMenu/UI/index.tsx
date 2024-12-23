import { IAdminUserData } from "@entities/admin";
import { MoreIcon } from "@shared/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditUser, UpdateUser } from "../components";
import styles from "./styles.module.scss";

interface UserCardMenuProps {
  card: IAdminUserData;
}

export const UserCardMenu: FC<UserCardMenuProps> = ({ card }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={styles.trigger}>
          <MoreIcon className="icon__grey" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={4}
        className="w-100"
      >
        <DropdownMenuGroup className={styles.menu}>
          <span>{t("admin_panel.users.card.menu.details")}</span>
          <span>{t("admin_panel.users.card.menu.send_message")}</span>
          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            <span>{t("admin_panel.users.card.menu.edit")}</span>
          </DropdownMenuItem>
          {/* <EditUser card={card} UpdateBtn={UpdateUser} /> */}
          <span>{t("admin_panel.users.card.menu.unblock")}</span>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {isEdit && (
        <div aria-hidden="true">
          <EditUser
            card={card}
            UpdateBtn={UpdateUser}
            isOpen={isEdit}
            setDialogOpen={setIsEdit}
          />
        </div>
      )}
    </DropdownMenu>
  );
};
