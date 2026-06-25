import {
  ISelfConnectOrder,
  IDatePeriod,
} from "@entities/self-connect-order";
import { ENUM_OFFER_STATUS_BACKEND } from "@entities/offer";
import { toast } from "@shared/ui/shadcn-ui/ui/use-toast";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@shared/ui/shadcn-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@shared/config/i18n";

interface SelfConnectOrderCardProps {
  order: ISelfConnectOrder;
}

const formatOrderDate = (orderDate: string | IDatePeriod) => {
  if (typeof orderDate === "object") {
    return `${orderDate.date_from} – ${orderDate.date_to}`;
  }
  return orderDate;
};

const formatTime = (time: string) => time?.slice(0, 5) ?? time;

const getStatusVariant = (
  apiStatus: ENUM_OFFER_STATUS_BACKEND,
): "default" | "secondary" | "outline" => {
  switch (apiStatus) {
    case ENUM_OFFER_STATUS_BACKEND.wait:
      return "secondary";
    case ENUM_OFFER_STATUS_BACKEND.in_progress:
      return "default";
    case ENUM_OFFER_STATUS_BACKEND.post_review:
      return "outline";
    default:
      return "outline";
  }
};

const handleCopyLink = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({ title: i18n.t("copy.default") });
};

interface UserBlockProps {
  label: string;
  user: ISelfConnectOrder["executor"];
}

const UserBlock: FC<UserBlockProps> = ({ label, user }) => (
  <div className="flex flex-col gap-1 min-w-0">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p
      className="text-sm font-medium truncate text-blue-500 cursor-pointer"
      onClick={() => handleCopyLink(user.email)}
    >
      {user.email}
    </p>
    {user.phone && (
      <p
        className="text-xs text-muted-foreground truncate text-blue-500 cursor-pointer"
        onClick={() => handleCopyLink(user.phone!)}
      >
        {user.phone}
      </p>
    )}
    <p
      className="text-xs text-muted-foreground truncate text-blue-500 cursor-pointer"
      onClick={() => handleCopyLink(user.id)}
    >
      ID: {user.id}
    </p>
    {(user.tin || user.pinfl) && (
      <p className="text-xs text-muted-foreground truncate">
        {user.tin && (
          <>
            TIN:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleCopyLink(user.tin!)}
            >
              {user.tin}
            </span>
          </>
        )}
        {user.tin && user.pinfl && " · "}
        {user.pinfl && (
          <>
            PINFL:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => handleCopyLink(user.pinfl!)}
            >
              {user.pinfl}
            </span>
          </>
        )}
      </p>
    )}
  </div>
);

export const SelfConnectOrderCard: FC<SelfConnectOrderCardProps> = ({
  order,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3 min-w-0 flex-1">
          <img
            src={order.avatar}
            alt={order.name}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{order.name}</p>
            <a
              href={order.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--URL)] break-all hover:underline"
            >
              {order.url}
            </a>
          </div>
        </div>
        <div>
          <Badge variant={getStatusVariant(order.api_status)} className="shrink-0">
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.order_ident")}
              </p>
              <p
                className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
                onClick={() => handleCopyLink(String(order.order_ident))}
              >
                #{order.order_ident}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.order_id")}
              </p>
              <p
                className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
                onClick={() => handleCopyLink(order.order_id)}
              >
                {order.order_id}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.project_id")}
              </p>
              <p
                className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
                onClick={() => handleCopyLink(order.project_id)}
              >
                {order.project_id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.date")}
              </p>
              <p className="text-sm font-semibold">
                {formatOrderDate(order.order_date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.time")}
              </p>
              <p className="text-sm font-semibold">
                {formatTime(order.order_time.time_from)} –{" "}
                {formatTime(order.order_time.time_to)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("track_orders.card.with_vat")}
              </p>
              <p className="text-sm font-semibold">
                {order.price.with_vat.toLocaleString()} {t("symbol")}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-3">
          <UserBlock label={t("track_orders.card.executor")} user={order.executor} />
          <UserBlock label={t("track_orders.card.customer")} user={order.customer} />
          <UserBlock label={t("track_orders.card.owner")} user={order.owner} />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.without_vat")}
            </p>
            <p className="text-sm font-medium">
              {order.price.without_vat.toLocaleString()} {t("symbol")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.blogger_commission")}
            </p>
            <p className="text-sm font-medium">
              {order.price.blogger_commission.toLocaleString()} {t("symbol")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("track_orders.card.catalog_commission")}
            </p>
            <p className="text-sm font-medium">
              {order.price.catalog_commission.toLocaleString()} {t("symbol")}
            </p>
          </div>
        </div>

        {order.post_deeplink && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a
              href={order.post_deeplink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("track_orders.open_post")}
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
