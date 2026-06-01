import { FAQData, FAQtypes } from "@entities/faq";
import { useFindLanguage } from "@entities/user";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const ChannelFaq: FC = () => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const lang = language.name as keyof typeof FAQData;

  const options = useMemo(
    () =>
      FAQData[lang]?.find((item) => item.type === FAQtypes.advertiser)
        ?.options ?? [],
    [lang],
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("channel.faq.title")}</p>
      <Accordion type="single" collapsible className={styles.list}>
        {options.map((option, index) => (
          <AccordionItem
            key={index}
            value={`item-channel-faq-${index}`}
            className={styles.item}
          >
            <AccordionTrigger className={styles.trigger}>
              <span className={styles.question}>{option.title}</span>
              <span className={styles.chevron}>
                <ArrowSmallVerticalIcon />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className={styles.answer}>{option.text}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
