import { AccommList } from "src/features old/accommList";
import { AddPlatform } from "src/features old/addPlatform";
import { StartAdv } from "src/features old/startAdv";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { paths } from "@shared/routing";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface WhyChooseUsProps {
  page: string;
}
const custom = 0;

export const WhyChooseUs: FC<WhyChooseUsProps> = ({ page }) => {
  const { t } = useTranslation();
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      className={`${styles.wrapper} container`}
    >
      <motion.h1
        custom={custom}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t(`${page}.why_title`)}
      </motion.h1>
      <AccommList
        accomms={t(`${page}.accomms_list`, { returnObjects: true })}
        custom={custom}
        toDoBtn={
          page === "main_page_advertiser" ? (
            <StartAdv props={{ className: styles.button }} />
          ) : (
            <AddPlatform
              path={`${paths.addChannel}?add_channel=${addChannelQueries.main}`}
              props={{ className: styles.button }}
            />
          )
        }
      />
    </motion.section>
  );
};
