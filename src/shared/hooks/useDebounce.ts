import { useEffect, useState } from "react";

export const useDebounce = (
  value: number | string | boolean | null | any,
  delay: number = 500,
): number | string | boolean | null | any => {
  const [debouncedValue, setDebouncedValue] = useState<
    number | string | boolean | null | any
  >(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return debouncedValue || null;
};
