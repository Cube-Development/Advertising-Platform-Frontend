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
import { IPlatform } from "@shared/types/platform";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { getCatalogReq } from "@shared/store/services/catalogService";

interface CatalogListProps {
  channels: IPlatform[];
  setValue: UseFormSetValue<getCatalogReq>;
  onChangeCard: (cart: IPlatform) => void;
}

export const CatalogList: FC<CatalogListProps> = ({
  channels,
  setValue,
  onChangeCard,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters__row}>
        <big>
          {t("catalog.all_platform")}: {channels.length}
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
            isCatalogSorting={true}
          />
        </div>
      </div>

      <SearchFilter />
      <div className={styles.card__list}>
        {channels?.map((card) => (
          <CatalogCard
            card={card}
            key={card.id}
            AddToBasketBtn={AddToBasket}
            FormatList={FormatList}
            onChangeCard={onChangeCard}
          />
        ))}
      </div>
      <div className={styles.card__loader}>
        ЭЛЕМЕНТ ДЛЯ БЕСКОНЕЧНОЙ ПОДГРУЗКИ
      </div>
    </div>
  );
};
