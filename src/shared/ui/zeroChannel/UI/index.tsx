import { SadSmileIcon, HappySmileIcon } from "@shared/assets";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { useAppSelector } from "@shared/store";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { pageFilter } from "@shared/config/pageFilter";
import { IAddChannelQuery } from "@shared/types/platform";
import { paths } from "@shared/routing";
import { addChannelQueries } from "@shared/config/addChannelQueries";

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
        {statusFilter === platformStatusFilter.banned ? (
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
