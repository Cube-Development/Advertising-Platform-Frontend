import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { InfoTooltip } from "../infoTooltip";
import { Input } from "../shadcn-ui";
import styles from "./styles.module.scss";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  information?: string;
  error?: FieldError;
  error_message?: string;
  isRow?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      information,
      error,
      error_message,
      isRow = true,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper} ${isRow ? "" : styles.column}`}>
        {!!label && (
          <div className={styles.left}>
            <span>{label}</span>
            {!!information && <InfoTooltip text={information} />}
          </div>
        )}

        <div className={styles.right}>
          <Input
            ref={ref}
            className={`px-[16px] py-[10px] md:px-[30px] md:py-[15px] rounded-[12px] border border-[var(--Inside-container)] bg-[var(--Personal-colors-White)] focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${className} ${!!error ? styles.error : ""}`}
            {...rest}
          />
          {!!error && <p className={styles.error_text}>{error_message}</p>}
        </div>
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";
