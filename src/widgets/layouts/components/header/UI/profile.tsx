import { useGetUserQueryQuery } from "@entities/user";
import { Logout } from "@features/user";
import { ProfileIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PROFILE_USER_MENU } from "../model";

export const Profile: FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { data: user } = useGetUserQueryQuery(undefined, { skip: !isAuth });
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-9 w-9">
        <ProfileIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="!p-0 !rounded-[12px] frame" align="end">
        <DropdownMenuLabel className="font-bold text-[10px] truncate max-w-[70vw] px-3 py-2">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {PROFILE_USER_MENU.map((item) => (
            <DropdownMenuItem
              key={item.item.title}
              className="px-3 py-2 cursor-pointer"
              asChild
            >
              <Link
                to={item?.item?.path || ""}
                className="flex items-center gap-2"
              >
                {item.item.icon && <item.item.icon size={16} />}
                <span>{t(item?.item?.title || "")}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout className="w-full px-3 py-2" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
