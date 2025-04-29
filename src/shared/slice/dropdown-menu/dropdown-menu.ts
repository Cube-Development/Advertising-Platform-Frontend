import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropdownMenuState {
  dropdownMenu: {
    isOpen: boolean;
    title: string;
  };
}

const initialState: DropdownMenuState = {
  dropdownMenu: {
    isOpen: false,
    title: "",
  },
};

export const dropdownMenuSlice = createSlice({
  name: "dropdownMenu",
  initialState,

  reducers: {
    setDropDownMenu: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        title: string;
      }>,
    ) => {
      state.dropdownMenu.isOpen = action.payload.isOpen;
      state.dropdownMenu.title = action.payload.title;
    },
  },
});

export const { setDropDownMenu } = dropdownMenuSlice.actions;
