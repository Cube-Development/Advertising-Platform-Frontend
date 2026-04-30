import { TimeListProps } from "@entities/project";
import { platformTypesNum } from "@entities/platform";
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

const STEP = 5; // шаг слайдера — 5 минут
const MAX_MINS = 1440; // 24:00
const MIN_GAP = 120; // минимальный зазор — 2 часа

const TICKS = ["00:00", "06:00", "12:00", "18:00", "23:59"];

/** Округление вверх до ближайшего шага */
const ceilToStep = (minutes: number): number =>
  Math.ceil(minutes / STEP) * STEP;

/** Округление вниз до ближайшего шага */
const floorToStep = (minutes: number): number =>
  Math.floor(minutes / STEP) * STEP;

/** Минуты → "HH:MM" */
const formatTime = (mins: number): string => {
  if (mins >= 1440) return "23:59";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/** "HH:MM" → минуты */
const parseTime = (time: string): number => {
  if (time === "23:59" || time === "24:00") return 1440;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Длительность в читаемом виде */
const formatDuration = (
  mins: number,
  tHour: string,
  tMin: string,
): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} ${tMin}`;
  if (m === 0) return `${h} ${tHour}`;
  return `${h} ${tHour} ${m} ${tMin}`;
};

/** Вычислить minValue на основе даты и платформы */
const computeMinValue = (
  selectedDate: string | undefined,
  platform: platformTypesNum | undefined,
): number => {
  if (!selectedDate) return 0;

  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`;

  if (selectedDate !== todayFormatted) return 0;

  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  // const offset = platform === platformTypesNum.telegram ? 120 : 0;
  const offset = 0;
  const min = ceilToStep(nowMinutes) + MIN_GAP + offset;

  return Math.min(min, MAX_MINS - MIN_GAP);
};

/** Вычислить валидные дефолтные значения */
const computeDefaults = (
  minVal: number,
): [number, number] => {
  const start = Math.max(minVal, 480); // 08:00 или minValue
  const end = Math.min(start + 360, MAX_MINS); // желаемый диапазон 6 часов (360 минут)
  return [start, end];
};

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
      let start = floorToStep(parseTime(startTime[0]));
      let end = ceilToStep(parseTime(startTime[1]));
      if (start < min) start = min;
      if (end < start + MIN_GAP) end = start + MIN_GAP;
      if (end > MAX_MINS) {
        end = MAX_MINS;
        start = Math.max(min, end - MIN_GAP);
      }
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
      let start = floorToStep(parseTime(startTime[0]));
      let end = ceilToStep(parseTime(startTime[1]));

      if (start < minValue) start = minValue;
      if (end < start + MIN_GAP) end = start + MIN_GAP;
      if (end > MAX_MINS) {
        end = MAX_MINS;
        start = Math.max(minValue, end - MIN_GAP);
      }

      setSliderValue([start, end]);
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

  const displayText = useMemo(() => {
    if (startTime?.length === 2 || userHasSelected.current) {
      return `${formatTime(sliderValue[0])} - ${formatTime(sliderValue[1])}`;
    }
    return "--:-- - --:--";
  }, [sliderValue, startTime]);

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
                  <div key="0" className="text-[11px] max-sm:text-[9px] text-[var(--Personal-colors-main)] font-medium tracking-wider uppercase whitespace-nowrap" />,
                  <div key="1" className="text-xl max-sm:text-lg font-medium gradient_color tracking-wider tabular-nums whitespace-nowrap" />
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
                  <div key="0" className="text-[11px] max-sm:text-[9px] text-[var(--Personal-colors-main)] font-medium tracking-wider uppercase whitespace-nowrap" />,
                  <div key="1" className="text-xl max-sm:text-lg font-medium gradient_color tracking-wider tabular-nums whitespace-nowrap" />
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
                background: minValue > 0 
                  ? `linear-gradient(to right, #e7e7e7ff ${disabledPercent}%, rgba(11, 173, 194, 0.5) ${disabledPercent}%)` 
                  : "rgba(11, 173, 194, 0.5)"
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
