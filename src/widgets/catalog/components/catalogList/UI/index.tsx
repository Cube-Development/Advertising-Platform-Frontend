import { channelData, channelParameterData } from "@entities/channel";
import { platformTypes } from "@entities/platform";
import {
  CATALOG_FILTER,
  ICatalogChannel,
  getCatalogReq,
  sortingTypes,
} from "@entities/project";
import { AddToBasket } from "@features/cart";
import {
  CatalogCard,
  FormatList,
  SearchFilter,
  SkeletonCatalogCard,
  SkeletonSmallCatalogCard,
  SmallCatalogCard,
} from "@features/catalog";
import { SelectFilter, filterData } from "@features/other";
import { GridIcon, ListIcon, SadSmileIcon } from "@shared/assets";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { IOption } from "@shared/types";
import { ShowMoreBtn, SpinnerLoader, Toggle } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import {
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
  formState: getCatalogReq;
  resetField: UseFormResetField<getCatalogReq>;
  page: number;
  onChangeCard: (cart: ICatalogChannel) => void;
  isLast: boolean;
  isLoading?: boolean;
  catalogFilter: CATALOG_FILTER;
  changeCatalogFilter: (filter: CATALOG_FILTER) => void;
}

export const CatalogList: FC<CatalogListProps> = ({
  channels,
  setValue,
  reset,
  formState,
  page,
  isLast,
  onChangeCard,
  isLoading,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();

  const [isTableView, setIsTableView] = useState(() => {
    const saved = localStorage.getItem("catalogViewMode");
    return saved ? JSON.parse(saved) : false;
  });

  const handleViewChange = (value: boolean) => {
    setIsTableView(value);
    localStorage.setItem("catalogViewMode", JSON.stringify(value));
  };

  const handleOnChangePage = () => {
    setValue(channelParameterData.page, page + 1);
  };

  const translatePlatformTypes = platformTypes.map((el) => {
    return { ...el, name: t(el.name) };
  });
  const translateSortingTypes = sortingTypes.map((el) => {
    return { ...el, name: t(el.name), id: el.type };
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters__row}>
        <p className={styles.text}>
          {t("catalog.all_platform")}: {channels?.length}
        </p>
        <div className={styles.filters}>
          <SelectFilter
            data={formState?.filter}
            typeParameter={filterData.platform}
            typeData={channelData.filter}
            defaultValue={[formState?.filter?.platform]}
            onChangeOption={setValue}
            options={translatePlatformTypes}
            textData="filter.title"
            single={true}
            showButtonClear={false}
            showListClear={false}
            showCheckBox={false}
            hideText={screen < BREAKPOINT.MD}
          />
          <SelectFilter
            typeParameter={filterData.sort}
            defaultValue={[formState?.sort]}
            onChangeOption={setValue}
            options={translateSortingTypes as unknown as IOption[]}
            textData="sorting.title"
            single={true}
            showButtonClear={false}
            showListClear={false}
            showCheckBox={false}
            hideText={false}
          />
        </div>
      </div>
      <div className={styles.search__row}>
        <div className="grid grid-cols-[1fr_auto] gap-[10px]">
          <SearchFilter type={channelData.search} onChange={setValue} />
          <Toggle
            pressed={isTableView}
            onPressedChange={handleViewChange}
            className="size-[40px] bg-white data-[state=on]:bg-gradient-to-r from-[#4772E6] to-[#8E54E9] rounded-lg border-[1px] border-[--black-20] data-[state=on]:border-[--Personal-colors-main]"
          >
            {isTableView ? (
              <ListIcon className="w-5 h-5" />
            ) : (
              <GridIcon className="w-5 h-5" />
            )}
          </Toggle>
        </div>
        {screen < BREAKPOINT.LG && (
          <ParametersFilter
            formState={formState}
            reset={reset}
            setValue={setValue}
            catalogFilter={catalogFilter}
            changeCatalogFilter={changeCatalogFilter}
          />
        )}
      </div>
      <div className={`${styles.card__list} ${isTableView && "!gap-1.5"}`}>
        {(formState.page !== 1 || !isLoading) &&
          channels?.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.CATALOG}
              variants={PAGE_ANIMATION.animationUp}
            >
              {isTableView ? (
                <SmallCatalogCard
                  card={card}
                  AddToBasketBtn={AddToBasket}
                  FormatList={FormatList}
                  onChangeCard={onChangeCard}
                />
              ) : (
                <CatalogCard
                  card={card}
                  AddToBasketBtn={AddToBasket}
                  FormatList={FormatList}
                  onChangeCard={onChangeCard}
                />
              )}
            </motion.div>
          ))}
        {isLoading &&
          Array.from({ length: INTERSECTION_ELEMENTS.CATALOG }).map(
            (_, index) =>
              isTableView ? (
                <SkeletonSmallCatalogCard key={index} />
              ) : (
                <SkeletonCatalogCard key={index} />
              ),
          )}
        {channels.length === 0 && !isLoading && (
          <div className={styles.icon}>
            <SadSmileIcon />
          </div>
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
