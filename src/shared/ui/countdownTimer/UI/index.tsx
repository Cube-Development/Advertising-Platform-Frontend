import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  date_to: string;
  time: string;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ date_to, time }) => {
  const { t } = useTranslation();
  const parts: string[] = date_to.split(".");
  const year: number = parseInt(parts[2]);
  const month: number = parseInt(parts[1]) - 1;
  const day: number = parseInt(parts[0]);
  const hour: number = parseInt(time.split(":")[0]);
  const minute: number = parseInt(time.split(":")[1]);
  const finishTime: Date = new Date(year, month, day, hour, minute, 0);
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [tick, setTick] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [timerId, setTimerID] = useState<NodeJS.Timeout | number>(0);

  useEffect(() => {
    const diff = (finishTime.getTime() - new Date().getTime()) / 1000;
    if (diff < 0) {
      setIsTimeout(true);
      return;
    }
    setDiff([
      Math.floor(diff / 86400), // дни
      Math.floor((diff / 3600) % 24),
      Math.floor((diff / 60) % 60),
      Math.floor(diff % 60),
    ]);
  }, [tick]);

  useEffect(() => {
    if (isTimeout) clearInterval(timerId);
  }, [isTimeout, timerId]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  const handleDay = (days: number) => {
    if (days < 5) {
      return t("offers_blogger.days.day");
    } else {
      return t("offers_blogger.days.days");
    }
  };

  return (
    <div className={styles.wrapper}>
      {diffDays > 1 ? (
        <span>
          {diffDays} {handleDay(diffDays)}
        </span>
      ) : (
        <span>
          {`${diffH}`.padStart(2, "0")}:{`${diffM}`.padStart(2, "0")}:
          {`${diffS}`.padStart(2, "0")}
        </span>
      )}
    </div>
  );
};
