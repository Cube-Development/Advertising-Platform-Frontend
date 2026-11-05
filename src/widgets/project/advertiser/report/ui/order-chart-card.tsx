import { ICompletedOrder, platformToIcon } from "@entities/project";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  formatReportDate,
  formatReportTime,
  toExternalUrl,
} from "../lib/format";
import { ViewsDynamicsChart } from "./views-dynamics-chart";

const lastViews = (order: ICompletedOrder) => {
  const snapshots = order.views_dynamics?.snapshots ?? [];
  return snapshots.length
    ? snapshots[snapshots.length - 1].views
    : order.real_views;
};

const Info: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid gap-1 rounded-[10px] bg-[#f5f5f6] px-3 py-2">
    <p className="text-xs font-medium text-black/45">{label}</p>
    <p className="truncate text-sm font-semibold text-[var(--Personal-colors-black)]">
      {value}
    </p>
  </div>
);

/** Шапка графика: канал и основные данные размещения */
export const OrderChartHeader: FC<{
  order: ICompletedOrder;
  /** В модалке — 4 в ряд, в узкой карточки таба — 2×2 */
  wide?: boolean;
}> = ({ order, wide = false }) => {
  const { t } = useTranslation();
  const PlatformIcon = platformToIcon[order.platform];
  const channelUrl = toExternalUrl(order.url);

  return (
    <div className="grid gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {PlatformIcon ? (
          <div className="size-6 shrink-0 [&>svg]:size-6">
            <PlatformIcon />
          </div>
        ) : null}
        {channelUrl ? (
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 truncate text-sm font-semibold text-[var(--Personal-colors-black)] hover:underline md:text-base"
          >
            {order.name}
          </a>
        ) : (
          <p className="min-w-0 truncate text-sm font-semibold text-[var(--Personal-colors-black)] md:text-base">
            {order.name}
          </p>
        )}
      </div>
      <div className={`grid grid-cols-2 gap-2 ${wide ? "sm:grid-cols-4" : ""}`}>
        <Info
          label={t("adv_project_page.completed_orders.subscribers")}
          value={(order.subscribers ?? 0).toLocaleString()}
        />
        <Info
          label={t("adv_project_page.report.chart.category")}
          value={order.category || "—"}
        />
        <Info
          label={t("adv_project_page.completed_orders.publish_date")}
          value={`${formatReportDate(order.publish_date)} ${formatReportTime(order.publish_time)}`.trim()}
        />
        <Info
          label={t("adv_project_page.report.chart.total_views")}
          value={(lastViews(order) ?? 0).toLocaleString()}
        />
      </div>
    </div>
  );
};

/** Шапка + график — одинаково в модалке и в табе «Графики» */
export const OrderChartContent: FC<{
  order: ICompletedOrder;
  height?: number;
  wide?: boolean;
}> = ({ order, height, wide }) => (
  <div className="grid min-w-0 gap-4">
    <OrderChartHeader order={order} wide={wide} />
    <ViewsDynamicsChart dynamics={order.views_dynamics} height={height} />
  </div>
);

/** Карточка в табе «Графики» — без модалки */
export const OrderChartCard: FC<{ order: ICompletedOrder }> = ({ order }) => (
  <div className="min-w-0 rounded-[20px] border-[1px] border-[var(--Card-separator)] bg-white/80 p-4 shadow-lg md:p-5">
    <OrderChartContent order={order} />
  </div>
);
