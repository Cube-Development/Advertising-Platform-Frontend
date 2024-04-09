import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { subprofileFilter } from "@shared/config/profileFilter";
import { catalogFilter } from "@shared/config/catalogFilter";
import {
  profileTypesName,
  profileTypesNum,
} from "@shared/config/profileFilter";
import { platformFilter, platformTypes } from "@shared/config/postFilter";
import { chatFilter } from "@shared/config/chatFilter";
import { addFileFilter } from "@shared/config/addFileFilter";
import { IPlatformLink } from "@shared/types/platform";

interface FilterState {
  typeFilter: string;
  statusFilter: string;
  profileFilter: {
    type: profileTypesName | catalogFilter | chatFilter | addFileFilter;
    id?: profileTypesNum;
  };
  subprofileFilter: {
    type: subprofileFilter;
    id: profileTypesNum;
  };
  catalogFilter: string;
  networkFilter: string;
  sortingFilter: string;
  platformFilter: IPlatformLink;
  chatFilter: string;
  addFileFilter: string;
}

const initialState: FilterState = {
  typeFilter: projectTypesFilter.myProject,
  statusFilter: myProjectStatusFilter.active,
  profileFilter: {
    type: profileTypesName.selfEmployedAccounts,
    id: profileTypesNum.selfEmployedAccounts,
  },
  subprofileFilter: {
    type: subprofileFilter.account,
    id: profileTypesNum.selfEmployedAccounts,
  },
  catalogFilter: catalogFilter.parameters,
  networkFilter: "",
  sortingFilter: "",
  platformFilter: platformTypes[0],
  chatFilter: chatFilter.blogger,
  addFileFilter: addFileFilter.mediafile,
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
        type: profileTypesName | catalogFilter | chatFilter | addFileFilter;
        id?: profileTypesNum;
      }>,
    ) => {
      state.profileFilter.type = action.payload.type;
      state.profileFilter.id = action.payload.id;
    },
    setSubprofileFilter: (
      state,
      action: PayloadAction<{ type: subprofileFilter; id: profileTypesNum }>,
    ) => {
      state.subprofileFilter.type = action.payload.type;
      state.subprofileFilter.id = action.payload.id;
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
    setPlatformFilter: (state, action: PayloadAction<IPlatformLink>) => {
      state.platformFilter = action.payload;
    },
    setChatFilter: (state, action: PayloadAction<string>) => {
      state.chatFilter = action.payload;
    },
    setAddFileFilter: (state, action: PayloadAction<string>) => {
      state.addFileFilter = action.payload;
    },
  },
});
