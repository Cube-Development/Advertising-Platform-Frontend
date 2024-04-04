import { AddToBasket } from "@features/addToBasket";
import { CatalogCard } from "@features/catalogCard";
import { FormatList } from "@features/formatList";
import { SearchFilter } from "@features/searchFilter";
import { SelectOptions } from "@features/selectOptions";
import {
  filterData,
  networkTypes,
  sortingTypes,
} from "@shared/config/platformData";
import { ICatalogCards } from "@shared/types/platform";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const CatalogList: FC<ICatalogCards> = ({ cards, onChangeCard }) => {
  const { t } = useTranslation();

  const {
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<any>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters__row}>
        <big>
          {t("catalog.all_platform")}: {cards.length}
        </big>
        <div className={styles.filters}>
          <SelectOptions
            onChange={setValue}
            options={networkTypes}
            textData="filter.title"
            single={true}
            type={filterData.platform}
            isFilter={true}
          />
          <SelectOptions
            onChange={setValue}
            options={sortingTypes}
            textData="sorting.title"
            single={true}
            type={filterData.sort}
            isFilter={true}
          />
        </div>
      </div>

      <SearchFilter />
      {cards.map((card, index) => (
        <CatalogCard
          card={card}
          key={index}
          AddToBasketBtn={AddToBasket}
          FormatList={FormatList}
          onChangeCard={onChangeCard}
        />
      ))}
    </div>
  );
};
