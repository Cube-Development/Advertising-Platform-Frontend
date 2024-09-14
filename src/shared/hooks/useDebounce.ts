import { useEffect, useState } from "react";

export const useDebounce = (
  value: number | string | null,
  delay: number = 500,
): number | string | null => {
  const [debouncedValue, setDebouncedValue] = useState<number | string | null>(
    value,
  );

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
