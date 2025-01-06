// import {
//   getOrdersByStatusReq,
//   offerStatusFilter,
//   useGetBloggerOrdersQuery,
// } from "@entities/offer";
// import {
//   dateSortingTypes,
//   platformTypes,
//   platformTypesNum,
// } from "@entities/platform";
// import { useGetViewBloggerOrderQuery } from "@entities/views";
// import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
// import { pageFilter } from "@shared/routing";
// import { BarFilter } from "@widgets/barFilter";
// import { MyOffers } from "@widgets/offer";
// import { FC, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import styles from "./styles.module.scss";

// export const OffersPage: FC = () => {
//   const page = pageFilter.offer;
//   const { i18n } = useTranslation();
//   const language = Languages.find((lang) => {
//     return i18n.language === lang.name;
//   });

//   const { setValue, watch } = useForm<{
//     platform: platformTypesNum;
//     status: offerStatusFilter | string;
//   }>({
//     defaultValues: {
//       platform: platformTypes[0].id,
//       status: offerStatusFilter.active,
//     },
//   });
//   const formState = watch();

//   const [currentPage, setCurrentPage] = useState(1);
//   const handleOnChangePage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const getParams: getOrdersByStatusReq = {
//     language: language?.id || Languages[0].id,
//     page: currentPage,
//     elements_on_page: INTERSECTION_ELEMENTS.bloggerOffers,
//     date_sort: dateSortingTypes.decrease,
//     status: formState.status,
//   };

//   const { data, isFetching } = useGetBloggerOrdersQuery(getParams);
//   const { refetch: views } = useGetViewBloggerOrderQuery();

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [formState.status]);

//   useEffect(() => {
//     views();
//   }, [currentPage, formState.status]);

//   return (
//     <div className="container">
//       <div className={styles.wrapper}>
//         <BarFilter
//           page={page}
//           listLength={!!data?.orders?.length}
//           setValue={setValue}
//           changeStatus={(status) => setValue("status", status)}
//           statusFilter={formState.status}
//         />
//         <MyOffers
//           statusFilter={formState.status as offerStatusFilter}
//           offers={(data?.status === formState.status && data?.orders) || []}
//           handleOnChangePage={handleOnChangePage}
//           isLoading={isFetching}
//           isLast={data?.isLast || false}
//         />
//       </div>
//     </div>
//   );
// };

import React, { Suspense } from "react";
import {
  getOrdersByStatusReq,
  offerStatusFilter,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import {
  dateSortingTypes,
  platformTypes,
  platformTypesNum,
} from "@entities/platform";
import { useGetViewBloggerOrderQuery } from "@entities/views";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SuspenseLoader } from "@shared/ui";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer").then((module) => ({ default: module.MyOffers })),
);

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
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.bloggerOffers,
    date_sort: dateSortingTypes.decrease,
    status: formState.status,
  };

  const { data, isFetching } = useGetBloggerOrdersQuery(getParams);
  const { refetch: views } = useGetViewBloggerOrderQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [formState.status]);

  useEffect(() => {
    views();
  }, [currentPage, formState.status]);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
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
            offers={(data?.status === formState.status && data?.orders) || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        </div>
      </div>
    </Suspense>
  );
};
