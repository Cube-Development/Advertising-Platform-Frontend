import { IAdminChannels } from "@entities/admin-panel";
import { SkeletonAdminChannelCard } from "@entities/admin-panel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { useAccordionObserver } from "@shared/hooks";
import { Accordion, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChannelCard } from "../card";
import styles from "./styles.module.scss";

interface ChannelsListProps {
  data?: IAdminChannels;
  isLoading: boolean;
  handleChange: () => void;
}

export const ChannelsList: FC<ChannelsListProps> = ({
  data,
  isLoading,
  handleChange,
}) => {
  const { t } = useTranslation();

  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  useAccordionObserver(accordionRefs, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.channels.bar.id")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.channels.bar.owner")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.channels.bar.platform")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.channels.bar.date")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.channels.bar.status")}</p>
        </div>
      </div>
      {!!data?.channels?.length && (
        <Accordion type="single" collapsible>
          <div className={styles.cards}>
            {data?.channels.map((card, index) => (
              <motion.div
                key={card?.channel?.id}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.ADMIN_CHANNELS}
                variants={PAGE_ANIMATION.animationUp}
              >
                <ChannelCard
                  card={card}
                  accordionRefs={accordionRefs}
                  index={index}
                />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({
                length: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
              }).map((_, index) => <SkeletonAdminChannelCard key={index} />)}
            {!data.isLast && (
              <div className={`${styles.show_more}`} onClick={handleChange}>
                {isLoading ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </div>
  );
};
