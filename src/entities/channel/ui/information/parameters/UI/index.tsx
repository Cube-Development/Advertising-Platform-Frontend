import { IReadChannelData } from "@entities/channel/types";
import { BoyIcon, GirlIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ParametersProps {
  card: IReadChannelData;
}

export const Parameters: FC<ParametersProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.parameters__row}>
        <p>{t("channel.parameters.category")}</p>
        <span>{card?.category.name}</span>
      </div>
      <div className={styles.parameters__row}>
        <p>{t("channel.parameters.language")}</p>
        <span>
          {card?.language.map((lang) => lang.name.split(" ")[1]).join(", ")}
        </span>
      </div>
      <div className={styles.parameters__row}>
        <p>{t("channel.parameters.age")}</p>
        <span>{card?.age.map((age) => age.name).join("; ")}</span>
      </div>
      <div className={styles.parameters__row}>
        <p>{t("channel.parameters.sex")}</p>
        <div className={styles.parameter__sex}>
          <BoyIcon />
          <span>
            {card?.male}% | {card?.female}%
          </span>
          <GirlIcon />
        </div>
      </div>
      <div className={styles.parameters__row}>
        <p>{t("channel.parameters.region")}</p>
        <span>{card?.region.map((region) => region.name).join("; ")}</span>
      </div>
    </div>
  );
};
