import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { myProjectStatusFilter, projectTypesFilter } from "@shared/config/projectFilter";
import { subprofileFilter } from "@shared/config/profileFilter";
import { profileFilter } from "@shared/config/profileFilter";

interface FilterState {
    typeFilter: string;
    statusFilter: string;
    profileFilter: string;
    subprofileFilter: string;
};
  
const initialState: FilterState = {
    typeFilter: projectTypesFilter.myProject,
    statusFilter: myProjectStatusFilter.active,
    profileFilter: profileFilter.selfEmployed,
    subprofileFilter: subprofileFilter.account,
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
  },
});

export default filterSlice.reducer;
