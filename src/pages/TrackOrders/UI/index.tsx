import {
  EXECUTOR_TYPE_TABS,
  ExecutorType,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
} from "@entities/admin";
import { channelData } from "@entities/channel";
import {
  SELF_CONNECT_DEFAULT_STATUS,
  SELF_CONNECT_ORDER_TABS_LIST,
} from "@entities/offer";
import {
  getSelfConnectOrdersReq,
  useGetSelfConnectOrdersQuery,
} from "@entities/self-connect-order";
import { DownloadAdminPayoutReport } from "@features/admin/downloadAdminPayoutReport";
import { SearchFilter } from "@features/catalog";
import { BarStatusFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import styles from "./styles.module.scss";

const SelfConnectOrdersCards = React.lazy(() =>
  import("@widgets/self-connect-orders")
    .then((module) => ({ default: module.SelfConnectOrdersCards }))
    .catch(() => {
      window.location.reload();
      return { default: () => null };
    }),
);

const SEARCH_FIELD = "search" as channelData;

const EXECUTOR_STATUS_TABS = EXECUTOR_TYPE_TABS.map((tab) => ({
  name: tab.name,
  type: tab.type,
}));

export const TrackOrdersPage: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isAdminTrackOrders = pathname === ENUM_PATHS.ADMIN_TRACK_ORDERS;

  const { setValue, watch } = useForm<getSelfConnectOrdersReq>({
    defaultValues: {
      status: SELF_CONNECT_DEFAULT_STATUS,
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS,
      search: "",
      executor_type: MANAGE_EXECUTOR_TYPE_DEFAULT,
    },
  });

  const formState = watch();
  const { search, ...rest } = formState;
  const queryArgs: getSelfConnectOrdersReq = {
    ...rest,
    ...(search?.trim() ? { search: search.trim() } : {}),
  };

  const { data, isFetching } = useGetSelfConnectOrdersQuery(queryArgs, {
    selectFromResult: ({ data, ...queryRest }) => ({
      ...queryRest,
      data:
        (data?.status === formState?.status &&
          data?.executor_type ===
            (formState.executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT) &&
          (data?.search ?? null) === (search?.trim() || null) &&
          data) ||
        undefined,
    }),
  });

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };

  const changeExecutorType = (type: ExecutorType) => {
    setValue("page", 1);
    setValue("executor_type", type);
  };

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, formState.search, formState.executor_type, setValue]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("track_orders.title")}</h1>
        {isAdminTrackOrders && <DownloadAdminPayoutReport />}
        <div className={styles.filters}>
          <div className="grid grid-flow-row gap-3">
            <div className="w-full max-w-[420px]">
              <SearchFilter
                type={SEARCH_FIELD}
                onChange={setValue}
                value={formState.search || ""}
              />
            </div>
            <BarStatusFilter
              changeStatus={(v) => changeExecutorType(v as ExecutorType)}
              statusFilter={
                formState.executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT
              }
              projectStatus={EXECUTOR_STATUS_TABS}
            />
          </div>
          <BarStatusFilter
            changeStatus={(v) => changeStatus(String(v))}
            statusFilter={formState.status}
            projectStatus={SELF_CONNECT_ORDER_TABS_LIST}
          />
        </div>
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
