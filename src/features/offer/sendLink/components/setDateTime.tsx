import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface SetDateTimeProps {
  date: string; // формат: "01.11.2025"
  time: string; // формат: "08:00"
  onChange: (date: string, time: string) => void;
}

export const SetDateTime: FC<SetDateTimeProps> = ({ date, time, onChange }) => {
  const { t } = useTranslation();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const refs = {
    day: useRef<HTMLInputElement>(null),
    month: useRef<HTMLInputElement>(null),
    year: useRef<HTMLInputElement>(null),
    hour: useRef<HTMLInputElement>(null),
    minute: useRef<HTMLInputElement>(null),
  };

  // При монтировании разбираем пропсы
  useEffect(() => {
    const [d, m, y] = date.split(".");
    const [h, min] = time.split(":");
    setDay(d || "");
    setMonth(m || "");
    setYear(y || "");
    setHour(h || "");
    setMinute(min || "");
  }, [date, time]);

  // Передаём наружу, когда все поля заполнены
  useEffect(() => {
    if (day && month && year && hour && minute) {
      onChange(`${day}.${month}.${year}`, `${hour}:${minute}`);
    }
  }, [day, month, year, hour, minute]);

  // Вспомогательная функция: переход вперёд
  const handleAutoFocusNext = (
    val: string,
    maxLength: number,
    nextRef?: React.RefObject<HTMLInputElement>,
  ) => {
    if (val.length === maxLength && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  // Вспомогательная функция: переход назад при удалении
  const handleBackspaceFocus = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
    prevRef?: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && value.length === 0 && prevRef?.current) {
      prevRef.current.focus();
    }
  };

  // Ограничения с задержкой
  const useDelayedClamp = (
    value: string,
    setValue: (v: string) => void,
    min: number,
    max: number,
    pad: number = 2,
  ) => {
    useEffect(() => {
      if (!value) return;
      const timeout = setTimeout(() => {
        const num = Number(value);
        if (num < min) setValue(String(min).padStart(pad, "0"));
        else if (num > max) setValue(String(max).padStart(pad, "0"));
      }, 500);
      return () => clearTimeout(timeout);
    }, [value]);
  };

  useDelayedClamp(day, setDay, 1, 31);
  useDelayedClamp(month, setMonth, 1, 12);
  useDelayedClamp(year, setYear, 2025, 9999, 4);
  useDelayedClamp(hour, setHour, 0, 23);
  useDelayedClamp(minute, setMinute, 0, 59);

  return (
    <div className="flex flex-col gap-3">
      {/* Дата */}
      <div className="flex flex-col gap-1">
        <p className="mobile-xl:text-[10px] text-[8px] font-semibold text-gray-500">
          {t("offers_blogger.offer_status.active.date")}
        </p>
        <div className="flex items-center gap-1">
          <input
            ref={refs.day}
            type="text"
            value={day}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 2);
              setDay(val);
              handleAutoFocusNext(val, 2, refs.month);
            }}
            onKeyDown={(e) => handleBackspaceFocus(e, day, undefined)}
            placeholder={t("offers_blogger.offer_status.active.days")}
            className="w-14 text-center border border-blue-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-lg">.</span>
          <input
            ref={refs.month}
            type="text"
            value={month}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 2);
              setMonth(val);
              handleAutoFocusNext(val, 2, refs.year);
            }}
            onKeyDown={(e) => handleBackspaceFocus(e, month, refs.day)}
            placeholder={t("offers_blogger.offer_status.active.months")}
            className="w-14 text-center border border-blue-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-lg">.</span>
          <input
            ref={refs.year}
            type="text"
            value={year}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setYear(val);
              handleAutoFocusNext(val, 4, refs.hour);
            }}
            onKeyDown={(e) => handleBackspaceFocus(e, year, refs.month)}
            placeholder={t("offers_blogger.offer_status.active.years")}
            className="w-20 text-center border border-blue-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Время */}
      <div className="flex flex-col gap-1">
        <p className="mobile-xl:text-[10px] text-[8px] font-semibold text-gray-500">
          {t("offers_blogger.offer_status.active.time")}
        </p>
        <div className="flex items-center gap-1">
          <input
            ref={refs.hour}
            type="text"
            value={hour}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 2);
              setHour(val);
              handleAutoFocusNext(val, 2, refs.minute);
            }}
            onKeyDown={(e) => handleBackspaceFocus(e, hour, refs.year)}
            placeholder={t("offers_blogger.offer_status.active.hours")}
            className="w-14 text-center border border-blue-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-lg">:</span>
          <input
            ref={refs.minute}
            type="text"
            value={minute}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 2);
              setMinute(val);
            }}
            onKeyDown={(e) => handleBackspaceFocus(e, minute, refs.hour)}
            placeholder={t("offers_blogger.offer_status.active.minutes")}
            className="w-14 text-center border border-blue-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};
