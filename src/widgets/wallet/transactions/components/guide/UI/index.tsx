import { profileTypesName, profileTypesNum } from "@entities/wallet";
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
    <div className={styles.guide}>
      <p>
        {profileFilter.type === profileTypesName.entities
          ? t("wallet.guide.entity")
          : profileFilter.type === profileTypesName.individuals
            ? t("wallet.guide.individual")
            : profileFilter.type === profileTypesName.selfEmployedAccounts
              ? t("wallet.guide.selfEmployedAccounts")
              : t("wallet.guide.selfEmployedTransits")}
      </p>
    </div>
  );
};
