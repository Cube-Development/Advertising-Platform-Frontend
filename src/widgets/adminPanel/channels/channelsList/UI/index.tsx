import { IAdminChannelData } from "@entities/admin";
import { accordionTypes } from "@shared/config";
import { Accordion } from "@shared/ui";
import { FC, useEffect, useRef } from "react";
import { ChannelCard } from "../card";
import styles from "./styles.module.scss";

interface ChannelsListProps {
  channels: IAdminChannelData[];
}

export const ChannelsList: FC<ChannelsListProps> = ({ channels }) => {
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
  }, []);

  return (
    <div className={styles.wrapper}>
      {channels?.length ? (
        <Accordion type="single" collapsible>
          <div className={styles.cards}>
            {channels.map((card, index) => (
              <div key={index}>
                <ChannelCard
                  card={card}
                  accordionRefs={accordionRefs}
                  index={index}
                />
              </div>
            ))}
          </div>
        </Accordion>
      ) : (
        <div></div>
      )}
    </div>
  );
};
