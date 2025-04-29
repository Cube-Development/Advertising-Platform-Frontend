import { addChannelQueries } from "@entities/channel";
import { AddChannel } from "@features/channel";
import { AccommList, StartAdv } from "@features/mainPages";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { ENUM_PATHS } from "@shared/routing";
import { IAccomm } from "@shared/types/translate";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
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
      viewport={PAGE_ANIMATION.viewport}
      className={`${styles.wrapper} container`}
    >
      <motion.h1
        custom={custom}
        variants={PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t(`${page}.why_title`)}
      </motion.h1>
      <AccommList
        accomms={
          t(`${page}.accomms_list`, { returnObjects: true }) as IAccomm[]
        }
        custom={custom}
        toDoBtn={
          page === "main_page_advertiser" ? (
            <StartAdv props={{ className: styles.button }} />
          ) : (
            <AddChannel
              // path={`${paths.addChannel}?add_channel=${addChannelQueries.main}`}
              path={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                [queryParamKeys.addChannel]: addChannelQueries.main,
              })}
              orange
            />
          )
        }
      />
    </motion.section>
  );
};
