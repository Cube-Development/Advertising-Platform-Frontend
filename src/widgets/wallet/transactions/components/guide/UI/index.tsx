import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { profileTypesName } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";

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
