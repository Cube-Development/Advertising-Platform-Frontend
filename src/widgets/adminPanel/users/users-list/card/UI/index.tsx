import {
  ADMIN_USER_STATUS,
  ADMIN_USER_STATUS_LIST,
  IAdminUserData,
} from "@entities/admin-panel";
import { UserCardMenu } from "@features/admin-panel";
import { ENUM_PATHS } from "@shared/routing";
import { Badge, Card, CardContent, CardHeader } from "@shared/ui/shadcn-ui";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface UserCardProps {
  card: IAdminUserData;
}

const stopCardNavigation = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export const UserCard: FC<UserCardProps> = ({ card }) => {
  const { t } = useTranslation();

  const statusLabel =
    ADMIN_USER_STATUS_LIST.find((item) => item.id === card.status)?.name || "";

  const userPath = ENUM_PATHS.ADMIN_USER_INFO.replace(":id", card.user_id);

  return (
    <Link to={userPath} className="block">
      <Card className="w-full overflow-hidden cursor-pointer transition-colors hover:bg-muted/40">
        <CardHeader className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3 min-w-0 flex-1">
            <img
              src={card.avatar || noUserAvatar}
              alt={card.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{card.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {card.email || "—"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                ID: {card.user_id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant={
                card.status === ADMIN_USER_STATUS.ACTIVE
                  ? "default"
                  : "secondary"
              }
            >
              {t(statusLabel)}
            </Badge>
            <div onClick={stopCardNavigation}>
              <UserCardMenu card={card} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-6 sm:pt-0">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("admin_panel.users.bar.id")}
            </p>
            <p className="text-sm font-semibold truncate">#{card.id}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("admin_panel.users.bar.date")}
            </p>
            <p className="text-sm font-semibold">{card.created || "—"}</p>
          </div>
          <div className="min-w-0 col-span-2 sm:col-span-1">
            <p className="text-xs text-muted-foreground">
              {t("admin_panel.users.bar.status")}
            </p>
            <p className="text-sm font-semibold">{t(statusLabel)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
