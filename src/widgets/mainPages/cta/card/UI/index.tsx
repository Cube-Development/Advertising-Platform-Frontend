import { IOption } from "@shared/types/translate";
import { FC } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { PAGE_ANIMATION } from "@shared/config/animation";

interface OptionCardProps {
  option: IOption;
  custom: number;
}

export const OptionCard: FC<OptionCardProps> = ({ option, custom }) => {
  return (
    <motion.div
      custom={custom}
      variants={PAGE_ANIMATION.animationLeft}
      className={styles.option}
    >
      <img src={`/images/options/${option.img}`} alt="" />
      <p>{option.option}</p>
    </motion.div>
  );
};
