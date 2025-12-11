import { useCallback, useRef, useState } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import { STORAGE_KEYS } from "..";
import type { MediaControlsState } from "..";

interface UseMediaControlsReturn extends MediaControlsState {
  toggleMicrophone: () => void;
  setMicrophoneDevice: (deviceId: string) => void;
  micTrackRef: React.RefObject<HTMLMediaElement>;
}

/**
 * Хук для управления медиа устройствами (микрофон)
 * Применяет KISS - простая и понятная логика
 */
export function useMediaControls(): UseMediaControlsReturn {
  const localParticipant = useLocalParticipant();
  const micTrackRef = useRef<HTMLMediaElement>(null);

  const [state, setState] = useState<MediaControlsState>({
    microphoneEnabled: false,
    microphonePending: false,
  });

  const toggleMicrophone = useCallback(async () => {
    if (state.microphonePending) return;

    try {
      setState((prev) => ({ ...prev, microphonePending: true }));

      const enabled =
        localParticipant.localParticipant?.isMicrophoneEnabled ?? false;
      await localParticipant.localParticipant?.setMicrophoneEnabled(!enabled);

      setState({
        microphoneEnabled: !enabled,
        microphonePending: false,
      });
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
      setState((prev) => ({ ...prev, microphonePending: false }));
    }
  }, [localParticipant, state.microphonePending]);

  const setMicrophoneDevice = useCallback((deviceId: string) => {
    localStorage.setItem(STORAGE_KEYS.MICROPHONE_DEVICE, deviceId);
  }, []);

  return {
    ...state,
    toggleMicrophone,
    setMicrophoneDevice,
    micTrackRef,
  };
}
