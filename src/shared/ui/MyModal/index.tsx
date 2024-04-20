import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";

interface MyModalProps {
  children: React.ReactNode;
}

export const MyModal: FC<MyModalProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add(styles.no__scroll);
    return () => {
      document.body.classList.remove(styles.no__scroll);
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={`${styles.modalContent} shake__animation`}>
        {children}
      </div>
    </div>
  );
};
