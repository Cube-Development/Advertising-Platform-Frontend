import { pageFilter } from "@shared/config/pageFilter";
import { IStartProjectProps } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/store";
import { roles } from "@shared/config/roles";
import { IAddChannelQuery } from "@shared/types/platform";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { paths } from "@shared/routing";

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
            <p>{t(`orders_advertiser.my_campaign`)}</p>
            {listLength && (
              <div>
                {<NewProjectBtn listLength={listLength} />}
                {<TurnkeyProjectBtn listLength={listLength} />}
              </div>
            )}
          </>
        ) : (
          role === roles.manager && (
            <>
              <p>{t(`orders_manager.orders`)}</p>
            </>
          )
        )
      ) : page === pageFilter.platform ? (
        <>
          <p>{t(`platforms_blogger.my_platform`)}</p>
          {!listLength && (
            <div>
              {
                <AddChannelBtn
                  path={`${paths.addChannel}?add_channel=${addChannelQueries.platforms}`}
                />
              }
            </div>
          )}
        </>
      ) : (
        page === pageFilter.offer && (
          <>
            <p>{t(`offers_blogger.my_offers`)}</p>

            {listLength && (
              <div>
                {
                  <AddChannelBtn
                    path={`${paths.addChannel}?add_channel=${addChannelQueries.offers}`}
                  />
                }
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};
