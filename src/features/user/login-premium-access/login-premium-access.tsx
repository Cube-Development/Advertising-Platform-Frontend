import { LockIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
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
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ILoginPremiumAccessProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const LoginPremiumAccess: FC<ILoginPremiumAccessProps> = ({
  trigger,
  className,
}) => {
  const { t } = useTranslation();
  const { premiumBalance } = useAppSelector((state) => state.user);
  const options = t("auth.login_premium_access.options", {
    returnObjects: true,
  }) as { title: string }[];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <div className="flex items-center justify-center">
            <LockIcon
              className={cn(
                "!w-4 !h-4 text-gray-400 cursor-pointer",
                className,
              )}
            />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="flex items-center justify-center gap-2">
          <LockIcon className="w-16 h-16 text-[var(--Personal-colors-main)]" />
          <DialogTitle className="text-center text-sm sm:text-base">
            {t("auth.login_premium_access.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <DialogDescription className="text-center text-xs sm:text-sm text-none">
            <Trans
              i18nKey="auth.login_premium_access.description"
              components={[<span key="0" className="font-semibold" />]}
              values={{ balance: premiumBalance?.toLocaleString() }}
            />
          </DialogDescription>
          <ul className="grid text-[10px] sm:text-xs">
            {options.map((option, index) => (
              <li key={index}> - {option.title}</li>
            ))}
          </ul>
        </div>
        <DialogFooter className="sm:grid sm:grid-cols-2 flex-col-reverse flex gap-2">
          <DialogClose asChild>
            <MyButton
              buttons_type="button__white"
              className="text-xs sm:text-sm"
            >
              {t("auth.login_premium_access.buttons.cancel")}
            </MyButton>
          </DialogClose>
          <Link to={ENUM_PATHS.WALLET_TOP_UP}>
            <MyButton className="text-xs sm:text-sm">
              {t("auth.login_premium_access.buttons.balance")}
            </MyButton>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
