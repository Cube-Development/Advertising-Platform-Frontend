import { ICommonObserveItem } from "@entities/admin";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CHART_LOCALE_MAP,
  COMMON_OBSERVE_CHART_SERIES,
  getCommonObserveColumnLabelKey,
} from "../model/constants";

interface CommonObserveChartProps {
  data: ICommonObserveItem[];
}

export const CommonObserveChart: FC<CommonObserveChartProps> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const locale = CHART_LOCALE_MAP[i18n.language] ?? "ru-RU";

  const formatChartValue = (value: number, dataKey: string) => {
    if (dataKey === "turnover") {
      return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return value.toLocaleString(locale, {
      maximumFractionDigits: 0,
    });
  };

  if (!data.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-12">
        {t("admin_panel.common_observe.empty")}
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis
          yAxisId="count"
          tick={{ fontSize: 12 }}
          allowDecimals={false}
          tickFormatter={(value) => formatChartValue(value, "count")}
        />
        <YAxis
          yAxisId="turnover"
          orientation="right"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => formatChartValue(value, "turnover")}
        />
        <Tooltip
          formatter={(value, _name, item) =>
            formatChartValue(Number(value), String(item.dataKey))
          }
        />
        <Legend />
        {COMMON_OBSERVE_CHART_SERIES.map((series) => (
          <Area
            key={series.key}
            type="monotone"
            dataKey={series.key}
            name={t(getCommonObserveColumnLabelKey(series.key))}
            stroke={series.color}
            fill={series.color}
            fillOpacity={0.15}
            yAxisId={series.yAxisId}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};
