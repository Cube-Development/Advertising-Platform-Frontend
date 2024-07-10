import { useEffect, useState } from "react";

export const useDebounce = (
  value: number | string,
  delay: number = 500,
): number | string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);
  return debouncedValue;
};
