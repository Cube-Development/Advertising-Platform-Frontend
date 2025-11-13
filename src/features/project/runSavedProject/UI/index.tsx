import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WalletsBar } from "@features/wallet";
import {
  ENUM_WALLETS_TYPE,
  useCreatePaymentProjectMutation,
} from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import {
  MyButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  useToast,
} from "@shared/ui";
import styles from "./styles.module.scss";

interface RunSavedProjectProps {
  project_id: string;
  totalAmount: number;
}

export const RunSavedProject: FC<RunSavedProjectProps> = ({
  project_id,
  totalAmount,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE | null>(null);

  const [createPayment, { isLoading }] = useCreatePaymentProjectMutation();

  const handleOnClick = async () => {
    if (!project_id || isLoading) return;

    try {
      await createPayment({
        project_id,
        wallet_type: ENUM_WALLETS_TYPE.SPENDING,
      }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.orders_manager.launch_project.success"),
      });
      setOpen(false);
      navigate(ENUM_PATHS.ORDERS);
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.orders_manager.launch_project.error"),
      });
      console.error("error: ", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MyButton buttons_type="button__green" type="button">
          {isLoading ? (
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
              setWalletType={(type) => setWalletType(type!)}
              totalAmount={totalAmount}
            />
          </div>
          <div className={styles.bottom}>
            <SheetClose asChild disabled={!walletType}>
              <MyButton
                buttons_type="button__green"
                onClick={handleOnClick}
                disabled={!walletType}
              >
                {isLoading ? (
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
            </SheetClose>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
