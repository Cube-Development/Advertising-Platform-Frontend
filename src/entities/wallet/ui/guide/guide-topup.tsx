import { ArrowSmallVerticalIcon } from "@shared/assets";
import { ENUM_ACCORDION_TYPES } from "@shared/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GuideTopupContent } from "./ui";
import guideAnimation from "/animated/guide_lottie.gif";
import styles from "./styles.module.scss";

export const GuideTopup: FC = ({}) => {
  const { t } = useTranslation();
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    accordionRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.${styles.arrow} svg`);
          if (state === ENUM_ACCORDION_TYPES.OPEN) {
            ref.classList.add(styles.active);
            if (icon) icon.classList.add("icon__white");
            if (icon) icon.classList.add("rotate__down");
            if (icon) icon.classList.remove("active__icon");
            if (icon) icon.classList.remove("rotate");
          } else {
            ref.classList.remove(styles.active);
            if (icon) icon.classList.add("active__icon");
            if (icon) icon.classList.add("rotate");
            if (icon) icon.classList.remove("icon__white");
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
  }, []);

  return (
    <>
      <div className={`${styles.guide} display__hide__max__md`}>
        <GuideTopupContent />
      </div>
      <div className="display__hide__min__md">
        <Accordion type="single" collapsible className={styles.accordion}>
          <AccordionItem
            value={`item-guide`}
            ref={(el) => (accordionRefs.current[0] = el)}
            className="grid grid-flow-row"
          >
            <AccordionTrigger className="grid grid-flow-col gap-[10px] justify-between items-center content-center p-[10px] cursor-pointer rounded-[12px] transition-all duration-300 ease-in-out">
              <img
                src={guideAnimation}
                alt="guide_animation_gif"
                className="w-10 h-10 "
              />
              <p className="font-semibold text-md gradient_color">
                {t("wallet.guide.title")}
              </p>
              <div className={styles.arrow}>
                <ArrowSmallVerticalIcon className="active__icon rotate" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <GuideTopupContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
