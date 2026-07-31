import { IAdminManageProjectOrder } from "@entities/admin";
import { formatMoney } from "@shared/utils";
import { getProjectStatusLabel } from "../model/constants";

type OrderCardProps = {
  order: IAdminManageProjectOrder;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 border-b border-black/10 px-4 py-3 text-sm md:grid-cols-6 md:items-center">
      <div className="min-w-0 md:col-span-2">
        <p className="text-xs text-black/40 md:hidden">Ссылка</p>
        <a
          href={order.url}
          target="_blank"
          rel="noreferrer"
          className="truncate text-[var(--Personal-colors-main)] underline"
        >
          {order.url}
        </a>
      </div>
      <div>
        <p className="text-xs text-black/40 md:hidden">Дата</p>
        <p className="truncate">{order.order_date}</p>
        <p className="truncate text-xs text-black/50">
          {order.order_time.time_from} – {order.order_time.time_to}
        </p>
      </div>
      <div>
        <p className="text-xs text-black/40 md:hidden">Статус</p>
        <p className="truncate">{getProjectStatusLabel(order.status)}</p>
      </div>
      <div>
        <p className="text-xs text-black/40 md:hidden">Выполнено</p>
        <p>{order.order_completed_count}</p>
      </div>
      <div>
        <p className="text-xs text-black/40 md:hidden">Цена</p>
        <p className="truncate">{formatMoney(order.price.with_vat)}</p>
        <p className="truncate text-xs text-black/50">
          без НДС: {formatMoney(order.price.without_vat)}
        </p>
      </div>
    </div>
  );
};
