import { PAGE_ANIMATION } from "@shared/config/animation";
import { IBasicInfo } from "@shared/types/translate";
import { Counter } from "@shared/ui/counter";
import { motion } from "framer-motion";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ServiceCardProps {
  info: IBasicInfo;
  custom: number;
}

export const ServiceCard: FC<ServiceCardProps> = ({ info, custom }) => {
  return (
    <motion.div
      custom={custom}
      variants={PAGE_ANIMATION.animationUp}
      className={styles.info}
    >
      <img src={`/images/basicInfo/${info.img}`} alt="" />
      <div className={styles.count}>
        <Counter val={info.count} time={2} />
      </div>
      <span className={styles.text}>{info.info}</span>
    </motion.div>
  );
};
