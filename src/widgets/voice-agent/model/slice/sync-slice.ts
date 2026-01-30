import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVoiceAgentSyncState {
  activeScreen: string;
  totalPrice: number;
  campaignName: string;
  isCartEmpty: boolean;
  activeBlurs: Record<string, any>;
  lastUpdated: number;
}

const initialState: IVoiceAgentSyncState = {
  activeScreen: "",
  totalPrice: 0,
  campaignName: "",
  isCartEmpty: true,
  activeBlurs: {},
  lastUpdated: 0,
};

export const voiceAgentSyncSlice = createSlice({
  name: "voiceAgentSync",
  initialState,
  reducers: {
    updateVoiceSyncState: (
      state,
      action: PayloadAction<Partial<IVoiceAgentSyncState>>,
    ) => {
      Object.assign(state, action.payload);
      state.lastUpdated = Date.now();
    },
  },
});

export const { updateVoiceSyncState } = voiceAgentSyncSlice.actions;
