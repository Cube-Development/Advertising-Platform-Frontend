import { ICompletedOrdersSummary } from "@entities/project";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { formatMoney } from "@shared/utils";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { formatReportDate } from "../lib/format";

interface ReportSummaryProps {
  summary: ICompletedOrdersSummary | null;
  isLoading: boolean;
}

const Tile: FC<{
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  accent: string;
}> = ({ label, value, hint, accent }) => (
  <div
    className={`rounded-2xl border-l-4 bg-white p-4 shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] mobile-xl:p-6 ${accent}`}
  >
    <div className="mb-1 text-xs font-medium text-slate-600 md:text-sm">
      {label}
    </div>
    <div className="text-sm font-bold text-slate-800 md:text-base">{value}</div>
    {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
  </div>
);

const fixed = (value?: number | null, digits = 2) =>
  (value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

/** Итоги отчёта — приходят с бэкенда в summary ответа completed-orders */
export const ReportSummary: FC<ReportSummaryProps> = ({
  summary,
  isLoading,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 mobile-xl:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-skeleton-light h-[104px] w-full rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const vat = (summary.total_sum ?? 0) - (summary.amount ?? 0);
  const period =
    summary.period_start || summary.period_end
      ? [
          formatReportDate(summary.period_start),
          formatReportDate(summary.period_end),
        ]
          .filter(Boolean)
          .join(" — ")
      : "—";

  return (
    <div className="grid grid-cols-1 gap-4 mobile-xl:grid-cols-2 lg:grid-cols-3">
      <Tile
        accent="border-blue-500"
        label={t("adv_project_page.report.summary.placements")}
        value={(summary.orders_count ?? 0).toLocaleString()}
        hint={`${t("adv_project_page.completed_orders.subscribers")}: ${(summary.subscribers ?? 0).toLocaleString()}`}
      />
      <Tile
        accent="border-green-500"
        label={t("adv_project_page.report.summary.total")}
        value={`${formatMoney(summary.total_sum ?? 0)} ${t("symbol")}`}
        hint={`${t("adv_project_page.completed_orders.amount")}: ${formatMoney(summary.amount ?? 0)} · ${t("adv_project_page.completed_orders.vat")}: ${formatMoney(vat)}`}
      />
      <Tile
        accent="border-amber-500"
        label={t("adv_project_page.report.summary.er")}
        value={`${fixed(summary.real_ER)}%`}
        hint={`${t("adv_project_page.report.summary.average")}: ${fixed(summary.average_ER)}%`}
      />
      <Tile
        accent="border-cyan-500"
        label={t("adv_project_page.report.summary.cpv")}
        value={`${fixed(summary.real_CPV)} ${t("symbol")}`}
        hint={`${t("adv_project_page.report.summary.average")}: ${fixed(summary.average_CPV)} · CPM: ${fixed(summary.real_CPM)} ${t("symbol")}`}
      />
      <Tile
        accent="border-slate-400"
        label={t("adv_project_page.report.summary.period")}
        value={period}
      />
    </div>
  );
};
