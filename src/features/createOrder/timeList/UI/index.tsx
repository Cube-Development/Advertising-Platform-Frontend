import { TimeListProps } from "@entities/project";
import { CancelIcon2, ClockIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ITime {
  timeIndexList: number[];
  timeStringList: string[];
}

const timeSlots: string[] = [
  "00:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
  "04:00 - 05:00",
  "05:00 - 06:00",
  "06:00 - 07:00",
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
  "23:00 - 23:59",
];

export const TimeList: FC<TimeListProps> = ({ onChange, startTime }) => {
  const { t } = useTranslation();
  const [selectedTimesObject, setSelectedTimeObject] = useState<ITime>({
    timeIndexList: [],
    timeStringList: [],
  });

  // установка начальных временных интервалов если они приходят из бека
  useEffect(() => {
    if (startTime?.length) {
      const timeIndexList: number[] = [];
      const timeStringList: string[] = [];
      startTime.forEach((time, index) => {
        let timeIndex = -1;
        if (index === 0) {
          timeIndex = timeSlots.findIndex((slot) => slot.startsWith(time));
        } else {
          timeIndex = timeSlots.findIndex((slot) => slot.endsWith(time));
        }
        if (timeIndex !== -1) {
          timeIndexList.push(timeIndex);
          timeStringList.push(time);
        }
      });
      const uniqueTimeIndexList = Array.from(new Set(timeIndexList));
      setSelectedTimeObject({
        timeIndexList: uniqueTimeIndexList,
        timeStringList,
      });
    }
  }, []);

  const selectTime = (timeIndex: number) => {
    let newTimeIndexList: number[] = [];
    let newTimeList: string[] = [];

    if (
      selectedTimesObject.timeIndexList.length === 0 ||
      selectedTimesObject.timeIndexList.includes(timeIndex)
    ) {
      newTimeIndexList =
        selectedTimesObject.timeIndexList.length === 1 ? [] : [timeIndex];
      newTimeList =
        selectedTimesObject.timeIndexList.length === 1
          ? []
          : timeSlots[timeIndex].split(" - ");
    } else if (selectedTimesObject.timeIndexList.length < 2) {
      newTimeIndexList = [...selectedTimesObject.timeIndexList, timeIndex].sort(
        (a, b) => a - b,
      );
      newTimeList = [
        timeSlots[newTimeIndexList[0]].split(" - ")[0],
        timeSlots[newTimeIndexList[1]].split(" - ")[1],
      ];
    } else {
      newTimeIndexList = [timeIndex];
      newTimeList = timeSlots[timeIndex].split(" - ");
    }

    setSelectedTimeObject({
      timeIndexList: newTimeIndexList,
      timeStringList: newTimeList,
    });
  };

  const handleCloseModal = () => {
    setSelectedTimeObject({
      timeIndexList: [],
      timeStringList: [],
    });
  };
  const continueAction = () => {
    onChange(selectedTimesObject.timeStringList);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className={styles.open}>
          <div className={styles.icon}>
            <ClockIcon />
          </div>
          <p>
            {selectedTimesObject.timeIndexList.length
              ? `${selectedTimesObject.timeStringList[0]} - ${selectedTimesObject.timeStringList[1]}`
              : "--:-- - --:--"}
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <div className={styles.top}>
          <AlertDialogTitle className={styles.title}>
            {t("calendar.choose_time")}
          </AlertDialogTitle>
          <AlertDialogCancel type="button" onClick={handleCloseModal}>
            <CancelIcon2 />
          </AlertDialogCancel>
        </div>
        <div className={styles.timeList}>
          <div className={styles.leftGrid}>
            {timeSlots.map((timeSlot, index) => (
              <div
                key={timeSlot}
                className={`${styles.timeSlot} ${
                  selectedTimesObject.timeIndexList.includes(index)
                    ? styles.active
                    : index > Math.min(...selectedTimesObject.timeIndexList) &&
                        index < Math.max(...selectedTimesObject.timeIndexList)
                      ? styles.active__in
                      : ""
                }`}
                onClick={() => selectTime(index)}
              >
                <p>{timeSlot}</p>
              </div>
            ))}
          </div>
          <div className={styles.bottom}>
            <AlertDialogAction type="button" onClick={continueAction}>
              <div className={`${styles.confirm} button button__blue`}>
                <p>{t("calendar.confirm")}</p>
              </div>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
