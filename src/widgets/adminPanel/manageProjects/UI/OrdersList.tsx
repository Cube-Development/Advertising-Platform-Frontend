import { IAdminManageProjects } from "@entities/admin";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { OrderCard } from "./OrderCard";

type OrdersListProps = {
  data?: IAdminManageProjects;
  isLoading: boolean;
  onShowMore: () => void;
};

export const OrdersList = ({
  data,
  isLoading,
  onShowMore,
}: OrdersListProps) => {
  if (!isLoading && !data?.orders?.length) {
    return (
      <p className="px-4 py-8 text-center text-sm text-black/50">
        Ордеры не найдены
      </p>
    );
  }

  return (
    <div>
      <div className="hidden grid-cols-6 gap-3 border-b border-black/10 px-4 py-3 text-xs font-medium text-black/50 md:grid">
        <p className="col-span-2">Ссылка</p>
        <p>Дата / время</p>
        <p>Статус</p>
        <p>Выполнено</p>
        <p>Цена</p>
      </div>

      {data?.orders?.map((order, index) => (
        <OrderCard
          key={`${order.url}-${order.order_date}-${order.order_time.time_from}-${index}`}
          order={order}
        />
      ))}

      {isLoading && (
        <div className="flex justify-center py-6">
          <SpinnerLoaderSmall />
        </div>
      )}

      {data && !data.isLast && (
        <div
          className="flex cursor-pointer justify-center py-4"
          onClick={onShowMore}
        >
          {isLoading ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
        </div>
      )}

      {!data &&
        isLoading &&
        Array.from({
          length: INTERSECTION_ELEMENTS.ADMIN_MANAGE_PROJECTS,
        }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse border-b border-black/5 bg-black/[0.03]"
          />
        ))}
    </div>
  );
};
