import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import {
  MyButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shared/ui";
import { WalletsBar } from "@features/wallet";
import { Loader, X } from "lucide-react";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreateOrderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isAllowed: boolean;
  totalAmount: number;
  onAction?: () => void;
}

export const CreateOrder: FC<CreateOrderProps> = ({
  isAllowed,
  totalAmount,
  onAction,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE | null>(null);
  const handleClose = () => {
    setOpen(false);
    onAction && onAction();
    setWalletType(ENUM_WALLETS_TYPE.DEPOSIT);
  };

  return (
    // <MyButton buttons_type="button__green" type="submit" {...props}>
    //   {!isAllowed ? (
    //     <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
    //   ) : (
    //     <p>{t(`create_order.payment.pay`)}</p>
    //   )}
    // </MyButton>
    // <Sheet open={dropdownMenu.isOpen} onOpenChange={() => toggleMenu()}>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MyButton buttons_type="button__green" type="button" {...props}>
          {!isAllowed ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={20}
              height={20}
            />
          ) : (
            <p>{t(`create_order.payment.pay`)}</p>
          )}
        </MyButton>
      </SheetTrigger>

      <SheetContent side={"right"} className={styles.content} useClose={false}>
        <SheetHeader className={styles.header}>
          <SheetTitle className={styles.title}>
            {t("create_order.payment.title")}
          </SheetTitle>
          <SheetClose className="absolute transition-opacity -translate-y-1/2 right-4 top-[22px] opacity-70 hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none">
            <X size={24} color="var(--Personal-colors-main" />
          </SheetClose>
        </SheetHeader>
        <SheetDescription className={styles.description}>
          <div className={styles.wallets_choose}>
            <p className={styles.subtitle}>
              {t("create_order.payment.choose_wallet")}
            </p>
            <WalletsBar
              walletType={walletType}
              setWalletType={setWalletType}
              totalAmount={totalAmount}
            />
          </div>
          <div className={styles.bottom}>
            <SheetClose asChild>
              <MyButton buttons_type="button__green" onClick={handleClose}>
                <p>{t(`create_order.payment.pay`)}</p>
              </MyButton>
            </SheetClose>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
