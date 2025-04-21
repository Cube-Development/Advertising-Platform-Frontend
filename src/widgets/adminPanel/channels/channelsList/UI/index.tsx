import { IAdminChannels } from "@entities/admin";
import {
  accordionTypes,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChannelCard, SkeletonAdminChannelCard } from "../card";
import styles from "./styles.module.scss";

interface ChannelsListProps {
  data?: IAdminChannels;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
}

export const ChannelsList: FC<ChannelsListProps> = ({
  data,
  isLoading,
  isFetching,
  handleChange,
}) => {
  const { t } = useTranslation();
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    accordionRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.arrow svg`);
          if (state === accordionTypes.open) {
            ref.classList.add(styles.active);
            if (icon) icon.classList.add("rotate");
            if (icon) icon.classList.remove("rotate__down");
          } else {
            if (icon) icon.classList.add("rotate__down");
            if (icon) icon.classList.remove("rotate");
            ref.classList.remove(styles.active);
          }
        });
        observer.observe(ref, {
          attributes: true,
          attributeFilter: ["data-state"],
        });
        return () => observer.disconnect();
      }
    });
  }, [data]);

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
      {data?.channels?.length ? (
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
            {(isFetching || isLoading) &&
              Array.from({
                length: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
              }).map((_, index) => <SkeletonAdminChannelCard key={index} />)}
            {!data.isLast && (
              <div className={`${styles.show_more}`} onClick={handleChange}>
                {isLoading || isFetching ? (
                  <SpinnerLoaderSmall />
                ) : (
                  <ShowMoreBtn />
                )}
              </div>
            )}
          </div>
        </Accordion>
      ) : (
        <div></div>
      )}
    </div>
  );
};
