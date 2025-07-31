import {
  ENUM_ROLES,
  useGetUserQueryQuery,
  useLogoutMutation,
} from "@entities/user";
import { ProfileIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui";
import { CircleX, LogOut } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Logout } from "./UI/logout";

interface ProfileProps {
  toggleLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ toggleLogout }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { data: user } = useGetUserQueryQuery(undefined, { skip: !isAuth });

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };
  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      logout();
      toggleLogout();
      navigate(
        role === ENUM_ROLES.ADVERTISER
          ? ENUM_PATHS.MAIN
          : ENUM_PATHS.MAIN_BLOGGER,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={handleButtonClick} className="h-9 w-9">
        <ProfileIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="!p-0 !rounded-[12px] frame" align="end">
        <DropdownMenuLabel className="font-bold text-[10px] truncate max-w-[70vw] px-3 py-2">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
