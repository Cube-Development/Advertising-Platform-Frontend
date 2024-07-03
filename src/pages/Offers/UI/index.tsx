import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { BarFilter } from "@widgets/barFilter";
import { BloggerOffer } from "@widgets/bloggerOffer";
import { FC, useEffect, useState } from "react";
import { Languages } from "@shared/config/languages";
import { useTranslation } from "react-i18next";
import { networkTypes, platformTypesNum } from "@shared/config/platformTypes";
import { useForm } from "react-hook-form";
import {
  getOrdersByStatusReq,
  useGetBloggerOrdersQuery,
} from "@shared/store/services/bloggerOffersService";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { IBloggerOfferCard } from "@shared/types/bloggerOffer";

export const OffersPage: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filter);

  const page = pageFilter.offer;

  const { i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { setValue, watch } = useForm<{ platform: platformTypesNum }>({
    defaultValues: {
      platform: networkTypes[0].id,
    },
  });

  const platformType = watch("platform");

  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getOrdersByStatusReq = {
    platform: platformType,
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
    date_sort: "increase",
    status: statusFilter,
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
  }, [platformType, statusFilter]);

  return (
    <>
      <BarFilter
        page={page}
        listLength={!!offers?.length}
        setValue={setValue}
      />
      <BloggerOffer
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
