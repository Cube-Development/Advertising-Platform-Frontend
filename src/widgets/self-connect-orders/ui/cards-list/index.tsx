import { ISelfConnectOrder } from "@entities/self-connect-order";
import { DinamicPagination } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SelfConnectOrderCard } from "../order-card";

const SelfConnectOrderCardSkeleton: FC = () => (
  <div className="rounded-lg border p-4 sm:p-6 space-y-4">
    <div className="flex gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-24 w-full" />
  </div>
);

interface SelfConnectOrdersCardsProps {
  orders: ISelfConnectOrder[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
}

export const SelfConnectOrdersCards: FC<SelfConnectOrdersCardsProps> = ({
  orders,
  handleOnChangePage,
  isLoading,
  isLast,
}) => {
  const { t } = useTranslation();

  const showEmpty = !isLoading && orders.length === 0;

  return (
    <div className="min-h-[var(--cards-list-height)]">
      {showEmpty ? (
        <p className="text-center text-muted-foreground py-8">
          {t("track_orders.empty")}
        </p>
      ) : (
        <div className="grid grid-flow-row gap-2.5">
          {orders.map((order) => (
            <SelfConnectOrderCard key={order.order_id} order={order} />
          ))}
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS }).map(
              (_, index) => <SelfConnectOrderCardSkeleton key={index} />,
            )}
          {!isLast && !isLoading && orders.length > 0 && (
            <DinamicPagination onChange={handleOnChangePage} />
          )}
        </div>
      )}
    </div>
  );
};
