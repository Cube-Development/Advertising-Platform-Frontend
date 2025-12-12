import {
  BarVisualizer,
  type TrackReferenceOrPlaceholder,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { TrackDeviceSelect } from "./track-device-select";
import { TrackToggle } from "./track-toggle";
import { cn } from "@shared/ui";

interface TrackSelectorProps {
  kind: MediaDeviceKind;
  source: Track.Source;
  pressed?: boolean;
  pending?: boolean;
  disabled?: boolean;
  className?: string;
  audioTrackRef?: TrackReferenceOrPlaceholder;
  onPressedChange?: (pressed: boolean) => void;
  onMediaDeviceError?: (error: Error) => void;
  onActiveDeviceChange?: (deviceId: string) => void;
}

/**
 * Композитный компонент: переключатель трека + селектор устройства + визуализация
 * Применяет композицию компонентов для сложного UI
 */
export function TrackSelector({
  kind,
  source,
  pressed,
  pending,
  disabled,
  className,
  audioTrackRef,
  onPressedChange,
  onMediaDeviceError,
  onActiveDeviceChange,
}: TrackSelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-0 border border-border/50 rounded-md",
        className,
      )}
    >
      <TrackToggle
        size="icon"
        variant="outline"
        source={source}
        pressed={pressed}
        pending={pending}
        disabled={disabled}
        onPressedChange={onPressedChange}
        className="peer/track group/track has-[.audiovisualizer]:w-auto has-[.audiovisualizer]:px-3 has-[~_button]:rounded-r-none has-[~_button]:pr-2 has-[~_button]:pl-3"
      >
        <BarVisualizer
          barCount={3}
          options={{ minHeight: 5 }}
          track={audioTrackRef}
          className="audiovisualizer flex h-6 w-auto items-center justify-center gap-0.5"
        >
          <span
            className={cn([
              "h-full w-0.5 origin-center rounded-2xl",
              "group-data-[state=on]/track:bg-foreground",
              "data-lk-muted:bg-muted",
            ])}
          />
        </BarVisualizer>
      </TrackToggle>
      <hr className="bg-border relative z-10 -mr-px hidden h-4 w-px border-none has-[~_button]:block" />
      <TrackDeviceSelect
        kind={kind}
        requestPermissions={false}
        onMediaDeviceError={onMediaDeviceError}
        onActiveDeviceChange={onActiveDeviceChange}
        className={cn(["w-auto rounded-l-none pl-2", "hover:text-foreground"])}
      />
    </div>
  );
}
