import { CHANNEL_TAG_I18N, getChannelTagView, IChannelTag } from "@entities/project";
import { Badge, cn } from "@shared/ui/shadcn-ui";
import { Check, X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ChannelCardTagsProps {
  tags?: IChannelTag[];
  compact?: boolean;
  className?: string;
}

export const ChannelCardTags: FC<ChannelCardTagsProps> = ({
  tags,
  compact,
  className,
}) => {
  const { t } = useTranslation();
  const viewTags = getChannelTagView(tags);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center min-w-0",
        compact ? "gap-0.5 md:gap-1 mt-0.5" : "gap-1 mobile-xl:gap-1.5",
        className,
      )}
    >
      {viewTags.map(({ tag, allowed }) => {
        const Icon = allowed ? Check : X;

        return (
          <Badge
            key={tag}
            variant={allowed ? "success" : "destructive"}
            className={cn(
              "shrink-0 gap-0.5 font-medium leading-none whitespace-nowrap pointer-events-none",
              compact
                ? "px-1 py-px text-[7px] rounded-md md:px-1.5 md:py-0 md:text-[9px]"
                : "px-1.5 py-px text-[9px] mobile-xl:px-2 mobile-xl:py-0.5 mobile-xl:text-[11px]",
            )}
          >
            <Icon
              className={cn(
                compact ? "size-2 md:size-2.5" : "size-2.5 mobile-xl:size-3",
              )}
              strokeWidth={3}
            />
            {t(CHANNEL_TAG_I18N[tag])}
          </Badge>
        );
      })}
    </div>
  );
};
