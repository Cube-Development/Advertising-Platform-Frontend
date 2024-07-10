import {
  MyButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToastAction,
  useToast,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SendHorizonal } from "lucide-react";
import { IOrderFeature } from "@entities/project";
import { useAcceptOfferMutation } from "@entities/offer";

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
  const [acceptOffer] = useAcceptOfferMutation();
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
  return (
    <>
      {dates ? (
        <Popover>
          <PopoverTrigger asChild>
            <p className={styles.button}>{t(`offer_btn.accept`)}</p>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-[10px] p-0 w-full h-full"
            align="end"
          >
            <div className={styles.popover}>
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
              <div className={styles.send} onClick={handleOnClick}>
                <p className={styles.send__title}>
                  {t(`offer_btn.accept_date`)}
                  <SendHorizonal />
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <MyButton
          onClick={handleOnClick}
          buttons_type="button__white"
          className={styles.button}
        >
          {t(`offer_btn.accept`)}
        </MyButton>
      )}
    </>
  );
};
