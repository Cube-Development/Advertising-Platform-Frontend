import { ICompletedOrder } from "@entities/project";
import { SegmentSwitcher } from "@shared/ui";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { ChartLine, List } from "lucide-react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { CompletedOrdersList } from "./completed-orders";
import { OrderChartCard } from "./order-chart-card";

enum ENUM_REPORT_TAB {
  ORDERS = "orders",
  CHARTS = "charts",
}

const TAB_QUERY_KEY = "tab";

interface ReportOrdersTabsProps {
  orders: ICompletedOrder[];
  isLoading: boolean;
}

/** Таба «Графики»: отдельный график на каждое размещение, без модалки */
const ChartsList: FC<ReportOrdersTabsProps> = ({ orders, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-skeleton-light h-[380px] w-full rounded-[20px]"
          />
        ))}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <p className="rounded-[20px] bg-white/60 py-10 text-center text-sm text-slate-500 shadow-lg">
        {t("adv_project_page.report.empty")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {orders.map((order) => (
        <OrderChartCard key={order.id} order={order} />
      ))}
    </div>
  );
};

/** Размещения отчёта: таба со списком карточек и таба с графиками */
export const ReportOrdersTabs: FC<ReportOrdersTabsProps> = ({
  orders,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  // Таба в адресе — сохраняется при обновлении страницы
  const tab =
    searchParams.get(TAB_QUERY_KEY) === ENUM_REPORT_TAB.CHARTS
      ? ENUM_REPORT_TAB.CHARTS
      : ENUM_REPORT_TAB.ORDERS;

  const options = useMemo(
    () => [
      {
        value: ENUM_REPORT_TAB.ORDERS,
        label: t("adv_project_page.report.tabs.orders"),
        icon: <List strokeWidth={2} />,
      },
      {
        value: ENUM_REPORT_TAB.CHARTS,
        label: t("adv_project_page.report.tabs.charts"),
        icon: <ChartLine strokeWidth={2} />,
      },
    ],
    [t],
  );

  const handleChange = (next: ENUM_REPORT_TAB) => {
    const params = new URLSearchParams(searchParams);
    if (next === ENUM_REPORT_TAB.ORDERS) params.delete(TAB_QUERY_KEY);
    else params.set(TAB_QUERY_KEY, next);
    // preventScrollReset: иначе ScrollRestoration в layout прокручивает страницу наверх
    setSearchParams(params, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="grid grid-flow-row gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="md:text-xl text-base font-semibold text-[var(--Personal-colors-black)]">
          {t("adv_project_page.completed_orders.title")}
          {orders.length ? (
            <span className="ml-2 text-[var(--Personal-colors-main)]">
              {orders.length.toLocaleString()}
            </span>
          ) : null}
        </h2>
        <SegmentSwitcher
          value={tab}
          options={options}
          onChange={handleChange}
          className="w-full sm:w-[360px]"
        />
      </div>

      {tab === ENUM_REPORT_TAB.CHARTS ? (
        <ChartsList orders={orders} isLoading={isLoading} />
      ) : (
        <CompletedOrdersList orders={orders} isLoading={isLoading} />
      )}
    </div>
  );
};
