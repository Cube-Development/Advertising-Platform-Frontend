import {
  ADMIN_CHANNEL_FILTER_TABS_LIST,
  ADMIN_CHANNEL_FORM,
  ADMIN_CHANNEL_STATUS,
  getAdminChannelsReq,
  useGetAdminChannelsQuery,
} from "@entities/admin";
import { BarSubFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChannelsList } from "../channelsList";
import styles from "./styles.module.scss";

export const Channels: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminChannelsReq>({
    defaultValues: {
      page: 1,
      status: ADMIN_CHANNEL_STATUS.ACTIVE,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminChannelsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(ADMIN_CHANNEL_FORM.PAGE, formFields?.page + 1);
  };

  const changeTab = (filter: any) => {
    setValue(ADMIN_CHANNEL_FORM.PAGE, 1);
    setValue(ADMIN_CHANNEL_FORM.STATUS, filter);
  };

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
            <BarSubFilter
              tab={formFields?.status}
              changeTab={changeTab}
              tab_list={ADMIN_CHANNEL_FILTER_TABS_LIST}
            />
          </div>
          <ChannelsList
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
