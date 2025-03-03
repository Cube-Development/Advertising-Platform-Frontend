import { IFilterSearch } from "@entities/project";
import { CustomCheckbox } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface RecomTargetCardProps {
  card: IFilterSearch;
  onChange: (card: IFilterSearch) => void;
  isChosen: boolean;
}

export const RecomTargetCard: FC<RecomTargetCardProps> = ({
  card,
  onChange,
  isChosen,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper} onClick={() => onChange(card)}>
      <div className={styles.card}>
        <div className={styles.card__row}>
          <p>
            {t("catalog.recommendation.card.age")}:{" "}
            <span>{card?.age.map((age) => age.name).join("; ")}</span>
          </p>
        </div>
        <div className={styles.card__row}>
          <p>
            {t("catalog.recommendation.card.language")}:{" "}
            <span>
              {card?.language.map((lang) => lang.name.split(" ")[1]).join(", ")}
            </span>
          </p>
        </div>
        <div className={styles.card__row}>
          <p>
            {t("catalog.recommendation.card.sex")}:{" "}
            <span>
              {card.male}/{card.female}
            </span>
          </p>
        </div>
        <div className={styles.card__row}>
          <p>
            {t("catalog.recommendation.card.region")}:{" "}
            <span>{card?.region.map((region) => region.name).join("; ")}</span>
          </p>
        </div>
        <div className={styles.card__row}>
          <p>
            {t("catalog.recommendation.card.business")}:{" "}
            {/* <span>
              {card?.category.map((business) => business?.name).join("; ")}
            </span> */}
          </p>
        </div>
      </div>
      <div className={styles.checkbox}>
        {/* <input
          type="checkbox"
          checked={isChooseed}
          onChange={() => onChange(card)}
        /> */}
        <CustomCheckbox
          isSelected={isChosen}
          handleChange={() => onChange(card)}
        />
      </div>
    </div>
  );
};
