import { Accordion, CustomTitle } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FAQInformation } from "@features/faq";
import { FAQData, FAQtypes, GUIDES_LIST } from "@entities/faq";
import { useFindLanguage } from "@entities/user";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { useClearCookiesOnPage } from "@shared/hooks";
import styles from "./styles.module.scss";
import { GuideCard } from "../components";

export const FAQ: FC = () => {
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const lang = language.name as keyof typeof FAQData;
  const { t } = useTranslation();
  const data = FAQData[`${lang}`].map((item) => ({
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
        >
          <CustomTitle title={t("faq.page_title")} variant="primary" />
        </motion.h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(max(300px,calc((100%-1rem)/2)),1fr))] gap-4">
          {GUIDES_LIST.map((guide) => (
            <GuideCard key={guide.guide_id} {...guide} />
          ))}
        </div>
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
