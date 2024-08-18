import { FAQData, FAQtypes } from "@entities/faq";
import { FAQInformation } from "@features/faq";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { Accordion } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import styles from "./styles.module.scss";

export const FAQ: FC = () => {
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
          viewport={MAIN_PAGE_ANIMATION.viewport}
          variants={MAIN_PAGE_ANIMATION.animationVision}
          className={styles.title}
        >
          FAQS
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
