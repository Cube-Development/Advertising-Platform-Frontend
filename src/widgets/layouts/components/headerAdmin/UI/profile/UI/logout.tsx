import { adminAPI } from "@entities/admin";
import { ENUM_ROLES, logout, useLogoutMutation } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@shared/ui";
import { CircleX, Loader, LogOut } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const Logout: FC = () => {
  const { t } = useTranslation();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toggleLogout = () => {
    dispatch(logout());
    dispatch(adminAPI.util.resetApiState());
  };

  const handleLogout = async () => {
    try {
      logoutMutation();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-sm font-semibold text-red-600">
          {t("logout")}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg frame">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {t("logout_title")}
          </DialogTitle>
          <DialogDescription className="mt-2 text-lg text-gray-600">
            {t("logout_description")}
          </DialogDescription>
        </DialogHeader>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-0 p-4 cursor-pointer"
        >
          <CircleX size={20} />
        </button>
        <Separator />

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-2 text-white bg-red-600 sm:w-auto hover:bg-red-700"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <LogOut size={20} />
            )}
            {t("logout")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
