import { CircleHelp } from "lucide-react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import matchAnimation from "/animated/match_lottie.gif";

export const ChannelCardMatch = ({ match }: { match?: number }) => {
  const { t } = useTranslation();

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

  return (
    <div className={styles.column__cross}>
      <p>{t("platform.cross")}</p>
      <div className={`${styles.circle} ${circleClass}`}>
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
      <div className={styles.match_description}>
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
