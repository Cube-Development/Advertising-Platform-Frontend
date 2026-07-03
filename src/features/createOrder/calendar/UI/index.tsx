import { DateListProps } from "@entities/project";
import { platformTypesNum } from "@entities/platform";
import { CalendarIcon } from "@shared/assets";
import { ENUM_CALENDAR } from "@shared/config";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  CustomCloseButton,
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

export const CustomCalendar: FC<DateListProps> = ({
  onChange,
  onApplyToPlatform,
  onApplyToAll,
  showApplyToPlatform,
  showApplyToAll,
  startDate,
  platform,
}) => {
  const { t } = useTranslation();
  const [isSelectRange, setIsSelectRange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dateObject, setDateObject] = useState<IDate>({
    date: null,
    dateString: null,
  });

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
    } else {
      setDateObject({ date: null, dateString: null });
      setIsSelectRange(false);
    }
  }, [startDate]);

  const handleOnChange = (newDate: Date | Date[] | null | any) => {
    if (!newDate) return;

    if (Array.isArray(newDate)) {
      const newDateString = newDate.map((date: Date) => customStringDate(date));
      setDateObject({ date: newDate, dateString: newDateString });
    } else {
      const newDateString = customStringDate(newDate);
      setDateObject({ date: [newDate], dateString: [newDateString] });
    }
  };

  const getSelectedDates = (): Date[] | null => {
    const dates = dateObject.date;
    if (!dates || dates.length === 0) return null;
    if (isSelectRange && dates.length !== 2) return null;
    return isSelectRange ? [dates[0], dates[1]] : [dates[0]];
  };

  const handleApply = () => {
    const dates = getSelectedDates();
    if (!dates) return;
    onChange(dates);
    setIsOpen(false);
  };

  const handleApplyToPlatform = () => {
    const dates = getSelectedDates();
    if (!dates) return;
    onApplyToPlatform?.(dates);
    setIsOpen(false);
  };

  const handleApplyToAll = () => {
    const dates = getSelectedDates();
    if (!dates) return;
    onApplyToAll?.(dates);
    setIsOpen(false);
  };

  const handleChangeRange = () => {
    setIsSelectRange(!isSelectRange);
    setDateObject({ date: null, dateString: null });
  };

  const handleCloseModal = () => {
    // setDateObject({ date: null, dateString: null });
    setIsOpen(false);
  };

  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): string | null => {
    if (view === "month") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateToCheck = new Date(date);
      dateToCheck.setHours(0, 0, 0, 0);

      // Проверка для Instagram и YouTube - дизейблить ближайшие 3 дня
      if (
        platform === platformTypesNum.instagram ||
        platform === platformTypesNum.youtube
      ) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const minSelectableDate = new Date(today);
        minSelectableDate.setDate(today.getDate() + 3);

        // Дизейблить сегодня, завтра и послезавтра
        if (
          dateToCheck.toDateString() === today.toDateString() ||
          dateToCheck.toDateString() === tomorrow.toDateString() ||
          dateToCheck.toDateString() === dayAfterTomorrow.toDateString() ||
          dateToCheck < minSelectableDate
        ) {
          return styles.disabledDate;
        }
      } else if (platform === platformTypesNum.telegram) {
        const minSelectableDate = new Date(today);
        const currentHour = new Date().getHours();

        if (currentHour >= 21) {
          minSelectableDate.setDate(today.getDate() + 1);
        }

        if (dateToCheck < minSelectableDate) {
          return styles.disabledDate;
        }
      } else {
        // Для Telegram и других платформ - текущая логика
        const minSelectableDate = new Date();
        minSelectableDate.setDate(
          new Date().getDate() + ENUM_CALENDAR.disabledDays,
        );
        if (dateToCheck < minSelectableDate) {
          return styles.disabledDate;
        }
      }

      // Проверка статических дизейбленных дат
      if (
        disabledDates.some(
          (disabledDate) =>
            dateToCheck.toDateString() === disabledDate.toDateString(),
        )
      ) {
        return styles.disabledDate;
      }

      // Проверка рекламных дат
      if (
        advDates.some(
          (advDate) => dateToCheck.toDateString() === advDate.toDateString(),
        )
      ) {
        return styles.advDate;
      }
    }
    return null;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">{t("calendar.choose_date")}</p>
          <AlertDialogCancel type="button" onClick={handleCloseModal} asChild>
            <CustomCloseButton />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <div className={styles.content}>
          <Calendar
            onChange={handleOnChange}
            value={
              Array.isArray(dateObject.date)
                ? dateObject.date?.length === 2
                  ? [dateObject.date[0], dateObject.date[1]] // Гарантируем массив из двух дат
                  : dateObject.date[0] // Берем первую дату, если это одиночная дата
                : dateObject.date || null // Убедимся, что одиночная дата либо undefined
            }
            tileClassName={tileClassName}
            selectRange={isSelectRange}
          />
          <div className={styles.bottom}>
            <MyButton
              type="button"
              buttons_type="button__white"
              className={styles.confirm}
              onClick={handleChangeRange}
            >
              <p>{isSelectRange ? t("calendar.date") : t("calendar.range")}</p>
            </MyButton>

            <MyButton
              type="button"
              buttons_type="button__blue"
              className="mt-1.5"
              onClick={handleApply}
              disabled={!getSelectedDates()}
            >
              {t("calendar.apply")}
            </MyButton>

            {(showApplyToPlatform || showApplyToAll) && (
              <div
                className={`grid gap-1 mt-1 ${
                  showApplyToPlatform && showApplyToAll
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {showApplyToPlatform && onApplyToPlatform && (
                  <MyButton
                    type="button"
                    buttons_type="button__white"
                    onClick={handleApplyToPlatform}
                    disabled={!getSelectedDates()}
                  >
                    {t("calendar.apply_to_platform")}
                  </MyButton>
                )}
                {showApplyToAll && onApplyToAll && (
                  <MyButton
                    type="button"
                    buttons_type="button__white"
                    onClick={handleApplyToAll}
                    disabled={!getSelectedDates()}
                  >
                    {t("calendar.apply_to_all")}
                  </MyButton>
                )}
              </div>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
