import { DateListProps } from "@entities/project";
import { CalendarIcon, CancelIcon2 } from "@shared/assets";
import { ENUM_CALENDAR } from "@shared/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { formatRuStringToDate } from "@shared/utils";
import { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import "./styles.scss";

interface IDate {
  date: Date[] | null;
  dateString: string | string[] | null;
}

const disabledDatesStrings = ["2024-04-10", "2024-04-11", "2024-04-12"];
const advDatesStrings = ["2024-04-1", "2024-04-2", "2024-04-3"];
const disabledDates = disabledDatesStrings.map(
  (dateString) => new Date(dateString),
);
const advDates = advDatesStrings.map((dateString) => new Date(dateString));

export const CustomCalendar: FC<DateListProps> = ({ onChange, startDate }) => {
  const { t } = useTranslation();
  const [isSelectRange, setIsSelectRange] = useState(false);
  const [dateObject, setDateObject] = useState<IDate>({
    date: null,
    dateString: null,
  });
  console.log("dateObject", dateObject);

  const customStringDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // установка начальных временных интервалов если они приходят из бека
  useEffect(() => {
    if (startDate) {
      if (Array.isArray(startDate)) {
        const validDates = startDate.map((dateString) => {
          return formatRuStringToDate(dateString);
        });
        const formattedDates = validDates.map(customStringDate);
        setDateObject({
          date: validDates,
          dateString: formattedDates,
        });
      } else {
        const validDate = formatRuStringToDate(startDate);
        const formattedDate = customStringDate(validDate);
        setDateObject({
          date: [validDate],
          dateString: [formattedDate],
        });
      }
    }
  }, [startDate]);

  const handleOnChange = (newDate: any) => {
    if (Array.isArray(newDate)) {
      const newDateString = newDate.map((date: Date) => customStringDate(date));
      setDateObject({ date: newDate, dateString: newDateString });
    } else {
      const newDateString = customStringDate(newDate);
      setDateObject({ date: [newDate], dateString: newDateString });
    }
  };

  const handleChangeRange = () => {
    setIsSelectRange(!isSelectRange);
    setDateObject({ date: null, dateString: null });
  };

  const handleCloseModal = () => {
    setDateObject({ date: null, dateString: null });
  };

  const continueAction = () => {
    if (dateObject?.date) {
      onChange(dateObject?.date);
    }
  };

  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): string | null => {
    if (view === "month") {
      const minSelectableDate = new Date();
      minSelectableDate.setDate(
        new Date().getDate() + ENUM_CALENDAR.disabledDays,
      );
      if (
        disabledDates.some(
          (disabledDate) => date.toDateString() === disabledDate.toDateString(),
        ) ||
        date < minSelectableDate
      ) {
        return styles.disabledDate;
      }
      if (
        advDates.some(
          (advDate) => date.toDateString() === advDate.toDateString(),
        )
      ) {
        return styles.advDate;
      }
    }
    return null;
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className={styles.open}>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          {dateObject.dateString ? (
            dateObject.dateString.length === 2 ? (
              <div className={styles.range}>
                <p>{dateObject.dateString[0]}</p>
                <span>-</span>
                <p>{dateObject.dateString[1]}</p>
              </div>
            ) : (
              <p>{dateObject.dateString}</p>
            )
          ) : (
            <p>-- / -- / ----</p>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.calendar}>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <AlertDialogTitle className={styles.top}>
          <p>{t("calendar.choose_date")}</p>
          <AlertDialogCancel type="button" onClick={handleCloseModal}>
            <CancelIcon2 />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <div>
          <Calendar
            onChange={handleOnChange}
            value={
              Array.isArray(dateObject.date)
                ? dateObject.date?.length === 2
                  ? [dateObject.date[0], dateObject.date[1]] // Гарантируем массив из двух дат
                  : dateObject.date[0] // Берем первую дату, если это одиночная дата
                : dateObject.date || undefined // Убедимся, что одиночная дата либо undefined
            }
            tileClassName={tileClassName}
            selectRange={isSelectRange}
          />
        </div>

        <div className={styles.bottom}>
          <MyButton
            type="button"
            buttons_type="button__white"
            className={styles.confirm}
            onClick={handleChangeRange}
          >
            <p>{isSelectRange ? t("calendar.date") : t("calendar.range")}</p>
          </MyButton>
          <AlertDialogAction asChild>
            <MyButton type="button" onClick={continueAction}>
              <p>{t("calendar.confirm")}</p>
            </MyButton>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
