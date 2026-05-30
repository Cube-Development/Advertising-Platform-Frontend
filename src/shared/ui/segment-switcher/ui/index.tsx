import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

import styles from "./styles.module.scss";

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
}

interface SegmentSwitcherProps<T extends string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
}

export const SegmentSwitcher = <T extends string>({
  value,
  options,
  onChange,
  disabled,
  className,
}: SegmentSwitcherProps<T>) => {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      className={clsx(styles.switcher, disabled && styles.locked, className)}
    >
      <ul
        className={styles.list}
        style={
          {
            "--optionsCount": options.length,
            "--activeIndex": activeIndex,
          } as CSSProperties
        }
      >
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <li
              key={option.value}
              className={clsx(styles.item, isActive && styles.active)}
              onClick={() => {
                if (disabled || isActive) return;
                onChange(option.value);
              }}
            >
              {option.icon && (
                <span className={styles.icon} aria-hidden>
                  {option.icon}
                </span>
              )}
              <span className={styles.label}>{option.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
