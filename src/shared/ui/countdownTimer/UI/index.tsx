import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  date_to: string;
  time: string;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ date_to, time }) => {
  const { t } = useTranslation();

  // Парсим дату и время из строк
  const parts: string[] = date_to.split(".");
  const year: number = parseInt(parts[2]);
  const month: number = parseInt(parts[1]) - 1;
  const day: number = parseInt(parts[0]);
  const hour: number = parseInt(time.split(":")[0]);
  const minute: number = parseInt(time.split(":")[1]);

  const finishTime: Date = new Date(year, month, day, hour, minute, 0);

  // Состояния для отображения
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    const updateDiff = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Проверка даты
      if (
        currentYear > year ||
        (currentYear === year && currentMonth > month) ||
        (currentYear === year && currentMonth === month && currentDay > day)
      ) {
        setIsTimeout(true);
        setDiff([0, 0, 0, 0]);
        return;
      } else if (
        currentDay === day &&
        currentMonth === month &&
        currentYear === year &&
        currentHours > hour
      ) {
        setIsTimeout(true);
        setDiff([0, 0, 0, 0]);
        return;
      } else if (
        currentDay === day &&
        currentMonth === month &&
        currentYear === year &&
        currentHours === hour &&
        currentMinutes > minute
      ) {
        setIsTimeout(true);
        setDiff([0, 0, 0, 0]);
        return;
      }

      const diff = (finishTime.getTime() - now.getTime()) / 1000;

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff / 3600) % 24);
      const minutes = Math.floor((diff / 60) % 60);
      const seconds = Math.floor(diff % 60);

      setDiff([days, hours, minutes, seconds]);
    };

    // Запускаем интервал и обновляем состояние каждую секунду
    const timerId = setInterval(updateDiff, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(timerId);
  }, [finishTime]);

  const handleDay = (days: number) => {
    return days === 1
      ? t("offers_blogger.days.day")
      : days > 1 && days < 5
        ? t("offers_blogger.days.dayss")
        : t("offers_blogger.days.days");
  };

  return (
    <div className={styles.wrapper}>
      {isTimeout ? (
        <span>00:00:00</span>
      ) : diffDays >= 1 ? (
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
