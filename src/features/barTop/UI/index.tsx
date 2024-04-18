import { pageFilter } from "@shared/config/pageFilter";
import { IStartProjectProps } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BarTopProps {
  listLength: boolean;
  page: pageFilter;
  NewProjectBtn: FC<IStartProjectProps>;
  TurnkeyProjectBtn: FC<IStartProjectProps>;
  AddPlatformBtn: FC;
}

export const BarTop: FC<BarTopProps> = ({
  listLength,
  NewProjectBtn,
  TurnkeyProjectBtn,
  AddPlatformBtn,
  page,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.top}>
      {page === pageFilter.order ? (
        <>
          <p>{t(`orders_advertiser.my_campaign`)}</p>
          {listLength && (
            <div>
              {<NewProjectBtn listLength={listLength} />}
              {<TurnkeyProjectBtn listLength={listLength} />}
            </div>
          )}
        </>
      ) : page === pageFilter.platform ? (
        <>
          <p>{t(`platforms_blogger.my_platform`)}</p>
          {!listLength && <div>{<AddPlatformBtn />}</div>}
        </>
      ) : (
        page === pageFilter.offer && (
          <>
            <p>{t(`offers_blogger.my_offers`)}</p>

            {listLength && <div>{<AddPlatformBtn />}</div>}
          </>
        )
      )}
    </div>
  );
};
