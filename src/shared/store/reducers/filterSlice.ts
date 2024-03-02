import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { myProjectStatusFilter, profileFilter, projectTypesFilter } from '@shared/config/filter';

interface FilterState {
    typeFilter: string;
    statusFilter: string;
    profileFilter: string;
};
  
const initialState: FilterState = {
    typeFilter: projectTypesFilter.myProject,
    statusFilter: myProjectStatusFilter.active,
    profileFilter: profileFilter.selfEmployed,
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

  },
});

export default filterSlice.reducer;
