import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export const ChannelCardDescription = ({
  description,
}: {
  description: string;
}) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight || "1.2",
      );
      const maxLinesHeight = 3 * lineHeight;

      if (descriptionRef.current.scrollHeight > maxLinesHeight) {
        setIsOverflowing(true);
      }
    }
  }, [description]);

  return (
    <div className={styles.description}>
      <p
        ref={descriptionRef}
        className={`${styles.description__text} ${isExpanded ? styles.expanded : ""}`}
      >
        {description}
      </p>
      {isOverflowing && (
        <div className={styles.description__toggle} onClick={toggleExpand}>
          {isExpanded ? `...${t("cart.hide")}` : `${t("cart.show")}...`}
        </div>
      )}
    </div>
  );
};
