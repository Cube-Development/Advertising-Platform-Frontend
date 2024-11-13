import { IAdminChannels } from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { HistoryReq, useGetHistoryQuery } from "@entities/wallet";
import {
  AdminChannels,
  INTERSECTION_ELEMENTS,
  Languages,
} from "@shared/config";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChannelsList } from "../channelsList";
import styles from "./styles.module.scss";

export const Channels: FC = () => {
  const { t, i18n } = useTranslation();
  const channels = AdminChannels;

  const [channelsData, setChannelsData] = useState<IAdminChannels>({
    page: 1,
    elements: channels.length,
    channels: [],
  });
  ////
  // удалить

  const language = Languages.find((lang) => lang.name === i18n.language);
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: dateSortingTypes.decrease,
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);

    setChannelsData({
      page: channelsData.page + 1,
      elements: channels.length,
      channels: channels.slice(
        0,
        (channelsData.page + 1) * INTERSECTION_ELEMENTS.adminChannels,
      ),
      isLast:
        channels.length <=
        (channelsData.page + 1) * INTERSECTION_ELEMENTS.adminChannels,
    });
  };

  /////

  useEffect(() => {
    if (data && !isLoading && channelsData.page === 1) {
      setChannelsData({
        ...channelsData,
        channels: channels.slice(0, INTERSECTION_ELEMENTS.adminChannels),
      });
    }
  }, [data, isLoading]);

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
            data={channelsData}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
