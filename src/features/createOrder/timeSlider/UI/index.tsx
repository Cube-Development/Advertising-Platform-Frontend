import { TimeListProps } from "@entities/project";
import { ClockIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  CustomCloseButton,
  SliderDouble,
} from "@shared/ui";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  MAX_MINS,
  MIN_GAP,
  STEP,
  ceilToStep,
  computeDefaults,
  computeMinValue,
  correctTimeRange,
  floorToStep,
  formatDuration,
  formatTime,
  parseTime,
} from "../lib/timeUtils";

const TICKS = ["00:00", "06:00", "12:00", "18:00", "23:59"];

export const TimeSlider: FC<TimeListProps> = ({
  onChange,
  startTime,
  selectedDate,
  platform,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const minValue = useMemo(
    () => computeMinValue(selectedDate, platform),
    [selectedDate, platform],
  );

  const [sliderValue, setSliderValue] = useState<[number, number]>(() => {
    const min = computeMinValue(selectedDate, platform);
    if (startTime?.length === 2) {
      const { start, end } = correctTimeRange(
        [startTime[0], startTime[1]],
        min,
      );
      return [start, end];
    }
    return computeDefaults(min);
  });

  const userHasSelected = useRef(false);
  const prevStartTimeKey = useRef<string>("");

  // ---------- Синхронизация при изменении startTime / minValue ----------

  useEffect(() => {
    const key = startTime?.join(",") || "";

    if (key !== prevStartTimeKey.current) {
      userHasSelected.current = false;
      prevStartTimeKey.current = key;
    }

    if (userHasSelected.current) return;

    if (startTime?.length === 2) {
      const { start, end, wasChanged } = correctTimeRange(
        [startTime[0], startTime[1]],
        minValue,
      );

      setSliderValue([start, end]);

      // Если время было скорректировано — сохраняем в форму
      if (wasChanged) {
        onChange([formatTime(start), formatTime(end)]);
      }
    } else {
      setSliderValue(computeDefaults(minValue));
    }
  }, [startTime, minValue]);

  // ---------- Обработчик изменения слайдера ----------

  const handleSliderChange = useCallback(
    (value: number[]) => {
      let [start, end] = value;

      // Clamp к minValue (нельзя двигать в «прошедшую» зону)
      if (start < minValue) start = minValue;

      // Определяем какой thumb двигали
      const startMoved = start !== sliderValue[0];
      const endMoved = end !== sliderValue[1];

      // Обеспечиваем минимальный зазор — подталкиваем соседний thumb
      if (end - start < MIN_GAP) {
        if (startMoved) {
          // Двигали левый → подталкиваем правый
          end = start + MIN_GAP;
          if (end > MAX_MINS) {
            end = MAX_MINS;
            start = end - MIN_GAP;
          }
        } else if (endMoved) {
          // Двигали правый → подталкиваем левый
          start = end - MIN_GAP;
          if (start < minValue) {
            start = minValue;
            end = start + MIN_GAP;
          }
        }
      }

      // Финальный clamp
      start = Math.max(minValue, start);
      end = Math.min(MAX_MINS, end);

      setSliderValue([start, end]);
    },
    [minValue, sliderValue],
  );

  // ---------- Подтверждение ----------

  const handleConfirm = () => {
    userHasSelected.current = true;
    const timeList = [formatTime(sliderValue[0]), formatTime(sliderValue[1])];
    onChange(timeList);
    setIsOpen(false);
  };

  // ---------- Отображаемый текст ----------

  const displayText =
    startTime?.length === 2 || userHasSelected.current
      ? `${formatTime(sliderValue[0])} - ${formatTime(sliderValue[1])}`
      : "--:-- - --:--";

  const duration = sliderValue[1] - sliderValue[0];

  // Процент «заблокированной» зоны для визуальной индикации
  const disabledPercent = (minValue / MAX_MINS) * 100;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="grid grid-flow-col items-center gap-2.5 justify-between max-md:w-5 max-md:justify-center max-[576px]:flex max-[576px]:w-full max-[576px]:justify-between">
          <div className="w-6 max-md:w-5 max-[576px]:w-6 [&>svg]:w-full [&>svg]:h-auto">
            <ClockIcon />
          </div>
          <p className="text-sm font-medium whitespace-nowrap leading-normal gradient_color max-md:text-[10px] max-[576px]:text-sm">
            {displayText}
          </p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="grid items-center justify-stretch grid-flow-row rounded-[25px] bg-white w-[90%] max-w-[600px] p-0 gap-0">
        <AlertDialogDescription className="sr-only">
          {t("calendar.choose_time")}
        </AlertDialogDescription>
        <AlertDialogTitle className="text-2xl font-medium py-5 px-[50px] relative text-center max-lg:text-xl">
          <p className="gradient_color">{t("calendar.choose_time")}</p>
          <AlertDialogCancel
            type="button"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <CustomCloseButton />
          </AlertDialogCancel>
        </AlertDialogTitle>

        <div className="grid grid-flow-row gap-5 px-5 pb-5">
          {/* Бейджи С / До + длительность */}
          <div className="flex items-center justify-between gap-3 max-sm:gap-1.5">
            <div className="border border-[var(--Personal-colors-main)] rounded-xl py-2 px-5 max-sm:px-3 max-sm:py-1.5 min-w-[90px] max-sm:min-w-[70px] text-center flex flex-col items-center justify-center gap-0.5">
              <Trans
                i18nKey="time_slider.from"
                values={{ time: formatTime(sliderValue[0]) }}
                components={[
                  <div
                    key="0"
                    className="text-[11px] max-sm:text-[9px] text-[var(--Personal-colors-main)] font-medium tracking-wider uppercase whitespace-nowrap"
                  />,
                  <div
                    key="1"
                    className="text-xl max-sm:text-lg font-medium gradient_color tracking-wider tabular-nums whitespace-nowrap"
                  />,
                ]}
              />
            </div>

            <div className="bg-[var(--Personal-colors-main)] text-white rounded-[20px] py-1.5 px-4 max-sm:px-2.5 max-sm:py-1 max-sm:text-[11px] text-[13px] font-medium whitespace-nowrap">
              {formatDuration(
                duration,
                t("time_slider.hour"),
                t("time_slider.min"),
              )}
            </div>

            <div className="border border-[var(--Personal-colors-main)] rounded-xl py-2 px-5 max-sm:px-3 max-sm:py-1.5 min-w-[90px] max-sm:min-w-[70px] text-center flex flex-col items-center justify-center gap-0.5">
              <Trans
                i18nKey="time_slider.to"
                values={{ time: formatTime(sliderValue[1]) }}
                components={[
                  <div
                    key="0"
                    className="text-[11px] max-sm:text-[9px] text-[var(--Personal-colors-main)] font-medium tracking-wider uppercase whitespace-nowrap"
                  />,
                  <div
                    key="1"
                    className="text-xl max-sm:text-lg font-medium gradient_color tracking-wider tabular-nums whitespace-nowrap"
                  />,
                ]}
              />
            </div>
          </div>

          {/* Слайдер */}
          <div className="relative py-3 px-1">
            {/* Искусственный трек с градиентом (лежит под прозрачным нативным треком) */}
            <div
              className="absolute top-1/2 left-1 right-1 h-1.5 -translate-y-1/2 rounded-full z-0 pointer-events-none"
              style={{
                background:
                  minValue > 0
                    ? `linear-gradient(to right, #e7e7e7ff ${disabledPercent}%, rgba(11, 173, 194, 0.5) ${disabledPercent}%)`
                    : "rgba(11, 173, 194, 0.5)",
              }}
            />
            <SliderDouble
              min={0}
              max={MAX_MINS}
              step={STEP}
              value={sliderValue}
              onValueChange={handleSliderChange}
              className="w-full relative z-10 [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-[var(--Personal-colors-main)] [&_[data-slot=slider-thumb]]:relative [&_[data-slot=slider-thumb]]:z-10 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[var(--Personal-colors-main)] [&_[data-slot=slider-thumb]]:shadow-[0_0_0_3px_rgba(29,158,117,0.15)] [&_[data-slot=slider-thumb]:hover]:shadow-[0_0_0_5px_rgba(29,158,117,0.2)] [&_[data-slot=slider-thumb]:active]:shadow-[0_0_0_7px_rgba(29,158,117,0.25)]"
            />
          </div>

          {/* Тики */}
          <div className="flex justify-between -mt-3">
            {TICKS.map((tick) => (
              <span
                key={tick}
                className="text-[11px] text-gray-400 tabular-nums select-none"
              >
                {tick}
              </span>
            ))}
          </div>

          {/* Кнопка подтверждения */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full mt-2 py-3 bg-transparent border border-[var(--Personal-colors-main)] rounded-xl text-[var(--Personal-colors-main)] text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-[var(--Personal-colors-main)] hover:text-white active:scale-[0.98]"
          >
            {t("time_slider.confirm")}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
