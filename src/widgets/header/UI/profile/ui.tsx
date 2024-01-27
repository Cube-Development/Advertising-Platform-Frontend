import { FC } from "react";
import styles from "./styles.module.scss";

export const Profile: FC = () => {
  return (
    <div className={styles.profile}>
      <img src="./images/header/profile.svg" alt="" />
    </div>);
};
