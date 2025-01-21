import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Loader, SendHorizonal, X } from "lucide-react";
import { IOrderFeature } from "@entities/project";
import { useAcceptOfferMutation } from "@entities/offer";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

// создаю массив дат из date_from до date_to
function getDatesInRange(dates?: {
  date_from: string;
  date_to: string;
}): string[] {
  if (!dates || !dates.date_from || !dates.date_to) return [];

  const { date_from, date_to } = dates;

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const startDate = parseDate(date_from);
  const endDate = parseDate(date_to);

  const currentDates: string[] = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    currentDates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return currentDates;
}

export const AcceptOffer: FC<IOrderFeature> = ({ order_id, dates }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const currentDates = getDatesInRange(dates);
  const [selectedDate, setSelectedDate] = useState<string>(currentDates[0]);
  const [acceptOffer, { isLoading }] = useAcceptOfferMutation();
  const handleOnClick = () => {
    acceptOffer({ order_id, date: selectedDate })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.accept_offer.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.accept_offer.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };

  const screen = useWindowWidth();

  const [open, setOpen] = useState(false);

  return (
    <>
      {dates ? (
        <>
          {screen >= BREAKPOINT.MD ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <p className={styles.button}>{t(`offer_btn.accept`)}</p>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="sr-only"></DialogTitle>
                <div className={styles.popover}>
                  <div className="absolute -right-3 -top-3">
                    <DialogClose>
                      <X width={20} height={20} stroke="#2d2d2d" />
                    </DialogClose>
                  </div>
                  <h2 className={styles.description__title}>
                    {t(`offer_btn.accept_title`)}
                  </h2>
                  <div className={styles.dates}>
                    {currentDates?.map((date, index) => (
                      <p
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`${styles.date} ${date === selectedDate && styles.selected_date}`}
                      >
                        {date}
                      </p>
                    ))}
                  </div>
                  <MyButton className={styles.send} onClick={handleOnClick}>
                    {isLoading ? (
                      <Loader
                        className="animate-spin"
                        stroke="#fff"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <DialogClose className={styles.send__title}>
                        {t(`offer_btn.accept_date`)}
                        <SendHorizonal />
                      </DialogClose>
                    )}
                  </MyButton>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <p className={styles.button}>{t(`offer_btn.accept`)}</p>
              </DrawerTrigger>
              <DrawerContent className="rounded-t-xl bottom-0 top-auto">
                <DialogTitle className="sr-only"></DialogTitle>
                <div className="mx-auto mt-4 h-1.5 w-[80px] rounded-full bg-black/20" />
                <div className={styles.drawer_popover}>
                  <h2 className={styles.description__title}>
                    {t(`offer_btn.accept_title`)}
                  </h2>
                  <div className={styles.dates}>
                    {currentDates?.map((date, index) => (
                      <p
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`${styles.date} ${date === selectedDate && styles.selected_date}`}
                      >
                        {date}
                      </p>
                    ))}
                  </div>
                  <MyButton className={styles.send} onClick={handleOnClick}>
                    {isLoading ? (
                      <Loader
                        className="animate-spin"
                        stroke="#fff"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <DrawerClose className={styles.send__title}>
                        {t(`offer_btn.accept_date`)}
                        <SendHorizonal />
                      </DrawerClose>
                    )}
                  </MyButton>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </>
      ) : (
        <MyButton
          onClick={handleOnClick}
          buttons_type="button__white"
          className={styles.button}
        >
          {isLoading ? (
            <Loader
              className="animate-spin"
              stroke="#4772e6"
              width={20}
              height={20}
            />
          ) : (
            <p>{t(`offer_btn.accept`)}</p>
          )}
        </MyButton>
      )}
    </>
  );
};
