import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { profileTypesName, profileTypesNum } from "@entities/wallet";

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
      {profileFilter.type === profileTypesName.entities
        ? t("wallet.guide.entity")
        : t("wallet.guide.individual")}
    </div>
  );
};
