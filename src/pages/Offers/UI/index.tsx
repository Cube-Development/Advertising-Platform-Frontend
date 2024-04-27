import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { BarFilter } from "@widgets/barFilter";
import { BloggerOffer } from "@widgets/bloggerOffer";
import { FC } from "react";
import { Languages } from "@shared/config/languages";
import { useTranslation } from "react-i18next";
import { platformTypesNum } from "@shared/config/platformTypes";
import { networkTypes } from "@shared/config/platformData";
import { useForm } from "react-hook-form";
import {
  getOrdersByStatusReq,
  useGetBloggerOrdersQuery,
} from "@shared/store/services/bloggerOffersService";

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

  const getParams: getOrdersByStatusReq = {
    platform: platformType,
    language: language?.id || Languages[0].id,
    page: 1,
    date_sort: "increase",
    status: statusFilter,
  };

  const { data: offers } = useGetBloggerOrdersQuery(getParams);

  return (
    <>
      <BarFilter
        page={page}
        listLength={!offers?.orders.length}
        setValue={setValue}
      />
      <BloggerOffer offers={offers!} />
    </>
  );
};
