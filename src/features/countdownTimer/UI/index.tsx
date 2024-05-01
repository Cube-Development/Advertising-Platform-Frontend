import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface CountdownTimerProps {
  date_to: string;
  time: string;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ date_to, time }) => {
  const parts: string[] = date_to.split(".");
  const year: number = parseInt(parts[2]);
  const month: number = parseInt(parts[1]) - 1;
  const day: number = parseInt(parts[0]);
  const hour: number = parseInt(time.split(":")[0]);
  const minute: number = parseInt(time.split(":")[1]);
  const finishTime: Date = new Date(year, month, day, hour, minute, 0);
  //   console.log("date", date);
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [tick, setTick] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [timerId, setTimerID] = useState<NodeJS.Timeout | number>(0);

  useEffect(() => {
    const diff = (finishTime.getTime() - new Date().getTime()) / 1000;
    // console.log(finishTime, diff)
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
    console.log("timerID", timerID);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <div className={styles.wrapper}>
      {diffDays > 1 ? (
        <p>{diffDays}</p>
      ) : (
        <p>
          {`${diffH}`.padStart(2, "0")}:{`${diffM}`.padStart(2, "0")}:
          {`${diffS}`.padStart(2, "0")}
        </p>
      )}
    </div>
  );
};
