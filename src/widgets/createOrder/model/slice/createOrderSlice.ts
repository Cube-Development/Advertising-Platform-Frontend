import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateOrderBlur } from "../config";

export interface ExternalField {
  name: any;
  value: any;
}

interface CreateOrderState {
  blur: ICreateOrderBlur;
  externalField: ExternalField | null;
}

const initialState: CreateOrderState = {
  blur: {
    post: true,
    datetime: true,
    prices: true,
    payment: true,
  },
  externalField: null,
};

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    setBlur: (state, action: PayloadAction<keyof ICreateOrderBlur>) => {
      state.blur[action.payload] = false;
    },
    resetBlur: (state) => {
      state.blur = initialState.blur;
    },
    setExternalField: (state, action: PayloadAction<ExternalField>) => {
      state.externalField = action.payload;
    },
    clearExternalField: (state) => {
      state.externalField = null;
    },
  },
});

export const { setBlur, resetBlur, setExternalField, clearExternalField } =
  createOrderSlice.actions;
