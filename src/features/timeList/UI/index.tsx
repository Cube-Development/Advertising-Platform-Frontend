import { CancelIcon2, ClockIcon } from "@shared/assets";
import { TimeListProps } from "@shared/types/createPost";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ITIme {
  timeIndexList: number[];
  timeStringList: string[];
}

export const TimeList: FC<TimeListProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedTimesObject, setSelectedTimeObject] = useState<ITIme>({
    timeIndexList: [],
    timeStringList: [],
  });
  const { t } = useTranslation();
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

  // const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setSelectedTimeObject({
      timeIndexList: [],
      timeStringList: [],
    });
    // setIsModalOpen(false);
  };
  const continueAction = () => {
    // setIsModalOpen(false);
    onChange(selectedTimesObject.timeStringList);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //     setIsModalOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={styles.open}>
            <ClockIcon />
            <p>
              {selectedTimesObject.timeIndexList.length && !isModalOpen
                ? `${selectedTimesObject.timeStringList[0]} - ${selectedTimesObject.timeStringList[1]}`
                : "--:-- - --:--"}
            </p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.content}>
            <div className={styles.top}>
              <p>{t("calendar.choose_time")}</p>
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
                        : index >
                              Math.min(...selectedTimesObject.timeIndexList) &&
                            index <
                              Math.max(...selectedTimesObject.timeIndexList)
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
                  <div className={`${styles.confirm} button button__white`}>
                    <p>{t("calendar.confirm")}</p>
                  </div>
                </AlertDialogAction>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* <div>
        <button
          type="button"
          className={styles.wrapper}
          onClick={(e) => handleOpenModal(e)}
        >
          <ClockIcon />
          <p>
            {selectedTimesObject.timeIndexList.length && !isModalOpen
              ? `${selectedTimesObject.timeStringList[0]} - ${selectedTimesObject.timeStringList[1]}`
              : "--:-- - --:--"}
          </p>
        </button>

        {isModalOpen && (
          <MyModal>
            <div className={styles.content} ref={menuRef}>
              <div className={styles.top}>
                <p>{t("calendar.choose_time")}</p>
                <button onClick={handleCloseModal}>
                  <CancelIcon2 />
                </button>
              </div>
              <div className={styles.timeList}>
                <div className={styles.leftColumn}>
                  <div className={styles.leftGrid}>
                    {timeSlots.map((timeSlot, index) => (
                      <div
                        key={timeSlot}
                        className={`${styles.timeSlot} ${
                          selectedTimesObject.timeIndexList.includes(index)
                            ? styles.active
                            : index >
                                  Math.min(
                                    ...selectedTimesObject.timeIndexList
                                  ) &&
                                index <
                                  Math.max(...selectedTimesObject.timeIndexList)
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
                    <MyButton
                      buttons_type="button__white"
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
          </MyModal>
        )}
      </div> */}
    </>
  );
};
