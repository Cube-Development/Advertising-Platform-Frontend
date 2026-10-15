import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPromocodeDiscount } from "../types/promocode.types";

/** Бэкенд не хранит промокод до оплаты: код живёт здесь от корзины до экрана оплаты */
interface PromocodeState {
  code: string | null;
  discount: IPromocodeDiscount | null;
}

const initialState: PromocodeState = {
  code: null,
  discount: null,
};

export const promocodeSlice = createSlice({
  name: "promocode",
  initialState,
  reducers: {
    setPromocode: (
      state,
      action: PayloadAction<{ code: string; discount: IPromocodeDiscount }>,
    ) => {
      state.code = action.payload.code;
      state.discount = action.payload.discount;
    },
    setPromocodeDiscount: (
      state,
      action: PayloadAction<IPromocodeDiscount>,
    ) => {
      state.discount = action.payload;
    },
    resetPromocode: () => initialState,
  },
});

export default promocodeSlice.reducer;
export const { setPromocode, setPromocodeDiscount, resetPromocode } =
  promocodeSlice.actions;
