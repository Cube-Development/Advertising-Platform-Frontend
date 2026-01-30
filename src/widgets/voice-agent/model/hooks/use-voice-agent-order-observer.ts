import { useEffect } from "react";
import { useAppDispatch } from "@shared/hooks";
import { updateVoiceSyncState } from "../slice/sync-slice";

interface IOrderStateParams {
  campaignName?: string;
  totalPrice?: number;
  isCartEmpty?: boolean;
  blur?: Record<string, any>;
}

/**
 * Hook to observe Create Order specific state and update the voice agent sync slice.
 */
export function useVoiceAgentOrderObserver(params: IOrderStateParams) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateVoiceSyncState({
        campaignName: params.campaignName,
        totalPrice: params.totalPrice,
        isCartEmpty: params.isCartEmpty,
        activeBlurs: params.blur,
      }),
    );
  }, [
    params.campaignName,
    params.totalPrice,
    params.isCartEmpty,
    params.blur,
    dispatch,
  ]);
}
