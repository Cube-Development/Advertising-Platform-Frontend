import { IAdminManageProjects } from "@entities/admin";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderCard } from "./OrderCard";

const OrderCardSkeleton: FC = () => (
  <div className="rounded-lg border p-4 sm:p-6 space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-16 w-full" />
  </div>
);

type OrdersListProps = {
  data?: IAdminManageProjects;
  isLoading: boolean;
  onShowMore: () => void;
};

export const OrdersList: FC<OrdersListProps> = ({
  data,
  isLoading,
  onShowMore,
}) => {
  const { t } = useTranslation();
  const orders = data?.orders ?? [];
  const showEmpty = !isLoading && orders.length === 0;

  return (
    <div className="min-h-[var(--cards-list-height)]">
      {showEmpty ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("admin_panel.manage_projects.empty")}
        </p>
      ) : (
        <div className="grid grid-flow-row gap-2.5">
          {orders.map((order, index) => (
            <OrderCard
              key={order.order_id || `${order.url}-${index}`}
              order={order}
            />
          ))}

          {isLoading &&
            Array.from({
              length: INTERSECTION_ELEMENTS.ADMIN_MANAGE_PROJECTS,
            }).map((_, index) => <OrderCardSkeleton key={index} />)}

          {data && !data.isLast && !isLoading && orders.length > 0 && (
            <div
              className="flex cursor-pointer justify-center py-4"
              onClick={onShowMore}
            >
              <ShowMoreBtn />
            </div>
          )}

          {data && !data.isLast && isLoading && (
            <div className="flex justify-center py-4">
              <SpinnerLoaderSmall />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
