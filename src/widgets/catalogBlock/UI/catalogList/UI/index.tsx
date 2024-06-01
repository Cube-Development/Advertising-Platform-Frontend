import { AddToBasket } from "@features/addToBasket";
import { CatalogCard } from "@features/catalogCard";
import { FormatList } from "@features/formatList";
import { SearchFilter } from "@features/searchFilter";
import { SelectOptions } from "@features/selectOptions";
import { ShowMoreBtn } from "@features/showMore";
import { SadSmileIcon } from "@shared/assets";
import {
  filterData,
  networkTypes,
  platformData,
  sortingTypes,
} from "@shared/config/platformData";
import { getCatalogReq } from "@shared/store/services/catalogService";
import { IPlatform } from "@shared/types/platform";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { FC, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BREAKPOINT, INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SkeletonCatalogCard } from "@features/catalogCard/skeletonCatalogCard";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { ParametersFilter } from "../parametersFilter";

interface CatalogListProps {
  channels: IPlatform[];
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  getValues: UseFormGetValues<getCatalogReq>;
  page: number;
  onChangeCard: (cart: IPlatform) => void;
  isNotEmpty: boolean;
  isLoading?: boolean;
}

export const CatalogList: FC<CatalogListProps> = ({
  channels,
  setValue,
  reset,
  getValues,
  page,
  isNotEmpty,
  onChangeCard,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOnChangePage = () => {
    setValue(platformData.page, page + 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters__row}>
        <p className={styles.text}>
          {t("catalog.all_platform")}: {channels.length}
        </p>
        <div className={styles.filters}>
          <SelectOptions
            getValues={getValues}
            onChange={setValue}
            options={networkTypes}
            textData="filter.title"
            single={true}
            type={filterData.platform}
            isFilter={true}
            isCatalogPlatform={true}
            isPlatformFilter={true}
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
      <div className={styles.search__row}>
        <SearchFilter />
        {screen < BREAKPOINT.LG && (
          <ParametersFilter
            getValues={getValues}
            reset={reset}
            setValue={setValue}
          />
        )}
      </div>
      <Accordion type="single" collapsible>
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
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.catalog }).map(
              (_, index) => <SkeletonCatalogCard key={index} />,
            )}
        </div>
      </Accordion>
      {isNotEmpty ? (
        // <DinamicPagination onChange={handleOnChangePage} />
        <div className={styles.show_more} onClick={handleOnChangePage}>
          {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
        </div>
      ) : (
        <div className={styles.empty}>
          <SadSmileIcon />
        </div>
      )}
    </div>
  );
};
