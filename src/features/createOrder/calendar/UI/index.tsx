import { CalendarIcon, CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC, useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import "./styles.scss";
import { DateListProps } from "@entities/project";
import { CALENDAR } from "@shared/config";

interface IDate {
  date: any;
  dateString: string | null | any;
}

const disabledDatesStrings = ["2024-04-10", "2024-04-11", "2024-04-12"];
const advDatesStrings = ["2024-04-1", "2024-04-2", "2024-04-3"];
const disabledDates = disabledDatesStrings.map(
  (dateString) => new Date(dateString),
);
const advDates = advDatesStrings.map((dateString) => new Date(dateString));

export const CustomCalendar: FC<DateListProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectRange, setIsSelectRange] = useState(false);
  const [dateOject, setDateOject] = useState<IDate>({
    date: null,
    dateString: null,
  });
  const { t } = useTranslation();

  const handleOnChange = (newDate: any) => {
    if (Array.isArray(newDate)) {
      const newDateString = newDate.map(
        (date: Date) =>
          `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      );
      setDateOject({ date: newDate, dateString: newDateString });
    } else {
      const newDateString = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
      setDateOject({ date: [newDate], dateString: newDateString });
    }
  };

  const handleChangeRange = () => {
    setIsSelectRange(!isSelectRange);
    setDateOject({ date: null, dateString: null });
  };

  const handleCloseModal = () => {
    setDateOject({ date: null, dateString: null });
  };

  const continueAction = () => {
    onChange(dateOject.date);
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
      minSelectableDate.setDate(new Date().getDate() + CALENDAR.disabledDays);
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
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={styles.open}>
            <div className={styles.icon}>
              <CalendarIcon />
            </div>
            {dateOject.dateString && !isModalOpen ? (
              dateOject.dateString.length === 2 ? (
                <p className={styles.range}>
                  <p>{dateOject.dateString[0]}</p>
                  <span>-</span>
                  <p>{dateOject.dateString[1]}</p>
                </p>
              ) : (
                <p>{dateOject.dateString}</p>
              )
            ) : (
              <p>-- / -- / ----</p>
            )}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.calendar}>
            <div className={styles.top}>
              <p>{t("calendar.choose_date")}</p>
              <AlertDialogCancel type="button" onClick={handleCloseModal}>
                <CancelIcon2 />
              </AlertDialogCancel>
            </div>
            <div>
              <Calendar
                onChange={handleOnChange}
                value={
                  isSelectRange
                    ? dateOject.date
                    : dateOject.date
                      ? dateOject.date[0]
                      : dateOject.date
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
                <p>
                  {isSelectRange ? t("calendar.date") : t("calendar.range")}
                </p>
              </MyButton>
              <AlertDialogAction type="button" onClick={continueAction}>
                <div className={`${styles.confirm} button button__blue`}>
                  <p>{t("calendar.confirm")}</p>
                </div>
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
