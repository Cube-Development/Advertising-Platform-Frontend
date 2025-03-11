import {
  IAddChannelQuery,
  addChannelQueries,
  channelStatusFilter,
} from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { HappySmileIcon, SadSmileIcon } from "@shared/assets";
import { pageFilter, paths } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ZeroChannelProps {
  AddChannelBtn: FC<IAddChannelQuery>;
  path?: paths;
  page: pageFilter;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ZeroChannel: FC<ZeroChannelProps> = ({
  AddChannelBtn,
  page,
  path,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const selectedPath =
    path === paths.offers
      ? buildPathWithQuery(paths.addChannel, {
          [queryParamKeys.addChannel]: addChannelQueries.offers,
        })
      : buildPathWithQuery(paths.addChannel, {
          [queryParamKeys.addChannel]: addChannelQueries.platforms,
        });
  // : `${paths.addChannel}?add_channel=${addChannelQueries.platforms}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.smile}>
        {statusFilter === channelStatusFilter.banned ? (
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
            {page === pageFilter.offer ? (
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
