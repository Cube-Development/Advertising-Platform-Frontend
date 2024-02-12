import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { projectStatus, projectTypes } from '@shared/config/filter';

interface FilterState {
    typeFilter: string;
    statusFilter: string;
};
  
const initialState: FilterState = {
    typeFilter: projectTypes.myProject,
    statusFilter: projectStatus.active
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
  },
});

export default filterSlice.reducer;