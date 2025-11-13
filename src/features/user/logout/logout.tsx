import { adminAPI } from "@entities/admin";
import { ENUM_ROLES, logout, useLogoutMutation } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  Separator,
  cn,
} from "@shared/ui";
import { CircleX, Loader, LogOut } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ILogoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Logout: FC<ILogoutProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.user);
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

  const { className, ...rest } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "text-sm font-semibold text-red-600 hover:bg-red-200/50",
          className,
        )}
        {...rest}
      >
        {t("logout")}
      </AlertDialogTrigger>

      <AlertDialogContent className="gap-4 sm:max-w-lg frame w-[90vw]">
        <AlertDialogHeader className="!text-center mt-4">
          <AlertDialogTitle className="font-semibold text-gray-900 text-md md:text-xl">
            {t("logout_title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-gray-600 sm:text-lg">
            {t("logout_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogCancel className="absolute top-0 right-0 p-4 cursor-pointer">
          <CircleX size={20} />
        </AlertDialogCancel>
        <Separator />

        <AlertDialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
