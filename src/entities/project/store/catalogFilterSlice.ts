import { getCatalogReq } from "@entities/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CatalogFilterState {
  formState: getCatalogReq | null;
}

const initialState: CatalogFilterState = {
  formState: null,
};

export const catalogFilterSlice = createSlice({
  name: "catalogFilter",
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<getCatalogReq>) => {
      state.formState = action.payload;
    },
    resetFormState: (state) => {
      state.formState = null;
    },
  },
});

export default catalogFilterSlice.reducer;
export const { setFormState, resetFormState } = catalogFilterSlice.actions;
