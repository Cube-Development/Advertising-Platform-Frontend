import { CircleHelp } from "lucide-react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import matchAnimation from "/animated/match_lottie.gif";
import { useEffect, useRef, useState } from "react";

export const ChannelCardMatch = ({ match }: { match?: number }) => {
  const { t } = useTranslation();
  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const circleClass =
    match === undefined
      ? ""
      : match <= 25
        ? styles.low
        : match <= 50
          ? styles.medium
          : match <= 75
            ? styles.high
            : styles.full;

  const colorStyle =
    match === undefined
      ? ""
      : match <= 25
        ? "#fe3430fc"
        : match <= 50
          ? "#fe9730fc"
          : match <= 75
            ? "#ffca28"
            : "#4772e6";

  const handleClick = () => {
    setShowDescription(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowDescription(false), 3000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      descriptionRef.current &&
      !descriptionRef.current.contains(event.target as Node) &&
      circleRef.current &&
      !circleRef.current.contains(event.target as Node)
    ) {
      setShowDescription(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={styles.column__cross}>
      <p>{t("platform.cross")}</p>
      <div
        ref={circleRef}
        className={`${styles.circle} ${circleClass}`}
        onClick={handleClick}
      >
        {match ? (
          <span className={styles.match} style={{ color: colorStyle }}>
            {match}%
          </span>
        ) : (
          <span>
            <CircleHelp width={20} height={20} stroke="#bbb" />
          </span>
        )}
      </div>
      <div
        ref={descriptionRef}
        className={`${styles.match_description} ${
          showDescription ? styles.visible : ""
        }`}
      >
        <img
          src={matchAnimation}
          alt="isLoading..."
          className={styles.loading__icon}
        />
        <p>{t("platform.match_description")}</p>
      </div>
    </div>
  );
};
