import { logoutEcp } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@shared/ui";
import { AlertTriangle, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface LogoutEcpProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LogoutEcp: React.FC<LogoutEcpProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(event);
    dispatch(logoutEcp());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={"destructive"}
          className="flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          {t("organization.logout.buttons.logout")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-5 sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                {t("organization.logout.title")}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="mt-2 text-gray-600">
            {t("organization.logout.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-2 mt-6">
          <AlertDialogCancel asChild>
            <Button type="button" variant={"outline"}>
              {t("organization.logout.buttons.cancel")}
            </Button>
          </AlertDialogCancel>
          <Button
            type="button"
            onClick={handleLogout}
            variant={"destructive"}
            className="flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            {t("organization.logout.buttons.logout")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
