import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface MyPaginationProps {
  cardIndex: number;
  count: number;
}

export const MyPagination: FC<MyPaginationProps> = ({ cardIndex, count }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const updateProgressWidth = () => {
      if (wrapperRef.current) {
        setProgressWidth(wrapperRef.current.offsetWidth);
        console.log(wrapperRef.current.offsetWidth);
        console.log(count);
      }
    };

    updateProgressWidth();
    window.addEventListener("resize", updateProgressWidth);

    return () => {
      window.removeEventListener("resize", updateProgressWidth);
    };
  }, [count]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {count > 1 && (
        <div
          className={styles.pagination}
          style={{ "--count": `${count}` } as React.CSSProperties}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              style={{ width: `${progressWidth / count}px` }}
              key={index}
              className={`${styles.point} ${cardIndex === index ? styles.active : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
