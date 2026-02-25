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
import { useCallback, useState, type FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ILoginPremiumAccessProps {
  trigger?: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  channelCount?: number;
}

export const LoginPremiumAccess: FC<ILoginPremiumAccessProps> = ({
  trigger,
  className,
  open: controlledOpen,
  onOpenChange,
  channelCount,
}) => {
  const { t } = useTranslation();

  const isControlled = controlledOpen !== undefined;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );
  const { premiumBalance } = useAppSelector((state) => state.user);
  const options = t("auth.login_premium_access.options", {
    returnObjects: true,
  }) as { title: string }[];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          {channelCount && channelCount > 0 && (
            <div
              style={{
                backgroundColor: "rgba(12, 162, 184, 0.10)",
              }}
              className=" rounded-xl p-4 text-center w-full"
            >
              <p className="text-xs sm:text-sm mb-1">
                {t("auth.login_premium_access.channels.found")}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-[var(--Personal-colors-main)]">
                <Trans
                  i18nKey="auth.login_premium_access.channels.channels_count"
                  values={{ count: channelCount }}
                  components={[
                    <span
                      key="0"
                      className="text-sm sm:text-base font-medium text-foreground ml-1.5"
                    />,
                  ]}
                />
              </p>
            </div>
          )}
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
