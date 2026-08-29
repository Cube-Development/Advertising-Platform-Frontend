import {
  CHANNELS_EXECUTOR_TYPE_DEFAULT,
  EXECUTOR_TYPE_TABS,
  ExecutorType,
} from "@entities/admin";
import {
  ADMIN_CHANNEL_FILTER_TABS_LIST,
  ADMIN_CHANNEL_FORM,
  ADMIN_CHANNEL_STATUS,
  IGetAdminChannelsReq,
  useGetAdminChannelsQuery,
} from "@entities/admin-panel";
import { channelData } from "@entities/channel";
import { SearchFilter } from "@features/catalog";
import { BarStatusFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChannelsList } from "../channels-list";

const EXECUTOR_STATUS_TABS = EXECUTOR_TYPE_TABS.map((tab) => ({
  name: tab.name,
  type: tab.type,
}));

const CHANNEL_STATUS_TABS = ADMIN_CHANNEL_FILTER_TABS_LIST.map((tab) => ({
  name: tab.name,
  type: tab.type,
}));

export const Channels: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<IGetAdminChannelsReq>({
    defaultValues: {
      page: 1,
      status: ADMIN_CHANNEL_STATUS.ACTIVE,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
      search_string: "",
      executor_type: CHANNELS_EXECUTOR_TYPE_DEFAULT,
    },
  });
  const formFields = watch();
  const { search_string, ...params } = formFields;
  const getParams: IGetAdminChannelsReq = {
    ...params,
    ...(search_string?.trim() ? { search_string: search_string.trim() } : {}),
  };

  const { data, isLoading, isFetching } = useGetAdminChannelsQuery(getParams, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data:
        (data?.status === formFields?.status &&
          data?.executor_type ===
            (formFields.executor_type ?? CHANNELS_EXECUTOR_TYPE_DEFAULT) &&
          (data?.search_string ?? null) === (search_string?.trim() || null) &&
          data) ||
        undefined,
    }),
  });

  const handleOnChangePage = () => {
    setValue(ADMIN_CHANNEL_FORM.PAGE, formFields?.page + 1);
  };

  const changeTab = (filter: ADMIN_CHANNEL_STATUS) => {
    setValue(ADMIN_CHANNEL_FORM.PAGE, 1);
    setValue(ADMIN_CHANNEL_FORM.STATUS, filter);
    setValue(channelData.search, null);
  };

  const changeExecutorType = (type: ExecutorType) => {
    setValue(ADMIN_CHANNEL_FORM.PAGE, 1);
    setValue("executor_type", type);
  };

  useEffect(() => {
    setTimeout(() => {
      setValue(ADMIN_CHANNEL_FORM.PAGE, 1);
    }, 500);
  }, [formFields.search_string, formFields.executor_type, setValue]);

  return (
    <div className="container">
      <div className="my-6 grid grid-flow-row gap-4 sm:my-8 sm:gap-6 lg:my-10">
        <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
          {t("admin_panel.pages.channels")}
        </h1>

        <div className="grid grid-flow-row gap-4">
          <div className="grid grid-flow-row gap-3">
            <div className="w-full max-w-[420px]">
              <SearchFilter
                type={channelData.search}
                onChange={setValue}
                value={formFields.search_string || ""}
              />
            </div>
            <BarStatusFilter
              changeStatus={(v) => changeExecutorType(v as ExecutorType)}
              statusFilter={
                formFields.executor_type ?? CHANNELS_EXECUTOR_TYPE_DEFAULT
              }
              projectStatus={EXECUTOR_STATUS_TABS}
            />
          </div>

          <BarStatusFilter
            changeStatus={(v) => changeTab(v as ADMIN_CHANNEL_STATUS)}
            statusFilter={formFields.status}
            projectStatus={CHANNEL_STATUS_TABS}
          />
        </div>

        <ChannelsList
          data={data}
          isLoading={isLoading || isFetching}
          handleChange={handleOnChangePage}
        />
      </div>
    </div>
  );
};
