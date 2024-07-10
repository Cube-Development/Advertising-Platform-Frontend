import { SadSmileIcon, HappySmileIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { pageFilter, paths } from "@shared/routing";
import {
  IAddChannelQuery,
  addChannelQueries,
  channelStatusFilter,
} from "@entities/channel";
import { useAppSelector } from "@shared/hooks";

interface ZeroChannelProps {
  AddChannelBtn: FC<IAddChannelQuery>;
  path?: paths;
  page: pageFilter;
}

export const ZeroChannel: FC<ZeroChannelProps> = ({
  AddChannelBtn,
  page,
  path,
}) => {
  const { t } = useTranslation();
  const { statusFilter } = useAppSelector((state) => state.filter);
  const selectedPath =
    path === paths.offers
      ? `${paths.addChannel}?add_channel=${addChannelQueries.offers}`
      : `${paths.addChannel}?add_channel=${addChannelQueries.platforms}`;

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
