import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { MyOffers } from "@widgets/offer";
import { BarFilter } from "@widgets/barFilter";
import { platformTypes, platformTypesNum } from "@entities/platform";
import {
  IBloggerOfferCard,
  getOrdersByStatusReq,
  offerStatusFilter,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { pageFilter } from "@shared/routing";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { channelStatusFilter } from "@entities/channel";

export const OffersPage: FC = () => {
  const page = pageFilter.offer;
  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { setValue, watch } = useForm<{
    platform: platformTypesNum;
    status: channelStatusFilter | offerStatusFilter | string;
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
    elements_on_page: INTERSECTION_ELEMENTS.orders,
    date_sort: "increase",
    status: formState.status,
  };

  const { data, isFetching } = useGetBloggerOrdersQuery(getParams);

  const [offers, setOffers] = useState<IBloggerOfferCard[]>(
    data?.orders ? data?.orders : [],
  );

  useEffect(() => {
    if (data && currentPage !== 1) {
      setOffers([...offers, ...data.orders]);
    } else {
      data && setOffers(data.orders);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [formState]);

  return (
    <>
      <BarFilter
        page={page}
        listLength={!!offers?.length}
        setValue={setValue}
        changeStatus={(status) => setValue("status", status)}
        statusFilter={formState.status}
      />
      <MyOffers
        statusFilter={formState.status}
        offers={offers!}
        handleOnChangePage={handleOnChangePage}
        isLoading={isFetching}
        isNotEmpty={
          data ? data?.orders?.length === INTERSECTION_ELEMENTS.orders : false
        }
        // isNotEmpty={data ? offers?.length < data?.elements : false}
      />
    </>
  );
};
