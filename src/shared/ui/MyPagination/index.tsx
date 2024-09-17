import { FC } from "react";
import styles from "./styles.module.scss";

interface MyPaginationProps {
  cardIndex: number;
  count: number;
}

export const MyPagination: FC<MyPaginationProps> = ({ cardIndex, count }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.pagination}
        style={
          {
            "--count": `${count}`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`${styles.point} ${cardIndex === index ? styles.active : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
