import { FC } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { profileFilter } from "@shared/config/profileFilter";
import { useTranslation } from "react-i18next";

interface GuideProps {}

export const Guide: FC<GuideProps> = () => {
  const { t } = useTranslation();
  const { profileFilter: filter } = useAppSelector(
    (state) => state.filterReducer,
  );

  return (
    <div className={styles.guide}>
      {filter === profileFilter.entity
        ? t("wallet.guide.entity")
        : t("wallet.guide.individual")}
    </div>
  );
};
