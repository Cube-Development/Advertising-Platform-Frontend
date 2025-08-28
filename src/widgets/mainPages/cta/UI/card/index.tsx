import { PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC } from "react";
import { ICtaOption } from "../../model";
import styles from "./styles.module.scss";

interface OptionCardProps {
  option: ICtaOption;
  custom: number;
}

export const OptionCard: FC<OptionCardProps> = ({ option, custom }) => {
  return (
    <motion.div
      custom={custom}
      variants={PAGE_ANIMATION.animationLeft}
      className={styles.option}
    >
      <option.icon color="var(--Personal-colors-light-black)" />
      <p>{option.text}</p>
    </motion.div>
  );
};
