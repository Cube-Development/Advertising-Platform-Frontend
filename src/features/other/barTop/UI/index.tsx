import { IAddChannelQuery, addChannelQueries } from "@entities/channel";
import { ENUM_ROLES } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BarTopProps {
  listLength: boolean;
  page: ENUM_PAGE_FILTER;
  NewProjectBtn: FC<IStartProjectProps>;
  TurnkeyProjectBtn: FC<IStartProjectProps>;
  AddChannelBtn: FC<IAddChannelQuery>;
  AddManagerNewProjectBtn?: FC;
}

export const BarTop: FC<BarTopProps> = ({
  listLength,
  NewProjectBtn,
  TurnkeyProjectBtn,
  AddChannelBtn,
  AddManagerNewProjectBtn,
  page,
}) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);

  return (
    <div className={styles.top}>
      {page === ENUM_PAGE_FILTER.ORDER ? (
        role === ENUM_ROLES.ADVERTISER ? (
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
          role === ENUM_ROLES.MANAGER && (
            <>
              <p className={styles.title}>{t(`orders_manager.orders`)}</p>
              {AddManagerNewProjectBtn && <AddManagerNewProjectBtn />}
            </>
          )
        )
      ) : page === ENUM_PAGE_FILTER.PLATFORM ? (
        <>
          <p className={styles.title}>{t(`platforms_blogger.my_platform`)}</p>
          {/* {!listLength && ( */}
          <div>
            <AddChannelBtn
              // path={`${paths.addChannel}?add_channel=${addChannelQueries.platforms}`}
              path={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                [queryParamKeys.addChannel]: addChannelQueries.platforms,
              })}
            />
          </div>
          {/* )} */}
        </>
      ) : (
        page === ENUM_PAGE_FILTER.OFFER && (
          <>
            <p className={styles.title}>{t(`offers_blogger.my_offers`)}</p>

            {/* {listLength && ( */}
            <div>
              <AddChannelBtn
                // path={`${paths.addChannel}?add_channel=${addChannelQueries.offers}`}
                path={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                  [queryParamKeys.addChannel]: addChannelQueries.offers,
                })}
              />
            </div>
            {/* )} */}
          </>
        )
      )}
    </div>
  );
};
