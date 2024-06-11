import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";

interface DinamicPaginationProps {
  onChange: () => void;
}

export const DinamicPagination: FC<DinamicPaginationProps> = ({ onChange }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "500px 0px",
  });

  useEffect(() => {
    if (inView) {
      onChange();
    }
  }, [inView]);

  return <div ref={ref} className={styles.wrapper}></div>;
};
