import { IAdminUserData } from "@entities/admin-panel";
import { ENUM_PATHS } from "@shared/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui";
import {
  BookOpenCheck,
  MessageSquareMore,
  MoreVertical,
  Pencil,
  Unlock,
} from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface UserCardMenuProps {
  card: IAdminUserData;
}

export const UserCardMenu: FC<UserCardMenuProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-full p-2 rounded-xl bg-gray-50">
        <MoreVertical className="text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={4}
        className="!p-0 !rounded-[12px] frame"
        align="end"
      >
        <DropdownMenuGroup className="grid">
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer">
            <BookOpenCheck size={12} />
            <span>{t("admin_panel.users.card.menu.details")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer">
            <MessageSquareMore size={12} />
            <span>{t("admin_panel.users.card.menu.send_message")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer"
              to={`${ENUM_PATHS.ADMIN_USER_INFO.replace(":id", card?.user_id)}`}
            >
              <Pencil size={12} />
              <span>{t("admin_panel.users.card.menu.edit")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer">
            <Unlock size={12} />
            <span>{t("admin_panel.users.card.menu.unblock")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
