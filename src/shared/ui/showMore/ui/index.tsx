import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { forwardRef } from "react";

export const ShowMoreBtn = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { t } = useTranslation();
  return (
    <button ref={ref} className={styles.btn} {...props}>
      <p className="gradient_color">{t("pagination.show_more")}</p>
    </button>
  );
});

ShowMoreBtn.displayName = "ShowMoreBtn";
