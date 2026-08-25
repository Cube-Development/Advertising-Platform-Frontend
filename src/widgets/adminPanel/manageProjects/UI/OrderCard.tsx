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
        <Badge variant="outline" className="shrink-0 w-fit">
          {getProjectStatusLabel(order.status)}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("admin_panel.manage_projects.completed")}
              </p>
              <p className="text-sm font-semibold">
                {order.order_completed_count}
              </p>
            </div>
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
