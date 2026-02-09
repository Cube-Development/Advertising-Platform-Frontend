import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, SquarePen, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { WalletsBar } from "@features/wallet";
import {
  ENUM_WALLETS_TYPE,
  useCreatePaymentProjectMutation,
} from "@entities/wallet";
import {
  IAdvProjectSubcard,
  useLazyGetAdvSubprojectsQuery,
  authCartAPI,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { CART } from "@shared/api";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useAppDispatch } from "@shared/hooks/redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  MyButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  useToast,
} from "@shared/ui";
import styles from "./styles.module.scss";

// Проверяет, просрочена ли дата/время ордера относительно текущего времени в Ташкенте
const isOrderExpired = (order: IAdvProjectSubcard): boolean => {
  const now = new Date();

  // Текущая дата в Ташкенте в формате YYYY-MM-DD для корректного сравнения строк
  const tashkentDateStr = now.toLocaleDateString("en-CA", {
    timeZone: "Asia/Tashkent",
  }); // "2026-02-02"

  // Текущее время в Ташкенте в формате HH:MM
  const tashkentTimeStr = now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Tashkent",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  console.log(tashkentDateStr);
  console.log(tashkentTimeStr);

  const orderDateRaw =
    typeof order.publish_date === "object"
      ? order.publish_date.date_to
      : order.publish_date;

  const orderDateStr = orderDateRaw.split(".").reverse().join("-"); // "01.02.2026" -> "2026-02-01"

  console.log(orderDateStr);

  if (orderDateStr < tashkentDateStr) return true;

  if (orderDateStr >= tashkentDateStr) {
    const timeTo = order.publish_time?.time_to;
    if (timeTo && tashkentTimeStr > timeTo) return true;
    return false;
  }

  return false;
};

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const language = useFindLanguage();

  const [open, setOpen] = useState(false);
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE | null>(null);
  const [isCheckingDates, setIsCheckingDates] = useState(false);

  const [createPayment, { isLoading }] = useCreatePaymentProjectMutation();
  const [triggerGetOrders] = useLazyGetAdvSubprojectsQuery();

  // Обработчик клика по кнопке "Оплатить и запустить"
  const handleOpenSheet = async () => {
    if (isCheckingDates) return;

    setIsCheckingDates(true);
    try {
      const result = await triggerGetOrders({
        project_id,
        language: language?.id || USER_LANGUAGES_LIST[0].id,
        page: 1,
      });

      const hasExpired = result.data?.orders?.some(isOrderExpired);

      if (hasExpired) {
        setShowExpiredAlert(true);
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error("Error checking orders:", error);
      // При ошибке всё равно открываем Sheet
      setOpen(true);
    } finally {
      setIsCheckingDates(false);
    }
  };

  // Обработчик кнопки "Редактировать" в Dialog
  const handleEditClick = () => {
    dispatch(authCartAPI.util.invalidateTags([CART]));
    Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, project_id);
    setShowExpiredAlert(false);
    navigate(ENUM_PATHS.CART);
  };

  const handleOnClick = async () => {
    if (!project_id || isLoading || !walletType) return;

    try {
      await createPayment({
        project_id,
        wallet_type: walletType,
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
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <MyButton
          buttons_type="button__green"
          type="button"
          onClick={handleOpenSheet}
        >
          {isLoading || isCheckingDates ? (
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

        <SheetContent
          side={"right"}
          className={styles.content}
          useClose={false}
        >
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

      {/* Dialog для предупреждения о просроченных датах */}
      <Dialog open={showExpiredAlert} onOpenChange={setShowExpiredAlert}>
        <DialogContent className="w-[95vw] max-w-[600px] rounded-lg p-4 md:p-5">
          <DialogTitle className="relative text-base md:text-lg font-semibold text-gray-900">
            {t("create_order.payment.expired_orders.title")}
            <DialogClose
              className="absolute right-0 top-[50%] translate-y-[-50%] text-black hover:text-gray-600 cursor-pointer"
              asChild
            >
              <X className="size-5 md:size-6 stroke-[1px]" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            {t("create_order.payment.expired_orders.description")}
          </DialogDescription>
          <MyButton
            type="button"
            className="w-full hover:scale-[1.015] transition-all duration-300"
            onClick={handleEditClick}
          >
            <SquarePen className="size-5 stroke-[1.5px] min-w-5" />
            {t("create_order.payment.expired_orders.button")}
          </MyButton>
        </DialogContent>
      </Dialog>
    </>
  );
};
