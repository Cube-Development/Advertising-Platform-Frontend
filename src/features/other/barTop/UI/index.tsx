import { IAddChannelQuery, addChannelQueries } from "@entities/channel";
import { roles } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { pageFilter, paths } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BarTopProps {
  listLength: boolean;
  page: pageFilter;
  NewProjectBtn: FC<IStartProjectProps>;
  TurnkeyProjectBtn: FC<IStartProjectProps>;
  AddChannelBtn: FC<IAddChannelQuery>;
}

export const BarTop: FC<BarTopProps> = ({
  listLength,
  NewProjectBtn,
  TurnkeyProjectBtn,
  AddChannelBtn,
  page,
}) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);

  return (
    <div className={styles.top}>
      {page === pageFilter.order ? (
        role === roles.advertiser ? (
          <>
            <p className={`${styles.title} truncate`}>
              {t(`orders_advertiser.my_campaign`)}
            </p>
            {/* {listLength && ( */}
            <div className={styles.adv}>
              <TurnkeyProjectBtn listLength={listLength} />
              <NewProjectBtn listLength={listLength} />
            </div>
            {/* )} */}
          </>
        ) : (
          role === roles.manager && (
            <>
              <p className={styles.title}>{t(`orders_manager.orders`)}</p>
            </>
          )
        )
      ) : page === pageFilter.platform ? (
        <>
          <p className={styles.title}>{t(`platforms_blogger.my_platform`)}</p>
          {/* {!listLength && ( */}
          <div>
            <AddChannelBtn
              path={`${paths.addChannel}?add_channel=${addChannelQueries.platforms}`}
            />
          </div>
          {/* )} */}
        </>
      ) : (
        page === pageFilter.offer && (
          <>
            <p className={styles.title}>{t(`offers_blogger.my_offers`)}</p>

            {/* {listLength && ( */}
            <div>
              <AddChannelBtn
                path={`${paths.addChannel}?add_channel=${addChannelQueries.offers}`}
              />
            </div>
            {/* )} */}
          </>
        )
      )}
    </div>
  );
};
