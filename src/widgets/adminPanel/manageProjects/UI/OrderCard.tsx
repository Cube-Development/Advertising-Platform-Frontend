import type { IAdminManageProjectOrder } from "@entities/admin";
import { useCopyLink } from "@shared/hooks";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@shared/ui/shadcn-ui";
import { formatMoney } from "@shared/utils";
import { CircleCheckBig } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getProjectStatusLabel } from "../model/constants";

type OrderCardProps = {
  order: IAdminManageProjectOrder;
};

const formatOrderDate = (orderDate: IAdminManageProjectOrder["order_date"]) => {
  if (typeof orderDate === "object") {
    return `${orderDate.date_from} – ${orderDate.date_to}`;
  }
  return orderDate;
};

const formatTime = (time: string) => time?.slice(0, 5) ?? time;

const OrderProgress: FC<{ completed: number; total: number }> = ({
  completed,
  total,
}) => {
  const percent = total > 0 ? (completed / total) * 100 : 0;
  const complete = total > 0 && completed >= total;

  return (
    <div className="flex min-w-[120px] flex-col gap-1.5">
      <div
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tabular-nums ${
          complete
            ? "bg-green-100 text-green-700"
            : "bg-cyan-100 text-cyan-700"
        }`}
      >
        <CircleCheckBig className="size-3.5 shrink-0" />
        {completed} / {total}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            complete ? "bg-green-500" : "bg-cyan-500"
          }`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <a
            href={order.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--URL)] break-all hover:underline"
          >
            {order.url}
          </a>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
          <Badge variant="outline" className="w-fit">
            {getProjectStatusLabel(order.status)}
          </Badge>
          <OrderProgress
            completed={order.order_completed_count}
            total={order.order_total_count}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex flex-col gap-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.order_id")}
            </p>
            <p
              className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
              onClick={() => copyLink(order.order_id)}
            >
              {order.order_id}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.date")}
              </p>
              <p className="text-sm font-semibold">
                {formatOrderDate(order.order_date)}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.time")}
              </p>
              <p className="text-sm font-semibold">
                {formatTime(order.order_time.time_from)} –{" "}
                {formatTime(order.order_time.time_to)}
              </p>
            </div>
            <div className="min-w-0 col-span-2 sm:col-span-1">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.with_vat")}
              </p>
              <p className="text-sm font-semibold">
                {formatMoney(order.price.with_vat)}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.without_vat")}
            </p>
            <p className="text-sm font-medium">
              {formatMoney(order.price.without_vat)}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.blogger_commission")}
            </p>
            <p className="text-sm font-medium">
              {formatMoney(order.price.blogger_commission)}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.catalog_commission")}
            </p>
            <p className="text-sm font-medium">
              {formatMoney(order.price.catalog_commission)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
