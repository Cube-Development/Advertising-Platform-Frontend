import { IFAQInformation } from "@entities/faq";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { accordionTypes } from "@shared/config";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface FAQInformationProps {
  information: IFAQInformation;
  index: number;
}

export const FAQInformation: FC<FAQInformationProps> = ({
  information,
  index,
}) => {
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.${styles.arrow} svg`);
          if (state === accordionTypes.open) {
            ref.classList.add(styles.active);
            if (icon) icon.classList.add("default__icon__white");
            if (icon) icon.classList.add("rotate__down");
            if (icon) icon.classList.remove("active__icon");
            if (icon) icon.classList.remove("rotate");
          } else {
            ref.classList.remove(styles.active);
            if (icon) icon.classList.add("active__icon");
            if (icon) icon.classList.add("rotate");
            if (icon) icon.classList.remove("default__icon__white");
            if (icon) icon.classList.remove("rotate__down");
          }
        });
        observer.observe(ref, {
          attributes: true,
          attributeFilter: ["data-state"],
        });
        return () => observer.disconnect();
      }
    });
  }, [information]);
  let custom = index;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      variants={MAIN_PAGE_ANIMATION.animationVision}
      className={styles.wrapper}
    >
      <motion.p
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={styles.block_title}
      >
        {t(`${information.title}`)}
      </motion.p>
      <div className={styles.options}>
        {information.options.map((option, index) => (
          <motion.div
            key={index}
            custom={custom++}
            variants={MAIN_PAGE_ANIMATION.animationRight}
            className={styles.wrapper}
          >
            <AccordionItem
              value={`item-FAQ-${index}`}
              ref={(el) => (accordionRefs.current[index] = el)}
              className={styles.option}
            >
              <AccordionTrigger className={styles.title_wrapper}>
                <p className={styles.title}>{option.title}</p>
                <div className={styles.arrow}>
                  <ArrowSmallVerticalIcon className="active__icon rotate" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className={styles.text}>{option.text}</p>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
