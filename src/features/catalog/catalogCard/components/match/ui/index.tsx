import { CircleHelp } from "lucide-react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import matchAnimation from "/animated/match_lottie.gif";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "@shared/hooks";

interface ChannelCardMatchProps {
  match?: number;
  variant?: "default" | "compact";
}

export const ChannelCardMatch = ({
  match,
  variant = "default",
}: ChannelCardMatchProps) => {
  const { t } = useTranslation();
  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const screen = useWindowWidth();

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
  const [currentProgress, setCurrentProgress] = useState(0);

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
        setCurrentProgress((prev) => Math.min(prev + 3, match!));
        animationFrameId = requestAnimationFrame(animateProgress);
      } else if (currentProgress > match!) {
        setCurrentProgress((prev) => Math.max(prev - 3, match!));
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();

    return () => cancelAnimationFrame(animationFrameId);
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
      const progressColor = getColor(currentProgress);

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.strokeStyle = "#eee";
        context.lineWidth = 10;
        context.stroke();

        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.strokeStyle = progressColor;
        context.lineWidth = 10;
        context.lineCap = "round";
        context.stroke();

        context.fillStyle = "#000";
        const fontSize = 30;
        context.font = `${fontSize}px TT Runs Trial`;
        const textOffset = currentProgress === 100 ? 50 : 35;

        context.fillText(
          `${currentProgress}%`,
          centerX - textOffset,
          centerY + 10,
        );
      }
    }
  }, [currentProgress, variant, screen]);

  const canvasSize = 170;

  return (
    <div
      className={`${styles.column__cross} ${variant === "compact" ? styles.compact : ""}`}
    >
      <p className="mobile-xl:block hidden">{t("platform.cross")}</p>
      <div
        ref={circleRef}
        className={`${styles.circle} ${!match && styles.no_match} ${variant === "compact" ? styles.compact : ""}`}
        onClick={handleClick}
      >
        {match ? (
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
          ></canvas>
        ) : (
          <span>
            <CircleHelp
              width={variant === "compact" ? 16 : 20}
              height={variant === "compact" ? 16 : 20}
              stroke="#bbb"
            />
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
