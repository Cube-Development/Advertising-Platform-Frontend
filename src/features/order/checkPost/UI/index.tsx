import { IOrderFeature } from "@entities/project";
import { Check, CircleCheckBig, Copy } from "lucide-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const COPIED_TIMEOUT_MS = 2000;

export const CheckPost: FC<IOrderFeature> = ({ url }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!url || isCopied) return;

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setIsCopied(false),
        COPIED_TIMEOUT_MS,
      );
    } catch {
      /* clipboard unavailable */
    }
  }, [url, isCopied]);

  if (!url) return null;

  return (
    <div className={`${styles.wrapper} w-full`}>
      <div className={styles.labelRow}>
        <CircleCheckBig className={styles.icon__label} aria-hidden />
        <p className={styles.label}>{t("order_btn.postLink.label")}</p>
      </div>

      {isCopied ? (
        <div className={styles.row}>
          <Check className={styles.icon__success} aria-hidden />
          <span className={styles.copied}>{t("copy.default")}</span>
        </div>
      ) : (
        <div className={styles.row}>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label={t("copy.default")}
          >
            <Copy className={styles.icon__copy} aria-hidden />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
};
