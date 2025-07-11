import { PROFILE_TYPE, PROFILE_STATUS } from "@entities/wallet";
import { ENUM_ACCORDION_TYPES } from "@shared/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import guideAnimation from "/animated/guide_lottie.gif";

interface GuideProps {
  profileFilter: {
    type: PROFILE_TYPE;
    id?: PROFILE_STATUS;
  };
}

export const Guide: FC<GuideProps> = ({ profileFilter }) => {
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
      <div className={`${styles.guide} display__hide__max__md frame`}>
        <span className={styles.text}>
          {profileFilter.type === PROFILE_TYPE.ENTITIES
            ? t("wallet.guide.entity")
            : profileFilter.type === PROFILE_TYPE.INDIVIDUALS
              ? t("wallet.guide.individual")
              : profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT
                ? t("wallet.guide.selfEmployedAccounts")
                : t("wallet.guide.selfEmployedTransits")}
        </span>
      </div>
      <div className="display__hide__min__md">
        <Accordion type="single" collapsible className={styles.accordion}>
          <AccordionItem
            value={`item-guide`}
            ref={(el) => (accordionRefs.current[0] = el)}
            className={styles.item}
          >
            <AccordionTrigger className={styles.trigger}>
              <img src={guideAnimation} alt="guide_animation_gif" />
              <p className={styles.title}>{t("wallet.guide.title")}</p>
              <div className={styles.arrow}>
                <ArrowSmallVerticalIcon className="active__icon rotate" />
              </div>
            </AccordionTrigger>
            <AccordionContent className={`${styles.content} ${styles.guidee}`}>
              <span className={styles.text}>
                {profileFilter.type === PROFILE_TYPE.ENTITIES
                  ? t("wallet.guide.entity")
                  : profileFilter.type === PROFILE_TYPE.INDIVIDUALS
                    ? t("wallet.guide.individual")
                    : profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT
                      ? t("wallet.guide.selfEmployedAccounts")
                      : t("wallet.guide.selfEmployedTransits")}
              </span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
