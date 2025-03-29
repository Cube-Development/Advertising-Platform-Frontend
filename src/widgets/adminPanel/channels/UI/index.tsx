import {
  adminChannelForm,
  getAdminChannelsReq,
  useGetAdminChannelsQuery,
} from "@entities/admin";
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
      elements_on_page: INTERSECTION_ELEMENTS.adminChannels,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminChannelsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(adminChannelForm.page, formFields?.page + 1);
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
