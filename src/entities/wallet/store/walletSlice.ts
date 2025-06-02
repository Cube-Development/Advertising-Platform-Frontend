import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  balance: number;
  deposit_wallet: number;
  profit_wallet: number;
}

const initialState: WalletState = {
  balance: 0,
  deposit_wallet: 0,
  profit_wallet: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setBalance: (_, action: PayloadAction<WalletState>) => {
      return { ...action.payload };
    },
  },
});

export default walletSlice.reducer;
export const { setBalance } = walletSlice.actions;
