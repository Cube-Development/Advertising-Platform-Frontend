import { profileTypesName, profileTypesNum } from "@entities/wallet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface GuideProps {
  profileFilter: {
    type: profileTypesName;
    id?: profileTypesNum;
  };
}

export const Guide: FC<GuideProps> = ({ profileFilter }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles.guide} display__hide__max__md`}>
        <span className={styles.text}>
          {profileFilter.type === profileTypesName.entities
            ? t("wallet.guide.entity")
            : profileFilter.type === profileTypesName.individuals
              ? t("wallet.guide.individual")
              : profileFilter.type === profileTypesName.selfEmployedAccounts
                ? t("wallet.guide.selfEmployedAccounts")
                : t("wallet.guide.selfEmployedTransits")}
        </span>
      </div>
      <div className="display__hide__min__md">
        <Accordion type="single" collapsible className={styles.accordion}>
          <AccordionItem value={`item-guide`} className={styles.item}>
            <AccordionTrigger className={styles.trigger}>
              <p className={styles.title}>{t("wallet.guide.title")}</p>
            </AccordionTrigger>
            <AccordionContent className={`${styles.content} ${styles.guide}`}>
              <span className={styles.text}>
                {profileFilter.type === profileTypesName.entities
                  ? t("wallet.guide.entity")
                  : profileFilter.type === profileTypesName.individuals
                    ? t("wallet.guide.individual")
                    : profileFilter.type ===
                        profileTypesName.selfEmployedAccounts
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
