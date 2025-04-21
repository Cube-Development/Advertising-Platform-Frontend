import {
  profileTypes,
  profileTypesName,
  profileTypesNum,
  walletTopUpTypes,
} from "@entities/wallet";
import { pageFilter } from "@shared/routing";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

type IBarFilter<T> = {
  type: T;
  name: string;
};

type BarSubfilterProps<T> = {
  page?: pageFilter;
  resetValues?: () => void;
  resetActiveAccount?: (account: null) => void;
  profileFilter?: {
    type: profileTypesName;
    id?: profileTypesNum;
  };
  changeProfile?: (profile: {
    type: profileTypesName;
    id?: profileTypesNum;
  }) => void;

  tab_list?: IBarFilter<T>[];
  tab?: T;
  changeTab?: (filter: T) => void;

  badge?: { status: string; count: number }[];
  isFixedColumns?: boolean;
};

type IFilterOption<T> = {
  type: T;
  id?: profileTypesNum;
};

export const BarSubfilter = <T,>({
  page,
  resetValues = () => {},
  resetActiveAccount,
  profileFilter,
  changeProfile,

  tab_list = [],
  tab,
  changeTab,

  badge,
  isFixedColumns = false,
}: BarSubfilterProps<T>) => {
  const { t } = useTranslation();

  const [options, filter] =
    page === pageFilter.profile || page === pageFilter.walletWithdraw
      ? [profileTypes, profileFilter && profileFilter.type]
      : page === pageFilter.walletTopUp
        ? [walletTopUpTypes, profileFilter && profileFilter.type]
        : tab_list?.length && tab !== undefined && tab !== null
          ? [tab_list, tab]
          : [[], "", ""];

  const toggleBar = (option: IFilterOption<T>) => {
    if (
      page === pageFilter.profile ||
      page === pageFilter.walletWithdraw ||
      page === pageFilter.walletTopUp
    ) {
      const newFilter = { type: option.type, id: option.id };
      changeProfile &&
        changeProfile(
          newFilter as {
            type: profileTypesName;
            id?: profileTypesNum;
          },
        );
      resetActiveAccount && resetActiveAccount(null);
    } else if (tab_list?.length && tab !== undefined && tab !== null) {
      changeTab && changeTab(option.type as T);
    }

    if (resetValues) {
      resetValues();
    }
  };

  return (
    <div className={styles.types}>
      <ul
        className={`${styles.common} ${isFixedColumns ? styles.isFixed : ""}`}
        style={
          {
            "--translateIndex": `${options.findIndex((option) => filter === option.type)}`,
            "--lengthFilter": `${options.length}`,
          } as React.CSSProperties
        }
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={` ${filter === option.type ? styles.active : ""}`}
            onClick={() => toggleBar(option as any)}
          >
            <p className="truncate gradient_color">{t(option.name)}</p>
            {!!badge &&
              !!badge?.find((el) => el?.status === option?.type)?.count && (
                <div className={styles.badge}>
                  <span>
                    {badge?.find((el) => el?.status === option?.type)?.count}
                  </span>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
