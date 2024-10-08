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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0); // Текущий прогресс для анимации

  // Выбор цвета в зависимости от значения match
  const getColor = (value: number) => {
    return value <= 25
      ? "#fe3430fc"
      : value <= 50
        ? "#fe9730fc"
        : value <= 75
          ? "#ffca28"
          : "#4772e6";
  };

  useEffect(() => {
    let animationFrameId: number;
    const animateProgress = () => {
      if (currentProgress < match!) {
        setCurrentProgress((prev) => Math.min(prev + 3, match!)); // Плавное увеличение прогресса
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animateProgress(); // Запуск анимации

    return () => cancelAnimationFrame(animationFrameId); // Очистка анимации при размонтировании
  }, [match]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (currentProgress / 100) * 2 * Math.PI;
      const progressColor = getColor(currentProgress); // Цвет прогресса

      if (context) {
        // Очищаем canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем задний круг
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.strokeStyle = "#eee";
        context.lineWidth = 10;
        context.stroke();

        // Рисуем круг прогресса
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.strokeStyle = progressColor; // Применяем динамический цвет
        context.lineWidth = 10;
        context.lineCap = "round";
        context.stroke();

        // Рисуем текст с процентом
        context.fillStyle = "#000";
        // context.font =
        //   screen > BREAKPOINT.SM ? "30px TT Runs Trial" : "24px TT Runs Trial";
        context.font = "30px TT Runs Trial";
        context.fillText(
          `${currentProgress}%`,
          centerX - (match! === 100 ? 50 : 35),
          centerY + 10,
        );
      }
    }
  }, [currentProgress]);

  return (
    <div className={styles.column__cross}>
      <p>{t("platform.cross")}</p>
      <div
        ref={circleRef}
        className={`${styles.circle} ${!match && styles.no_match}`}
        onClick={handleClick}
      >
        {match ? (
          <canvas ref={canvasRef} width={170} height={170}></canvas>
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
