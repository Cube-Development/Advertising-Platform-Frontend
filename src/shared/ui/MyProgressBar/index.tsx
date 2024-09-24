import styles from "./styles.module.scss";

interface MyProgressBarProps {
  progress: number;
}

export const MyProgressBar: React.FC<MyProgressBarProps> = ({ progress }) => {
  const radius = 10;
  const strokeWidth = 2; // Толщина линии круга
  const circumference = 2 * Math.PI * radius; // Длина окружности
  const size = radius * 2 + strokeWidth * 2; // Размер SVG (учитываем радиус и толщину линии со всех сторон)
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className={styles.circle__progress__bar}>
      <svg width={size} height={size}>
        <circle
          className={styles.circle__background}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.circle__progress}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {/* <div className={styles.progress__text}>{progress}%</div> */}
    </div>
  );
};
