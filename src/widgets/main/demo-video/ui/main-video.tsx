import { useFindLanguage } from "@entities/user";
import { PlayCircle } from "@solar-icons/react";
import { cn, CustomHeading } from "@shared/ui";
import { useTranslation } from "react-i18next";
import YouTubeVideo from "youtube-video-element/react";
import {
  VideoPlayer,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "../../../../components/kibo-ui/video-player";
import { MAIN_VIDEO_SRC } from "../model/sources";
import { DEMO_VIDEO_STEPS } from "../model/steps";

const CARD_SHADOW =
  "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]";

export const MainVideo = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const src = MAIN_VIDEO_SRC[language.name];

  return (
    <section
      className={cn(
        "container relative w-full py-12 grid gap-6 lg:gap-10",
        className,
      )}
    >
      <div className="grid gap-3 justify-items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0badc2]/20 bg-[#0badc2]/5 px-3 py-1 text-xs sm:text-sm font-semibold text-[#0badc2]">
          <PlayCircle weight="Bold" className="w-4 h-4" />
          {t("main_advertiser.demo_video.badge")}
        </span>
        <CustomHeading
          title={t("main_advertiser.demo_video.title")}
          subtitle={t("main_advertiser.demo_video.subtitle")}
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Бирюзовое свечение за плеером, как у центрального круга WorkWithUs */}
        <div
          className="absolute -inset-6 sm:-inset-10 -z-10 rounded-[40px] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,173,194,0.18) 0%, rgba(11,173,194,0) 70%)",
          }}
        />

        <div
          className={cn(
            "rounded-[20px] lg:rounded-[28px] p-1.5 sm:p-2",
            CARD_SHADOW,
          )}
        >
          <VideoPlayer className="block aspect-video w-full overflow-hidden rounded-[14px] lg:rounded-[22px] bg-black">
            <YouTubeVideo
              key={src}
              slot="media"
              src={src}
              playsInline
              muted
              crossOrigin=""
              className="h-full w-full"
            />
            <VideoPlayerControlBar>
              <VideoPlayerPlayButton />
              <VideoPlayerSeekBackwardButton className="max-sm:hidden" />
              <VideoPlayerSeekForwardButton className="max-sm:hidden" />
              <VideoPlayerTimeRange />
              <VideoPlayerTimeDisplay showDuration className="max-sm:hidden" />
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange className="max-md:hidden" />
            </VideoPlayerControlBar>
          </VideoPlayer>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-3 sm:gap-4">
        {DEMO_VIDEO_STEPS.map(({ icon: Icon, title, text }, idx) => (
          <div
            key={title}
            className={cn(
              "grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl p-3 lg:p-4",
              CARD_SHADOW,
            )}
          >
            <div className="relative flex items-center justify-center rounded-xl lg:rounded-2xl w-10 h-10 lg:w-12 lg:h-12 bg-gray-50/80 text-[#0badc2]">
              <Icon weight="Bold" className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#0badc2] text-[10px] font-bold text-white">
                {idx + 1}
              </span>
            </div>
            <div className="grid gap-0.5">
              <span className="text-sm lg:text-base font-bold leading-tight text-gray-900">
                {t(title)}
              </span>
              <span className="text-xs lg:text-sm font-medium text-gray-500">
                {t(text)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
