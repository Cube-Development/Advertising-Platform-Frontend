import { channelData, channelParameterData } from "@entities/channel";
import { platformTypes } from "@entities/platform";
import {
  ICatalogChannel,
  catalogBarFilter,
  getCatalogReq,
  sortingTypes,
} from "@entities/project";
import { AddToBasket } from "@features/cart";
import {
  CatalogCard,
  FormatList,
  SearchFilter,
  SkeletonCatalogCard,
} from "@features/catalog";
import { SelectOptions, filterData } from "@features/other";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ParametersFilter } from "../parametersFilter";
import styles from "./styles.module.scss";

interface CatalogListProps {
  channels: ICatalogChannel[];
  setValue: UseFormSetValue<getCatalogReq>;
  reset: UseFormReset<getCatalogReq>;
  getValues: UseFormGetValues<getCatalogReq>;
  resetField: UseFormResetField<getCatalogReq>;
  page: number;
  onChangeCard: (cart: ICatalogChannel) => void;
  isLast: boolean;
  isLoading?: boolean;
  catalogFilter: catalogBarFilter;
  changeCatalogFilter: (filter: catalogBarFilter) => void;
}

export const CatalogList: FC<CatalogListProps> = ({
  channels,
  setValue,
  reset,
  getValues,
  resetField,
  page,
  isLast,
  onChangeCard,
  isLoading,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);

  const handleOnChangePage = () => {
    setValue(channelParameterData.page, page + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters__row}>
        <p className={styles.text}>
          {t("catalog.all_platform")}: {channels?.length}
        </p>
        <div className={styles.filters}>
          <SelectOptions
            getValues={getValues}
            onChange={setValue}
            options={platformTypes}
            textData="filter.title"
            single={true}
            type={channelParameterData.platform}
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
        <SearchFilter
          type={channelData.search}
          onChange={setValue}
          resetField={resetField}
        />
        {screen < BREAKPOINT.LG && (
          <ParametersFilter
            getValues={getValues}
            reset={reset}
            setValue={setValue}
            catalogFilter={catalogFilter}
            changeCatalogFilter={changeCatalogFilter}
          />
        )}
      </div>
      <div className={styles.card__list}>
        {channels?.map((card, index) => (
          <motion.div
            key={card.id + index}
            initial="hidden"
            animate="visible"
            custom={index % INTERSECTION_ELEMENTS.catalog}
            variants={PAGE_ANIMATION.animationUp}
          >
            <CatalogCard
              card={card}
              AddToBasketBtn={AddToBasket}
              FormatList={FormatList}
              onChangeCard={onChangeCard}
            />
          </motion.div>
        ))}
        {isLoading &&
          Array.from({ length: INTERSECTION_ELEMENTS.catalog }).map(
            (_, index) => <SkeletonCatalogCard key={index} />,
          )}
      </div>
      {!isLast ? (
        <div className={styles.show_more} onClick={handleOnChangePage}>
          {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
        </div>
      ) : (
        <div className={styles.empty}></div>
      )}
    </div>
  );
};
