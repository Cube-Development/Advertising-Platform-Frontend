import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  balance: number;
}

const initialState: WalletState = {
  balance: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export default walletSlice.reducer;
export const { setBalance } = walletSlice.actions;
