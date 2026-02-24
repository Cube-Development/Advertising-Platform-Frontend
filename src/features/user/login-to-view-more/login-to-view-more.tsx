import { LockIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import {
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  MyButton,
} from "@shared/ui";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ILoginToViewMoreProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const LoginToViewMore: FC<ILoginToViewMoreProps> = ({
  trigger,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <div className="flex items-center justify-center">
            <LockIcon
              className={cn("w-4 h-4 text-gray-400 cursor-pointer", className)}
            />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="flex items-center justify-center gap-2">
          <LockIcon className="w-16 h-16 text-[var(--Personal-colors-main)]" />
          <DialogTitle className="text-center text-sm sm:text-base">
            {t("auth.login_to_view_more.title")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-none text-center text-xs sm:text-sm">
          {t("auth.login_to_view_more.description")}
        </DialogDescription>
        <DialogFooter className="sm:grid sm:grid-cols-2 flex-col-reverse flex gap-2">
          <DialogClose asChild>
            <MyButton
              buttons_type="button__white"
              className="text-xs sm:text-sm"
            >
              {t("auth.login_to_view_more.buttons.cancel")}
            </MyButton>
          </DialogClose>
          <Link to={ENUM_PATHS.LOGIN}>
            <MyButton className="text-xs sm:text-sm">
              {t("auth.login_to_view_more.buttons.register")}
            </MyButton>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
