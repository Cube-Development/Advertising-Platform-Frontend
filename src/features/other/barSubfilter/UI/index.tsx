import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";
import {
  profileTypes,
  profileTypesName,
  profileTypesNum,
  walletTopUpTypes,
} from "@entities/wallet";
import {
  chatAdvertiserTypes,
  chatTypesFilter,
  chatManagerTypes,
} from "@entities/communication";
import {
  addFileFilter,
  addFileTypes,
  catalogBarFilter,
  catalogTypes,
} from "@entities/project";
import { roles } from "@entities/user";
import { pageFilter } from "@shared/routing";

interface BarSubfilterProps {
  page: pageFilter;
  resetValues: () => void;
  resetActiveAccount?: (account: null) => void;
  profileFilter?: {
    type: profileTypesName;
    id?: profileTypesNum;
  };
  changeProfile?: (profile: {
    type: profileTypesName;
    id?: profileTypesNum;
  }) => void;
  catalogFilter?: catalogBarFilter;
  changeCatalogFilter?: (filter: catalogBarFilter) => void;
  chatFilter?: chatTypesFilter;
  changeChatFilter?: (filter: chatTypesFilter) => void;
  fileFilter?: addFileFilter;
  changeFileFilter?: (filter: addFileFilter) => void;
}

interface IFilterOption {
  type: profileTypesName | catalogBarFilter | chatTypesFilter | addFileFilter;
  id?: profileTypesNum;
}

export const BarSubfilter: FC<BarSubfilterProps> = ({
  page,
  resetValues,
  resetActiveAccount,
  profileFilter,
  changeProfile,
  catalogFilter,
  changeCatalogFilter,
  chatFilter,
  changeChatFilter,
  fileFilter,
  changeFileFilter,
}) => {
  const { t } = useTranslation();
  const role = Cookies.get("role")
    ? (Cookies.get("role") as roles)
    : roles.advertiser;

  const [options, filter] =
    page === pageFilter.profile || page === pageFilter.walletWithdraw
      ? [profileTypes, profileFilter && profileFilter.type]
      : page === pageFilter.catalog
        ? [catalogTypes, catalogFilter]
        : page === pageFilter.walletTopUp
          ? [walletTopUpTypes, profileFilter && profileFilter.type]
          : page === pageFilter.chat && role === roles.advertiser
            ? [chatAdvertiserTypes, chatFilter]
            : page === pageFilter.chat && role === roles.manager
              ? [chatManagerTypes, chatFilter]
              : page === pageFilter.createOrderFiles
                ? [addFileTypes, fileFilter]
                : [[], "", ""];

  const toggleBar = (option: IFilterOption) => {
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
    } else if (page === pageFilter.catalog) {
      changeCatalogFilter &&
        changeCatalogFilter(option.type as catalogBarFilter);
    } else if (page === pageFilter.chat) {
      changeChatFilter && changeChatFilter(option.type as chatTypesFilter);
    } else if (page === pageFilter.createOrderFiles) {
      changeFileFilter && changeFileFilter(option.type as addFileFilter);
    }
    if (page === pageFilter.catalog) {
      // if (page !== pageFilter.catalog) {
      // изменил этот момент
      resetValues();
    }
  };

  return (
    <div
      // style={{ "--borderRadius": "20px" } as React.CSSProperties}
      // className={`${styles.types} `}
      className={styles.types}
    >
      <ul
        className={
          page === pageFilter.catalog || pageFilter.createOrderFiles
            ? styles.catalog
            : styles.profile
        }
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={filter === option.type ? styles.active : ""}
            onClick={() => toggleBar(option)}
          >
            {t(option.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
