import React, { FC } from "react";
import styles from "./styles.module.scss";

interface MyModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (bool: boolean) => void;
}

export const MyModal: FC<MyModalProps> = ({
  children,
  visible,
  setVisible,
}) => {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
