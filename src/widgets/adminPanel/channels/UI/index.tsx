import {
  ADMIN_CHANNEL_FILTER_TABS_LIST,
  ADMIN_CHANNEL_FORM,
  ADMIN_CHANNEL_STATUS,
  IGetAdminChannelsReq,
  useGetAdminChannelsQuery,
} from "@entities/admin-panel";
import { channelData } from "@entities/channel";
import { SearchFilter } from "@features/catalog";
import { BarSubFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChannelsList } from "../channels-list";
import styles from "./styles.module.scss";

export const Channels: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<IGetAdminChannelsReq>({
    defaultValues: {
      page: 1,
      status: ADMIN_CHANNEL_STATUS.ACTIVE,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
      search_string: "",
    },
  });
  const formFields = watch();
  const { search_string, ...params } = formFields;
  const getParams: IGetAdminChannelsReq = {
    ...params,
    ...(search_string && search_string.length >= 3 ? { search_string } : {}),
  };

  const { data, isLoading, isFetching } = useGetAdminChannelsQuery(getParams, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formFields?.status && data) || undefined,
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

  useEffect(() => {
    setTimeout(() => {
      setValue(ADMIN_CHANNEL_FORM.PAGE, 1);
    }, 500);
  }, [formFields.search_string]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.channels")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.channels")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <div className={styles.filter}>
            <div className={styles.search}>
              <SearchFilter
                type={channelData.search}
                onChange={setValue}
                value={formFields.search_string || ""}
              />
            </div>
            <BarSubFilter
              tab={formFields?.status}
              changeTab={changeTab}
              tab_list={ADMIN_CHANNEL_FILTER_TABS_LIST}
            />
          </div>
          <ChannelsList
            data={data}
            isLoading={isLoading || isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
