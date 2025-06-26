import { cn } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import styles from "./styles.module.scss";

export interface IStepProps {
  current_step: { step: number; completedStep: number };
  step: number;
  title: string;
  onChangeStep: (newStep: number) => void;
  isStart?: boolean;
  isEnd?: boolean;
}

export const StepChevron: FC<IStepProps> = ({
  current_step,
  step,
  title,
  onChangeStep = () => {},
  isStart = false,
  isEnd = false,
}) => {
  const { t } = useTranslation();
  const handleStyles = (currentFlag: number) => {
    return `${
      current_step.completedStep >= currentFlag
        ? styles.completed
        : current_step.step === currentFlag
          ? styles.active
          : current_step.completedStep + 1 === currentFlag
            ? styles.default
            : styles.disabled
    }`;
  };

  return (
    <div
      onClick={() => onChangeStep(step)}
      className={cn(current_step.completedStep + 1 >= step && styles.wrapper)}
    >
      <div className={styles.round}>
        <div
          className={cn(
            styles.flag,
            isStart && styles.start,
            isEnd && styles.end,
            handleStyles(step),
          )}
        >
          <p>
            {step} {t("add_platform.chevron.step")}
          </p>
          <span className="truncate"> {t(title)}</span>
        </div>
      </div>
    </div>
  );
};
