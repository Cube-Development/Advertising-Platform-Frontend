import { FC } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { profileTypesName } from "@shared/config/profileFilter";
import { useTranslation } from "react-i18next";

interface GuideProps {}

export const Guide: FC<GuideProps> = () => {
  const { t } = useTranslation();
  const { profileFilter: filter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.guide}>
      {filter.type === profileTypesName.entities
        ? t("wallet.guide.entity")
        : t("wallet.guide.individual")}
    </div>
  );
};
