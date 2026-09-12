import {
  CHANNEL_TAG_I18N,
  ENUM_CHANNEL_TAG,
  IChannelTag,
} from "@entities/project";
import { Badge, cn } from "@shared/ui/shadcn-ui";
import { Check, X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IChannelTagsBadgesProps {
  tags?: IChannelTag[];
  className?: string;
}

const KNOWN_TAGS = new Set<number>([
  ENUM_CHANNEL_TAG.CREDIT,
  ENUM_CHANNEL_TAG.BNPL,
  ENUM_CHANNEL_TAG.REPOST,
]);

export const ChannelTagsBadges: FC<IChannelTagsBadgesProps> = ({
  tags,
  className,
}) => {
  const { t } = useTranslation();
  const visibleTags = tags?.filter((item) => KNOWN_TAGS.has(item.tag));

  if (!visibleTags?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center min-w-0 gap-1 mt-1.5",
        className,
      )}
    >
      {visibleTags.map(({ tag, state }) => {
        const Icon = state ? Check : X;

        return (
          <Badge
            key={tag}
            variant={state ? "success" : "destructive"}
            className="shrink-0 gap-0.5 px-1.5 py-px text-[10px] font-medium leading-none whitespace-nowrap pointer-events-none"
          >
            <Icon className="size-2.5" strokeWidth={3} />
            {t(CHANNEL_TAG_I18N[tag])}
          </Badge>
        );
      })}
    </div>
  );
};
