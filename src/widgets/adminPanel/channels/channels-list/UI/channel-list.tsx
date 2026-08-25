import { IAdminChannels } from "@entities/admin-panel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAccordionObserver } from "@shared/hooks";
import { Accordion, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChannelCard } from "../card";

const ChannelCardSkeleton: FC = () => (
  <div className="rounded-lg border p-4 sm:p-6 space-y-4">
    <div className="flex gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
    <Skeleton className="h-12 w-full" />
  </div>
);

interface ChannelsListProps {
  data?: IAdminChannels;
  isLoading: boolean;
  handleChange: () => void;
}

export const ChannelsList: FC<ChannelsListProps> = ({
  data,
  isLoading,
  handleChange,
}) => {
  const { t } = useTranslation();
  const channels = data?.channels ?? [];
  const showEmpty = !isLoading && channels.length === 0;

  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  useAccordionObserver(accordionRefs, [data]);

  return (
    <div className="min-h-[var(--cards-list-height)]">
      {showEmpty ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("admin_panel.channels.empty")}
        </p>
      ) : (
        <Accordion type="single" collapsible>
          <div className="grid grid-flow-row gap-2.5">
            {channels.map((card, index) => (
              <ChannelCard
                key={card?.channel?.id}
                card={card}
                accordionRefs={accordionRefs}
                index={index}
              />
            ))}

            {isLoading &&
              Array.from({
                length: INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
              }).map((_, index) => <ChannelCardSkeleton key={index} />)}

            {data && !data.isLast && channels.length > 0 && (
              <div
                className="flex cursor-pointer justify-center py-4"
                onClick={handleChange}
              >
                {isLoading ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </div>
  );
};
