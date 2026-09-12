import { CHANNEL_TAG_I18N, getChannelTagView, IChannelTag } from "@entities/project";
import { Badge, cn } from "@shared/ui/shadcn-ui";
import { Check, X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IChannelTagsBadgesProps {
  tags?: IChannelTag[];
  className?: string;
}

export const ChannelTagsBadges: FC<IChannelTagsBadgesProps> = ({
  tags,
  className,
}) => {
  const { t } = useTranslation();
  const viewTags = getChannelTagView(tags);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center min-w-0 gap-1 mt-1.5",
        className,
      )}
    >
      {viewTags.map(({ tag, allowed }) => {
        const Icon = allowed ? Check : X;

        return (
          <Badge
            key={tag}
            variant={allowed ? "success" : "destructive"}
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
