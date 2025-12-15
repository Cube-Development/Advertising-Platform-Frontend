import {
  useMaybeRoomContext,
  useMediaDeviceSelect,
} from "@livekit/components-react";
import {
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@shared/ui";
import { LocalAudioTrack, LocalVideoTrack } from "livekit-client";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

type DeviceSelectProps = React.ComponentProps<typeof SelectTrigger> & {
  kind: MediaDeviceKind;
  track?: LocalAudioTrack | LocalVideoTrack | undefined;
  requestPermissions?: boolean;
  onMediaDeviceError?: (error: Error) => void;
  onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
  onActiveDeviceChange?: (deviceId: string) => void;
};

/**
 * Компонент выбора медиа-устройства (микрофон/камера)
 * Применяет DRY - переиспользуется для разных типов устройств
 */
export function TrackDeviceSelect({
  kind,
  track,
  requestPermissions = false,
  onMediaDeviceError,
  onDeviceListChange,
  onActiveDeviceChange,
  className,
  ...props
}: DeviceSelectProps) {
  const room = useMaybeRoomContext();
  const [open, setOpen] = useState(false);
  const [requestPermissionsState, setRequestPermissionsState] =
    useState(requestPermissions);

  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({
      room,
      kind,
      track,
      requestPermissions: requestPermissionsState,
      onError: onMediaDeviceError,
    });

  useEffect(() => {
    onDeviceListChange?.(devices);
  }, [devices, onDeviceListChange]);

  // При открытии селекта запросить устройства заново
  useLayoutEffect(() => {
    if (open) {
      setRequestPermissionsState(true);
    }
  }, [open]);

  const handleActiveDeviceChange = (deviceId: string) => {
    setActiveMediaDevice(deviceId);
    onActiveDeviceChange?.(deviceId);
  };

  const filteredDevices = useMemo(
    () => devices.filter((d) => d.deviceId !== ""),
    [devices],
  );

  // Скрываем селектор, если устройств меньше 2
  if (filteredDevices.length < 2) {
    return null;
  }

  return (
    <Select
      open={open}
      value={activeDeviceId}
      onOpenChange={setOpen}
      onValueChange={handleActiveDeviceChange}
    >
      <SelectTrigger
        className={cn(
          "w-auto rounded-full p-1 text-sm cursor-pointer border-0 shadow-none focus:ring-0 focus:ring-offset-0 text-muted-foreground h-[unset]",
          className,
        )}
        {...props}
      ></SelectTrigger>
      <SelectContent>
        {filteredDevices.map((device) => (
          <SelectItem
            key={device.deviceId}
            value={device.deviceId}
            className="font-mono text-xs"
          >
            {device.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
