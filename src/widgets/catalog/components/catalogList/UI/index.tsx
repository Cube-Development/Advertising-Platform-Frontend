import { channelData, channelParameterData } from "@entities/channel";
import { platformTypes } from "@entities/platform";
import {
  CATALOG_FILTER,
  ICatalogChannel,
  getCatalogReq,
  sortingFilter,
  sortingTypes,
} from "@entities/project";
import { AddToBasket } from "@features/cart";
import {
  CardPremiumAccess,
  CatalogCard,
  CompactCatalogCard,
  FormatList,
  SearchFilter,
  SkeletonCatalogCard,
  SkeletonCompactCatalogCard,
} from "@features/catalog";
import { SelectFilter, filterData } from "@features/other";
import { GridIcon, ListIcon, LockIcon, SadSmileIcon } from "@shared/assets";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { IOption } from "@shared/types";
import { CustomInput, ShowMoreBtn, SpinnerLoader, Toggle } from "@shared/ui";
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
import { LoginPremiumAccess, LoginToViewMore } from "@features/user";
import { Search, X } from "lucide-react";

interface CatalogListProps {
  channels: ICatalogChannel[];
  all_channels_count: number;
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
  haveMore?: boolean;
}

export const CatalogList: FC<CatalogListProps> = ({
  channels,
  all_channels_count,
  setValue,
  reset,
  formState,
  page,
  isLast,
  haveMore,
  onChangeCard,
  isLoading,
  catalogFilter,
  changeCatalogFilter,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();

  const { isAuth, isPremiumUser } = useAppSelector((state) => state.user);
  const isModal = !isAuth || !isPremiumUser;

  const Modal = ({
    trigger,
    open,
    onOpenChange,
  }: {
    trigger: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) =>
    !isAuth ? (
      <LoginToViewMore
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
      />
    ) : !isPremiumUser ? (
      <LoginPremiumAccess
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        channelCount={all_channels_count}
      />
    ) : null;

  const [isTableView, setIsTableView] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem("catalogViewMode");
    if (saved) {
      return JSON.parse(saved);
    }

    return window.innerWidth >= BREAKPOINT.SM;
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

  const translateSortingTypes = sortingTypes.map((el, index) => {
    return {
      ...el,
      name: t(el.name),
      id: el.type,
      img: isModal && index > 0 ? LockIcon : el.img,
    };
  });

  const [openModal, setOpenModal] = useState(false);

  const onChangeSort = () => {
    if (isModal) {
      setOpenModal(true);
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Modal open={openModal} onOpenChange={setOpenModal} trigger={<></>} />
      <div className={styles.filters__row}>
        <p className={styles.text}>
          {t("catalog.all_platform")}: {all_channels_count}
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
            defaultValue={[isModal ? sortingFilter.match : formState?.sort]}
            onChangeOption={setValue}
            onChangeSort={isModal ? onChangeSort : undefined}
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
          {isModal ? (
            <Modal
              trigger={
                <div className="relative cursor-pointer">
                  <Search
                    color="var(--Personal-colors-main)"
                    className="absolute z-10 -translate-y-1/2 left-3 top-1/2"
                    size={20}
                  />
                  <X
                    size={20}
                    color="var(--Inside-container)"
                    className="absolute z-10 -translate-y-1/2 cursor-pointer right-2 top-1/2"
                  />
                  <CustomInput
                    placeholder={t("catalog.search.search")}
                    className="px-[40px] md:px-[40px] pointer-events-none opacity-80"
                  />
                </div>
              }
            />
          ) : (
            <SearchFilter type={channelData.search} onChange={setValue} />
          )}
          <Toggle
            pressed={isTableView}
            onPressedChange={handleViewChange}
            className="size-[40px] bg-white data-[state=on]:bg-gradient-to-r from-[#0BADC2] to-[#0AA5BE] rounded-lg border-[1px] border-[--black-20] data-[state=on]:border-[--Personal-colors-main]"
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
      {isAuth && !isPremiumUser && <CardPremiumAccess />}
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
                <CompactCatalogCard
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
                <SkeletonCompactCatalogCard key={index} />
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
      {haveMore ? (
        <div className={styles.show_more}>
          {!isAuth && isLast ? (
            <LoginToViewMore trigger={<ShowMoreBtn />} />
          ) : !isPremiumUser && isLast ? (
            <LoginPremiumAccess
              trigger={<ShowMoreBtn />}
              channelCount={all_channels_count}
            />
          ) : isLoading ? (
            <SpinnerLoader />
          ) : (
            <div onClick={handleOnChangePage}>
              <ShowMoreBtn />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.empty}></div>
      )}
    </div>
  );
};
