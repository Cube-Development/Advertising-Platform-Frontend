import { CalendarIcon, CancelIcon2 } from "@shared/assets";
import { CALENDAR } from "@shared/config/common";
import { DateListProps } from "@shared/types/createPost";
import { MyButton } from "@shared/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { FC, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import "./styles.scss";

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
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (newDate: any) => {
    console.log("newDate", newDate);

    if (Array.isArray(newDate)) {
      const newDateString = newDate.map(
        (date: Date) =>
          `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      );
      setDateOject({ date: newDate, dateString: newDateString });
    } else {
      const newDateString = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
      setDateOject({ date: [newDate], dateString: newDateString });
    }
  };

  const handleChangeRange = () => {
    setIsSelectRange(!isSelectRange);
    setDateOject({ date: null, dateString: null });
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };
  const handleCloseModal = () => {
    // setIsModalOpen(!isModalOpen);
    setDateOject({ date: null, dateString: null });
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   // console.log("handleClickOutside", isModalOpen);
  //   // console.log("menuRef.current", menuRef.current);
  //   // // console.log("menuRef.current", menuRef.current.contains(event.target as Node));
  //   // if (menuRef.current && !menuRef.current.contains(event.target as Node) && isModalOpen) {
  //   //   console.log("gete",isModalOpen, menuRef.current)
  //   //   setIsModalOpen(false);
  //   // }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const continueAction = () => {
    // setIsModalOpen(false);
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
            <CalendarIcon />
            {dateOject.dateString && !isModalOpen ? (
              dateOject.dateString.length === 2 ? (
                <p className={styles.range}>
                  {dateOject.dateString[0]}
                  <br />
                  {t("calendar.until")}
                  <br />
                  {dateOject.dateString[1]}
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
                <div className={`${styles.confirm} button button__white`}>
                  <p>{t("calendar.confirm")}</p>
                </div>
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* <div>
        <button
          type="button"
          className={styles.wrapper}
          onClick={handleOpenModal}
        >
          <CalendarIcon />
          {dateOject.dateString && !isModalOpen ? (
            dateOject.dateString.length === 2 ? (
              <p className={styles.range}>
                {dateOject.dateString[0]}
                <br />
                {t("calendar.until")}
                <br />
                {dateOject.dateString[1]}
              </p>
            ) : (
              <p>{dateOject.dateString}</p>
            )
          ) : (
            <p>-- / -- / ----</p>
          )}
        </button>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div
                className={`${styles.calendar} shake__animation`}
                ref={menuRef}
              >
                <div className={styles.top}>
                  <p>{t("calendar.choose_date")}</p>
                  <button type="button" onClick={handleCloseModal}>
                    <CancelIcon2 />
                  </button>
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
                    className={styles.button}
                    onClick={handleChangeRange}
                  >
                    <p>
                      {isSelectRange ? t("calendar.date") : t("calendar.range")}
                    </p>
                  </MyButton>
                  <MyButton
                    type="button"
                    className={styles.button}
                    onClick={continueAction}
                  >
                    <p>{t("calendar.confirm")}</p>
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};
