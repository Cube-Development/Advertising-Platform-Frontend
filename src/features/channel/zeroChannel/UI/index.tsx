import {
  IAddChannelQuery,
  addChannelQueries,
  ENUM_CHANNEL_STATUS,
} from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import { HappySmileIcon, SadSmileIcon } from "@shared/assets";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ZeroChannelProps {
  AddChannelBtn: FC<IAddChannelQuery>;
  path?: ENUM_PATHS;
  page: ENUM_PAGE_FILTER;
  statusFilter: ENUM_CHANNEL_STATUS | ENUM_OFFER_STATUS | string;
}

export const ZeroChannel: FC<ZeroChannelProps> = ({
  AddChannelBtn,
  page,
  path,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const selectedPath =
    path === ENUM_PATHS.OFFERS
      ? buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
          [queryParamKeys.addChannel]: addChannelQueries.offers,
        })
      : buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
          [queryParamKeys.addChannel]: addChannelQueries.platforms,
        });
  // : `${paths.addChannel}?add_channel=${addChannelQueries.platforms}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.smile}>
        {statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
          <>
            <div>
              <HappySmileIcon />
            </div>
            <p>{t(`platforms_blogger.no_banned`)}</p>
          </>
        ) : (
          <>
            <div>
              <SadSmileIcon />
            </div>
            {page === ENUM_PAGE_FILTER.OFFER ? (
              <p>{t(`offers_blogger.no_offers`)}</p>
            ) : (
              <p>{t(`platforms_blogger.no_platform`)}</p>
            )}
          </>
        )}
      </div>
      <AddChannelBtn path={selectedPath} />
    </div>
  );
};
