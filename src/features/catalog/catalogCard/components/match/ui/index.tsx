import { CircleHelp } from "lucide-react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import matchAnimation from "/animated/match_lottie.gif";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "@shared/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/shadcn-ui";
import { BREAKPOINT } from "@shared/config";

interface ChannelCardMatchProps {
  match?: number;
  variant?: "default" | "compact";
}

export const ChannelCardMatch = ({
  match,
  variant = "default",
}: ChannelCardMatchProps) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(id);
  }, [open]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const getColor = (value: number) => {
    return value <= 25
      ? "#fe3430fc"
      : value <= 50
        ? "#fe9730fc"
        : value <= 75
          ? "#ffca28"
          : "#0BADC2";
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          type="button"
          className={`${styles.circle} ${!match && styles.no_match} ${variant === "compact" ? styles.compact : ""}`}
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
        </PopoverTrigger>
        <PopoverContent
          side={screen > BREAKPOINT.MD ? "right" : "top"}
          className={styles.match_description}
        >
          <div className="grid grid-cols-[40px,1fr] items-center justify-start gap-2">
            <img
              src={matchAnimation}
              alt="isLoading..."
              className="w-10 h-10"
            />
            <p className="!text-[#0AA5BE] font-medium mobile-xl:!text-[10px] !text-[9px] mobile-xl:!leading-4 !leading-2 mobile-xl:!text-center !text-start">
              {t("platform.match_description")}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
