import { TimeListProps } from "@entities/project";
import { ClockIcon } from "@shared/assets";
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
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ITime {
  timeIndexList: number[];
  timeStringList: string[];
}

// const timeSlots: string[] = [
//   "00:00 - 02:00",
//   "02:00 - 04:00",
//   "04:00 - 06:00",
//   "06:00 - 08:00",
//   "08:00 - 10:00",
//   "10:00 - 12:00",
//   "12:00 - 14:00",
//   "14:00 - 16:00",
//   "16:00 - 18:00",
//   "18:00 - 20:00",
//   "20:00 - 22:00",
//   "22:00 - 23:59",
// ];

const timeSlots: string[] = [
  "00:00 - 03:00",
  "03:00 - 06:00",
  "06:00 - 09:00",
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
  "21:00 - 23:59",
];

export const TimeList: FC<TimeListProps> = ({
  onChange,
  startTime,
  selectedDate,
}) => {
  const { t } = useTranslation();
  const [isSelectRange, setIsSelectRange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimesObject, setSelectedTimeObject] = useState<ITime>({
    timeIndexList: [],
    timeStringList: [],
  });
  const userHasSelected = useRef(false);
  const prevStartTimeKey = useRef<string>("");

  // Получаем текущее время пользователя
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes; // возвращаем время в минутах от начала дня
  };

  // Проверяем, прошел ли слот
  const isSlotPassed = (timeSlot: string) => {
    // Получаем сегодняшнюю дату в том же формате
    const today = new Date();
    const todayFormatted = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`;

    // Если дата не сегодняшняя, слот не прошел
    if (selectedDate && selectedDate !== todayFormatted) {
      return false;
    }

    // Если дата сегодняшняя, проверяем время
    const currentTimeInMinutes = getCurrentTime();
    const [, endTime] = timeSlot.split(" - ");
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes;
    return currentTimeInMinutes > endTimeInMinutes;
  };

  // установка начальных временных интервалов если они приходят из бека
  useEffect(() => {
    // Сбрасываем флаг при изменении startTime (например, при переключении карточки)
    const startTimeKey = startTime?.join(",") || "";

    if (startTimeKey !== prevStartTimeKey.current) {
      userHasSelected.current = false;
      prevStartTimeKey.current = startTimeKey;
    }

    // Не перезаписываем состояние, если пользователь уже выбрал время
    if (userHasSelected.current) {
      return;
    }

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
  }, [startTime]);

  const selectTime = (timeIndex: number) => {
    let newTimeIndexList: number[] = [];
    let newTimeList: string[] = [];

    if (!isSelectRange) {
      // Режим выбора одного времени
      if (selectedTimesObject.timeIndexList.includes(timeIndex)) {
        // Если кликнули на уже выбранное время - снимаем выбор
        newTimeIndexList = [];
        newTimeList = [];
      } else {
        // Выбираем новое время
        newTimeIndexList = [timeIndex];
        newTimeList = timeSlots[timeIndex].split(" - ");
      }
    } else {
      // Режим выбора диапазона
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
        newTimeIndexList = [
          ...selectedTimesObject.timeIndexList,
          timeIndex,
        ].sort((a, b) => a - b);
        newTimeList = [
          timeSlots[newTimeIndexList[0]].split(" - ")[0],
          timeSlots[newTimeIndexList[1]].split(" - ")[1],
        ];
      } else {
        newTimeIndexList = [timeIndex];
        newTimeList = timeSlots[timeIndex].split(" - ");
      }
    }

    const updatedTimeObject = {
      timeIndexList: newTimeIndexList,
      timeStringList: newTimeList,
    };

    // Отмечаем, что пользователь выбрал время
    if (newTimeList.length > 0) {
      userHasSelected.current = true;
    }

    setSelectedTimeObject(updatedTimeObject);

    // Если режим выбора одной даты, автоматически подтверждаем и закрываем
    if (!isSelectRange && newTimeIndexList.length === 1) {
      onChange(newTimeList);
      setIsOpen(false);
    }

    // Если режим выбора диапазона и выбрано 2 времени, автоматически подтверждаем и закрываем
    if (isSelectRange && newTimeIndexList.length === 2) {
      onChange(newTimeList);
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTimeObject({
      timeIndexList: [],
      timeStringList: [],
    });
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">{t("calendar.choose_time")}</p>
          <AlertDialogCancel type="button" onClick={handleCloseModal} asChild>
            <CustomCloseButton />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <div className={styles.timeList}>
          <div className={styles.leftGrid}>
            {timeSlots.map((timeSlot, index) => {
              const isDisabled = isSlotPassed(timeSlot);
              return (
                <div
                  key={timeSlot}
                  className={`${styles.timeSlot} ${
                    selectedTimesObject.timeIndexList.includes(index)
                      ? styles.active
                      : index >
                            Math.min(...selectedTimesObject.timeIndexList) &&
                          index < Math.max(...selectedTimesObject.timeIndexList)
                        ? styles.active__in
                        : ""
                  } ${isDisabled ? styles.disabled : ""}`}
                  onClick={() => !isDisabled && selectTime(index)}
                  style={{
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <p>{timeSlot}</p>
                </div>
              );
            })}
          </div>
          <MyButton
            type="button"
            buttons_type="button__white"
            className={styles.confirm}
            onClick={() => {
              setIsSelectRange(!isSelectRange);
              setSelectedTimeObject({
                timeIndexList: [],
                timeStringList: [],
              });
            }}
          >
            <p>{isSelectRange ? t("calendar.date") : t("calendar.range")}</p>
          </MyButton>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
