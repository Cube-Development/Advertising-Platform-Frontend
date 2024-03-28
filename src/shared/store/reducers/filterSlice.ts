import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { subprofileFilter } from "@shared/config/profileFilter";
import { profileFilter } from "@shared/config/profileFilter";
import { catalogFilter } from "@shared/config/catalogFilter";
import { platformFilter } from "@shared/config/postFilter";
// import { walletFilter } from "@shared/config/walletFilter";

interface FilterState {
  typeFilter: string;
  statusFilter: string;
  profileFilter: string;
  subprofileFilter: string;
  catalogFilter: string;
  networkFilter: string;
  sortingFilter: string;
  platformFilter: string;
  // walletFilter: string;
}

const initialState: FilterState = {
  typeFilter: projectTypesFilter.myProject,
  statusFilter: myProjectStatusFilter.active,
  profileFilter: profileFilter.selfEmployed,
  subprofileFilter: subprofileFilter.account,
  catalogFilter: catalogFilter.parameters,
  networkFilter: "",
  sortingFilter: "",
  platformFilter: platformFilter.telegram,
  // walletFilter: walletFilter.selfEmployed,
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
    setProfileFilter: (state, action: PayloadAction<string>) => {
      state.profileFilter = action.payload;
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
