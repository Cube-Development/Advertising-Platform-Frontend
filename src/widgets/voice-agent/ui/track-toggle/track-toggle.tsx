import * as React from "react";
import { Track } from "livekit-client";
import { Mic, MicOff, Video, VideoOff, MonitorUp, Loader2 } from "lucide-react";
import { Toggle } from "@shared/ui";
import { cn } from "@shared/ui";

/**
 * Получить иконку для источника трека
 */
function getSourceIcon(
  source: Track.Source,
  enabled: boolean,
  pending = false,
) {
  if (pending) {
    return Loader2;
  }

  switch (source) {
    case Track.Source.Microphone:
      return enabled ? Mic : MicOff;
    case Track.Source.Camera:
      return enabled ? Video : VideoOff;
    case Track.Source.ScreenShare:
      return MonitorUp;
    default:
      return React.Fragment;
  }
}

export type TrackToggleProps = React.ComponentProps<typeof Toggle> & {
  source: Track.Source;
  pending?: boolean;
};

/**
 * Универсальный компонент переключения треков
 * Применяет Single Responsibility - только отображение и переключение
 */
export function TrackToggle({
  source,
  pressed,
  pending,
  className,
  children,
  ...props
}: TrackToggleProps) {
  const IconComponent = getSourceIcon(source, pressed ?? false, pending);

  return (
    <Toggle
      pressed={pressed}
      aria-label={`Toggle ${source}`}
      className={cn(
        className,
        "border-0 rounded-r-full data-[state=on]:bg-transparent gap-1",
      )}
      {...props}
    >
      <IconComponent
        className={cn(
          "w-4 h-4 text-muted-foreground",
          pending && "animate-spin",
        )}
      />
      {children}
    </Toggle>
  );
}
