import { IAdminUserData } from "@entities/admin";
import { MoreIcon } from "@shared/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

interface UserCardMenuProps {
  card: IAdminUserData;
}

export const UserCardMenu: FC<UserCardMenuProps> = ({ card }) => {
  const { t } = useTranslation();
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
        className={styles.content}
      >
        <DropdownMenuGroup className={styles.menu}>
          <div className={styles.item}>
            <span>{t("admin_panel.users.card.menu.details")}</span>
          </div>
          <div className={styles.item}>
            <span>{t("admin_panel.users.card.menu.send_message")}</span>
          </div>
          <Link
            className={styles.item}
            to={`${ENUM_PATHS.ADMIN_USER_INFO.replace(":id", card?.user_id)}`}
          >
            <span>{t("admin_panel.users.card.menu.edit")}</span>
          </Link>
          <div className={styles.item}>
            <span>{t("admin_panel.users.card.menu.unblock")}</span>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
