import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks";
import { updateVoiceSyncState } from "../slice/sync-slice";

/**
 * Hook to observe global UI state and update the voice agent sync slice.
 * Should be called in a top-level component.
 */
export function useVoiceAgentGlobalObserver() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateVoiceSyncState({ activeScreen: location.pathname }));
  }, [location.pathname, dispatch]);
}
