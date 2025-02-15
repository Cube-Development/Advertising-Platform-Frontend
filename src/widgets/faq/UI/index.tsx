import { FAQData, FAQtypes } from "@entities/faq";
import { FAQInformation } from "@features/faq";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { useClearCookiesOnPage } from "@shared/hooks";
import { Accordion } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const FAQ: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const data = FAQData.map((item) => ({
    ...item,
    title:
      item.type === FAQtypes.common
        ? "faq.common.title"
        : item.type === FAQtypes.advertiser
          ? "faq.advertiser.title"
          : "faq.blogger.title",
  }));
  let blockIndex = 0;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={PAGE_ANIMATION.viewport}
          variants={PAGE_ANIMATION.animationVision}
          className={styles.title}
        >
          {t("faq.page_title")}
        </motion.h1>
        <div className={styles.information__wrapper}>
          {data.map((item, index) => {
            const currentBlockIndex = blockIndex;
            const renderedItem = (
              <Accordion key={index} type="single" collapsible>
                <FAQInformation
                  key={index}
                  information={item}
                  index={currentBlockIndex}
                />
              </Accordion>
            );
            blockIndex += item.options.length;
            return renderedItem;
          })}
        </div>
      </div>
    </div>
  );
};
