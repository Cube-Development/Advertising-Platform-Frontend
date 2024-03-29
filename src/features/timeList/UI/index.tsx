import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { CancelIcon2, ClockIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";

interface TimeListProps {}

interface ITIme {
  timeIndexList: number[];
  timeStringList: string[];
}

export const TimeList: FC<TimeListProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    "23:00 - 24:00",
  ];

  const selectTime = (timeIndex: number) => {
    if (
      selectedTimesObject.timeIndexList.length === 0 ||
      selectedTimesObject.timeIndexList.includes(timeIndex)
    ) {
      setSelectedTimeObject({
        timeIndexList:
          selectedTimesObject.timeIndexList.length === 1 ? [] : [timeIndex],
        timeStringList:
          selectedTimesObject.timeIndexList.length === 1
            ? []
            : timeSlots[timeIndex].split(" - "),
      });
    } else if (selectedTimesObject.timeIndexList.length < 2) {
      const newIndex = [...selectedTimesObject.timeIndexList, timeIndex].sort(
        (a, b) => a - b,
      );
      setSelectedTimeObject({
        timeIndexList: newIndex,
        timeStringList: [
          timeSlots[newIndex[0]].split(" - ")[0],
          timeSlots[newIndex[1]].split(" - ")[1],
        ],
      });
    } else {
      setSelectedTimeObject({
        timeIndexList: [timeIndex],
        timeStringList: timeSlots[timeIndex].split(" - "),
      });
    }
  };

  // const selectTime = (timeIndex: number) => {
  //   if (selectedTimesObject.timeIndexList.length === 0) {
  //     setSelectedTimeObject({
  //       timeIndexList: [timeIndex],
  //       timeStringList: timeSlots[timeIndex].split(" - "),
  //     });
  //   } else if (
  //     !selectedTimesObject.timeIndexList.includes(timeIndex) &&
  //     selectedTimesObject.timeIndexList.length !== 2
  //   ) {
  //     const newIndex = [...selectedTimesObject.timeIndexList, timeIndex].sort(
  //       (a, b) => a - b
  //     );
  //     const firstPart: string = timeSlots[newIndex[0]].split(" - ")[0];
  //     const secondPart: string = timeSlots[newIndex[1]].split(" - ")[1];
  //     setSelectedTimeObject({
  //       timeIndexList: newIndex,
  //       timeStringList: [firstPart, secondPart],
  //     });
  //   } else if (
  //     selectedTimesObject.timeIndexList.includes(timeIndex) &&
  //     selectedTimesObject.timeIndexList.length === 1
  //   ) {
  //     setSelectedTimeObject({
  //       timeIndexList: [],
  //       timeStringList: [],
  //     });
  //   } else {
  //     setSelectedTimeObject({
  //       timeIndexList: [timeIndex],
  //       timeStringList: timeSlots[timeIndex].split(" - "),
  //     });
  //   }

  //   // if (selectedTimesIndex.includes(timeIndex) ){
  //   //     setSelectedTimesIndex(

  //   //           );
  //   // } else{
  //   //     setSelectedTimesIndex([...selectedTimesIndex, timeIndex].sort((a, b) => a - b))
  //   // }

  //   // if (selectedTimes.includes(timeSlot)) {
  //   //   setSelectedTimes(
  //   //     selectedTimes.filter((selectedTime) => selectedTime !== timeSlot)
  //   //   );
  //   // } else {
  //   //   setSelectedTimes([...selectedTimes, timeSlot]);
  //   // }
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedTimeObject({
      timeIndexList: [],
      timeStringList: [],
    });
    setIsModalOpen(false);
  };
  const continueAction = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={styles.wrapper} onClick={handleOpenModal}>
        <ClockIcon />
        <p>
          {selectedTimesObject.timeIndexList.length && !isModalOpen
            ? `${selectedTimesObject.timeStringList[0]} - ${selectedTimesObject.timeStringList[1]}`
            : "--:-- - --:--"}
        </p>
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={`${styles.modalContent} shake__animation`}>
            <div className={styles.top}>
              <p>{t("calendar.choose")}</p>
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
                                  ...selectedTimesObject.timeIndexList,
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
                  <MyButton className={styles.button} onClick={continueAction}>
                    <p>{t("calendar.confirm")}</p>
                  </MyButton>
                </div>
              </div>

              {/* <div className={styles.rightColumn}>
                <div
                  className={`${styles.rightGrid} ${selectedTimes.length > 12 ? styles.scroll : ""}`}
                >
                  {selectedTimes.map((selectedTime) => (
                    <div
                      key={selectedTime}
                      className={`${styles.timeSlot} ${styles.active}`}
                    >
                      <p>{selectedTime}</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
