import {
  getOrdersByStatusReq,
  offerStatusFilter,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { platformTypes, platformTypesNum } from "@entities/platform";
import {
  BLOGGER_OFFERS,
  INTERSECTION_ELEMENTS,
  Languages,
} from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { MyOffers } from "@widgets/offer";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const OffersPage: FC = () => {
  const page = pageFilter.offer;
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: offerStatusFilter | string;
  }>({
    defaultValues: {
      platform: platformTypes[0].id,
      status: offerStatusFilter.active,
    },
  });
  const formState = watch();

  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getOrdersByStatusReq = {
    platform: formState.platform,
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.advOrders,
    date_sort: "increase",
    status: formState.status,
  };

  const { data, isFetching } = useGetBloggerOrdersQuery(getParams);

  useEffect(() => {
    setCurrentPage(1);
  }, [formState]);

  // const data = BLOGGER_OFFERS;
  // const isFetching = false;

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          listLength={!!data?.orders?.length}
          setValue={setValue}
          changeStatus={(status) => setValue("status", status)}
          statusFilter={formState.status}
        />
        <MyOffers
          statusFilter={formState.status as offerStatusFilter}
          offers={data?.orders!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isLast={data?.isLast || false}
        />
      </div>
    </div>
  );
};
