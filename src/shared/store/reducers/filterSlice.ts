import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { subprofileFilter } from "@shared/config/profileFilter";
// import { profileFilter } from "@shared/config/profileFilter";
import { catalogFilter } from "@shared/config/catalogFilter";
import {
  profileTypesName,
  profileTypesNum,
} from "@shared/config/profileFilter";
// import { walletFilter } from "@shared/config/walletFilter";

interface FilterState {
  typeFilter: string;
  statusFilter: string;
  profileFilter: {
    type: profileTypesName | catalogFilter;
    id?: profileTypesNum;
  };
  subprofileFilter: string;
  catalogFilter: string;
  networkFilter: string;
  sortingFilter: string;
  platformFilter: string;
}

const initialState: FilterState = {
  typeFilter: projectTypesFilter.myProject,
  statusFilter: myProjectStatusFilter.active,
  profileFilter: {
    type: profileTypesName.selfEmployedAccounts,
    id: profileTypesNum.selfEmployedAccounts,
  },
  subprofileFilter: subprofileFilter.account,
  catalogFilter: catalogFilter.parameters,
  networkFilter: "",
  sortingFilter: "",
  platformFilter: platformFilter.telegram,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setProfileFilter: (
      state,
      action: PayloadAction<{
        type: profileTypesName | catalogFilter;
        id?: profileTypesNum;
      }>
    ) => {
      state.profileFilter.type = action.payload.type;
      state.profileFilter.id = action.payload.id;
    },
    setSubprofileFilter: (state, action: PayloadAction<string>) => {
      state.subprofileFilter = action.payload;
    },
    setCatalogFilter: (state, action: PayloadAction<string>) => {
      state.catalogFilter = action.payload;
    },
    setNetworkFilter: (state, action: PayloadAction<string>) => {
      state.networkFilter = action.payload;
    },
    setSortingFilter: (state, action: PayloadAction<string>) => {
      state.sortingFilter = action.payload;
    },
    setPlatformFilter: (state, action: PayloadAction<string>) => {
      state.platformFilter = action.payload;
    },
  },
});

export default filterSlice.reducer;
