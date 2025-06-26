import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export const InfoCard: FC = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <p>
        {t("add_organization.add_form.info_card.text")}:{" "}
        <a href="#" className={styles.link} target="_blank">
          {t("add_organization.add_form.info_card.link")}
        </a>
      </p>
    </div>
  );
};
