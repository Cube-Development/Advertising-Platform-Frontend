import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { IAccomm } from "@shared/types/translate";
import { motion } from "framer-motion";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { AccommCard } from "../accommCard";

interface AccommProps {
  accomms: IAccomm[];
  toDoBtn: ReactElement;
  custom: number;
}

export const AccommList: FC<AccommProps> = ({ accomms, toDoBtn, custom }) => {
  return (
    <div className={styles.why__row}>
      {accomms.map((accomm, index) => (
        <motion.div
          key={index}
          custom={custom}
          variants={MAIN_PAGE_ANIMATION.animationVision}
        >
          <AccommCard accomm={accomm} toDoBtn={toDoBtn} />
        </motion.div>
      ))}
    </div>
  );
};
