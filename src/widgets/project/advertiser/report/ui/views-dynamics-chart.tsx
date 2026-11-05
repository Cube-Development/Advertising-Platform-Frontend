import { IViewsDynamics } from "@entities/project";
import { FC, useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import { formatReportDateTime } from "../lib/format";

interface ViewsDynamicsChartProps {
  dynamics?: IViewsDynamics | null;
  height?: number;
}

interface IChartPoint {
  /** Часы после публикации — точка стоит там, где реально снят снимок */
  hours: number;
  views: number;
  taken: string;
}

const HOUR_MS = 60 * 60 * 1000;
const Y_AXIS_WIDTH = 56;
const CHART_RIGHT_MARGIN = 12;
/** Шаги подписей оси X в часах: на широком экране — каждый час, на узком реже */
const HOUR_STEPS = [1, 2, 3, 4, 6, 8, 12, 24];
/** Примерная ширина символа подписи относительно размера шрифта */
const CHAR_WIDTH_RATIO = 0.62;

/** Короткие числа для узкой оси Y: 1 200 → «1,2K», 60 000 → «60K» */
const shortNumber = (value: number) => {
  const abs = Math.abs(value);
  const format = (n: number, suffix: string) =>
    `${Number(n.toFixed(n < 10 ? 1 : 0)).toLocaleString()}${suffix}`;
  if (abs >= 1_000_000) return format(value / 1_000_000, "M");
  if (abs >= 1_000) return format(value / 1_000, "K");
  return value.toLocaleString();
};

/**
 * Оси без прокрутки. Узкий экран: короткие числа на оси Y, ширина оси — по самой
 * длинной подписи. Ось X: шаг подписей (1/2/3/4/6… ч) — по реальной длине подписи
 * с учётом языка, чтобы не слипались; на широком экране — каждый час
 */
const getAxisLayout = ({
  width,
  maxHour,
  maxViews,
  hourUnit,
}: {
  width: number;
  maxHour: number;
  maxViews: number;
  hourUnit: string;
}) => {
  const narrow = width > 0 && width < 420;
  const fontSize = narrow ? 10 : 11;
  const charWidth = fontSize * CHAR_WIDTH_RATIO;

  const yLabel = narrow ? shortNumber(maxViews) : maxViews.toLocaleString();
  const yAxisWidth = narrow
    ? Math.ceil(yLabel.length * charWidth + 10)
    : Y_AXIS_WIDTH;

  // Самая длинная подпись — у последнего часа, плюс зазор между подписями
  const labelWidth = `${maxHour} ${hourUnit}`.length * charWidth + 10;
  // Последняя подпись центрируется на краю — отступ справа на половину подписи
  const rightMargin = Math.max(CHART_RIGHT_MARGIN, Math.ceil(labelWidth / 2));
  const plotWidth = width > 0 ? width - yAxisWidth - rightMargin : maxHour * 40;
  const hourWidth = plotWidth / Math.max(maxHour, 1);
  const step =
    HOUR_STEPS.find((hours) => hours * hourWidth >= labelWidth) ??
    HOUR_STEPS[HOUR_STEPS.length - 1];
  const ticks = Array.from(
    { length: Math.floor(maxHour / step) + 1 },
    (_, index) => index * step,
  );

  return { narrow, fontSize, yAxisWidth, ticks, rightMargin };
};

const parseTime = (value: string) => new Date(value).getTime();

const toPoints = (dynamics?: IViewsDynamics | null): IChartPoint[] => {
  if (!dynamics?.published || !dynamics.snapshots?.length) return [];
  const published = parseTime(dynamics.published);
  if (Number.isNaN(published)) return [];

  const snapshots = dynamics.snapshots
    .map((snapshot) => ({
      hours: (parseTime(snapshot.taken) - published) / HOUR_MS,
      views: snapshot.views ?? 0,
      taken: snapshot.taken,
    }))
    .filter((point) => Number.isFinite(point.hours) && point.hours >= 0)
    .sort((a, b) => a.hours - b.hours);

  // Начальная точка — момент публикации с нулём просмотров
  return [{ hours: 0, views: 0, taken: dynamics.published }, ...snapshots];
};

const ChartTooltip: FC<TooltipContentProps<number, string>> = ({
  active,
  payload,
}) => {
  const { t } = useTranslation();
  const point = payload?.[0]?.payload as IChartPoint | undefined;
  if (!active || !point) return null;

  return (
    <div className="rounded-xl border border-[var(--Card-separator)] bg-white px-3 py-2 text-xs shadow-lg">
      <p className="text-slate-500">{formatReportDateTime(point.taken)}</p>
      <p className="mt-1 font-semibold text-[var(--Personal-colors-black)]">
        {point.views.toLocaleString()}{" "}
        {t("adv_project_page.report.chart.views")}
      </p>
    </div>
  );
};

/**
 * График динамики просмотров поста. Ось X — часы после публикации, метки через
 * каждый час; точки — реальные снимки. Используется и в модалке, и в табе «Графики»
 */
export const ViewsDynamicsChart: FC<ViewsDynamicsChartProps> = ({
  dynamics,
  height = 260,
}) => {
  const { t } = useTranslation();
  // Уникальный id градиента — графиков на странице несколько
  const gradientId = `viewsDynamicsFill-${useId().replace(/:/g, "")}`;
  const points = useMemo(() => toPoints(dynamics), [dynamics]);

  const maxHour = Math.max(1, Math.ceil(points[points.length - 1]?.hours ?? 0));

  // Ширина контейнера — чтобы ужать подписи вместо горизонтальной прокрутки
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const hasChart = points.length >= 2;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasChart]);

  const hourUnit = t("adv_project_page.report.chart.hour_short");
  const maxViews = points.reduce((max, point) => Math.max(max, point.views), 0);
  const axis = getAxisLayout({ width, maxHour, maxViews, hourUnit });

  if (!hasChart) {
    return (
      <div
        className="flex items-center justify-center rounded-[10px] bg-[#f5f5f6] text-sm text-slate-500"
        style={{ height }}
      >
        {t("adv_project_page.report.chart.empty")}
      </div>
    );
  }

  return (
    <div className="grid w-full gap-1">
      <div ref={containerRef} style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={points}
            margin={{ top: 10, right: axis.rightMargin, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0badc2" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0badc2" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              type="number"
              dataKey="hours"
              domain={[0, maxHour]}
              ticks={axis.ticks}
              // Шаг подписей — по доступной ширине, точки остаются реальными снимками
              interval={0}
              tickFormatter={(hour: number) => `${hour} ${hourUnit}`}
              tick={{ fontSize: axis.fontSize, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#d9d9d9" }}
            />
            <YAxis
              tickFormatter={(value: number) =>
                axis.narrow ? shortNumber(value) : value.toLocaleString()
              }
              tick={{ fontSize: axis.fontSize, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              width={axis.yAxisWidth}
            />
            <Tooltip content={ChartTooltip} />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#0aa5be"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={{ r: 3, fill: "#0aa5be", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
