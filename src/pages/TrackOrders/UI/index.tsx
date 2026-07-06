import {
  SELF_CONNECT_DEFAULT_STATUS,
  SELF_CONNECT_ORDER_TABS_LIST,
} from "@entities/offer";
import {
  getSelfConnectOrdersReq,
  useGetSelfConnectOrdersQuery,
} from "@entities/self-connect-order";
import { BarStatusFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const SelfConnectOrdersCards = React.lazy(() =>
  import("@widgets/self-connect-orders")
    .then((module) => ({ default: module.SelfConnectOrdersCards }))
    .catch(() => {
      window.location.reload();
      return { default: () => null };
    }),
);

export const TrackOrdersPage: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();

  const { setValue, watch } = useForm<getSelfConnectOrdersReq>({
    defaultValues: {
      status: SELF_CONNECT_DEFAULT_STATUS,
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS,
    },
  });

  const formState = watch();

  const { data, isFetching } = useGetSelfConnectOrdersQuery(formState, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formState?.status && data) || undefined,
    }),
  });

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, setValue]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("track_orders.title")}</h1>
        <BarStatusFilter
          changeStatus={changeStatus}
          statusFilter={formState.status}
          projectStatus={SELF_CONNECT_ORDER_TABS_LIST}
        />
        <Suspense fallback={<SuspenseLoader />}>
          <SelfConnectOrdersCards
            orders={data?.orders || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        </Suspense>
      </div>
    </div>
  );
};
