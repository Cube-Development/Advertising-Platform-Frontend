import { FC, useEffect, useState } from "react";

interface CounterProps {
  val: string | number;
  time: number;
}

export const Counter: FC<CounterProps> = ({ val, time }) => {
  const [currVal, setCurrVal] = useState<number>(0);

  useEffect(() => {
    const increaseValue = () => {
      setCurrVal((prevVal) => {
        const nextVal =
          parseFloat(prevVal.toString().replace(/[^\d.,]/g, "")) + 1;
        return parseFloat(nextVal.toFixed(2));
      });
    };

    const cleanVal = parseFloat(val.toString().replace(/[^\d.,]/g, ""));

    if (!isNaN(currVal) && parseFloat(currVal.toString()) !== cleanVal) {
      const adjustedTime = cleanVal < 9999 ? time : time * 0.01;
      const timerId = setTimeout(increaseValue, adjustedTime);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [currVal, val, time]);

  if (typeof val === "string" && val.match(/[a-zA-Zа-яА-Я]/)) {
    return <div>{val}</div>;
  }

  const formattedValue = currVal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return <div>{formattedValue}+</div>;
};
