import { type FC } from "react";
import { Counter } from "@shared/ui/counter";
import { motion } from "framer-motion";
import { PAGE_ANIMATION } from "@shared/config";
import { cn } from "@shared/ui";
import styles from "./styles.module.scss";
import { platformTypesNum } from "@entities/platform";

interface IPlatformCardProps {
  count: number;
  icon: any;
  custom: number;
  platform: platformTypesNum;
}

export const PlatformCard: FC<IPlatformCardProps> = ({
  count,
  icon: Icon,
  custom,
  platform,
}) => {
  const platformStyle: Record<platformTypesNum, string> = {
    [platformTypesNum.telegram]: styles.telegram,
    [platformTypesNum.instagram]: styles.instagram,
    [platformTypesNum.youtube]: styles.youtube,
    [platformTypesNum.site]: styles.site,
  };

  return (
    <motion.div
      custom={custom}
      variants={PAGE_ANIMATION.animationUp}
      className={cn(styles.info, platformStyle[platform])}
    >
      <Icon />
      <div className={styles.count}>
        <Counter val={count} time={2} />
      </div>
    </motion.div>
  );
};
