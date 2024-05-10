import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  profileTypes,
  profileTypesName,
  profileTypesNum,
  walletTopUpTypes,
} from "@shared/config/profileFilter";
import { catalogFilter, catalogTypes } from "@shared/config/catalogFilter";
import { pageFilter } from "@shared/config/pageFilter";
import { chatFilter, chatTypes } from "@shared/config/chatFilter";
import { addFileFilter, addFileTypes } from "@shared/config/addFileFilter";

interface BarProfileFilterProps {
  page: pageFilter;
  resetValues: () => void;
  resetActiveAccount?: (account: null) => void;
}

interface IFilterOption {
  type: profileTypesName | catalogFilter | chatFilter | addFileFilter;
  id?: profileTypesNum;
}

export const BarProfileFilter: FC<BarProfileFilterProps> = ({
  page,
  resetValues,
  resetActiveAccount,
}) => {
  const { t } = useTranslation();

  const { profileFilter, catalogFilter, chatFilter, addFileFilter } =
    useAppSelector((state) => state.filter);
  const [options, filter] =
    page === pageFilter.profile || page === pageFilter.walletWithdraw
      ? [profileTypes, profileFilter.type]
      : page === pageFilter.catalog
        ? [catalogTypes, catalogFilter]
        : page === pageFilter.walletTopUp
          ? [walletTopUpTypes, profileFilter.type]
          : page === pageFilter.chat
            ? [chatTypes, chatFilter]
            : page === pageFilter.createOrderFiles
              ? [addFileTypes, addFileFilter]
              : [[], "", ""];

  const dispatch = useAppDispatch();

  const toggleBar = (option: IFilterOption) => {
    if (
      page === pageFilter.profile ||
      page === pageFilter.walletWithdraw ||
      page === pageFilter.walletTopUp
    ) {
      const newFilter = { type: option.type, id: option.id };
      dispatch(filterSlice.actions.setProfileFilter(newFilter));
      resetActiveAccount && resetActiveAccount(null);
    } else if (page === pageFilter.catalog) {
      dispatch(filterSlice.actions.setCatalogFilter(option.type));
    } else if (page === pageFilter.chat) {
      dispatch(filterSlice.actions.setChatFilter(option.type));
    } else if (page === pageFilter.createOrderFiles) {
      dispatch(filterSlice.actions.setAddFileFilter(option.type));
    }
    if (page !== pageFilter.catalog) {
      resetValues();
    }
  };

  return (
    <div className={styles.types}>
      <ul
        className={
          page === pageFilter.catalog ? styles.catalog : styles.profile
        }
        // className={styles.profile}
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
