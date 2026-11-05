import { IViewsChart, IViewsChartPoint } from "@entities/project";
import { FC, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import { formatReportDateTime } from "../lib/format";

interface ViewsDynamicsChartProps {
  /** Готовые точки — собираются маппером при получении ответа */
  chart?: IViewsChart | null;
  height?: number;
}

const VIEWS_COLOR = "#0aa5be";
const DELTA_COLOR = "#8b5cf6";
const Y_AXIS_WIDTH = 56;
const CHART_RIGHT_MARGIN = 12;
/** Шаги подписей оси X в часах: на широком экране — каждый час, на узком реже */
const HOUR_STEPS = [1, 2, 3, 4, 6, 8, 12, 24];
/** Примерная ширина символа подписи относительно размера шрифта */
const CHAR_WIDTH_RATIO = 0.62;
/** Ширина столбика прироста, px */
const BAR_MIN = 2;
const BAR_MAX = 14;
/**
 * Запас справа внутри оси X: столбик последней точки (часто ровно на maxHour)
 * не вылезает на правую шкалу, у последней подписи появляется место
 */
const X_PADDING_RIGHT = Math.ceil(BAR_MAX / 2) + 2;

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
 * Оси без прокрутки. Узкий экран: короткие числа на обеих шкалах.
 * Ось X: шаг подписей (1/2/3/4/6… ч) — по реальной длине подписи с учётом языка;
 * на широком экране — каждый час. Ширина столбиков — по минимальному интервалу снимков
 */
const getAxisLayout = ({
  width,
  chart,
  hourUnit,
}: {
  width: number;
  chart: IViewsChart;
  hourUnit: string;
}) => {
  const { maxHour, maxViews, maxDelta, minGapHours } = chart;
  const narrow = width > 0 && width < 420;
  const fontSize = narrow ? 10 : 11;
  const charWidth = fontSize * CHAR_WIDTH_RATIO;
  const axisWidth = (value: number) =>
    narrow
      ? Math.ceil(shortNumber(value).length * charWidth + 10)
      : Y_AXIS_WIDTH;

  const yAxisWidth = axisWidth(maxViews);
  // Шкала прироста справа — всегда: без неё столбики читаются по левой шкале
  // накопленных просмотров и выглядят в разы выше. На узком экране — короткие числа
  const deltaAxisWidth = axisWidth(maxDelta);

  // Самая длинная подпись — у последнего часа, плюс зазор между подписями
  const labelWidth = `${maxHour} ${hourUnit}`.length * charWidth + 10;
  const plotWidth =
    width > 0
      ? width -
        yAxisWidth -
        deltaAxisWidth -
        CHART_RIGHT_MARGIN -
        X_PADDING_RIGHT
      : maxHour * 40;
  const hourWidth = plotWidth / Math.max(maxHour, 1);
  const step =
    HOUR_STEPS.find((hours) => hours * hourWidth >= labelWidth) ??
    HOUR_STEPS[HOUR_STEPS.length - 1];
  const ticks = Array.from(
    { length: Math.floor(maxHour / step) + 1 },
    (_, index) => index * step,
  );
  const barSize = Math.round(
    Math.min(BAR_MAX, Math.max(BAR_MIN, hourWidth * minGapHours * 0.6)),
  );

  return {
    narrow,
    fontSize,
    yAxisWidth,
    deltaAxisWidth,
    ticks,
    barSize,
  };
};

const ChartTooltip: FC<TooltipContentProps<number, string>> = ({
  active,
  payload,
}) => {
  const { t } = useTranslation();
  const point = payload?.[0]?.payload as IViewsChartPoint | undefined;
  if (!active || !point) return null;

  return (
    <div className="grid gap-1 rounded-xl border border-[var(--Card-separator)] bg-white px-3 py-2 text-xs shadow-lg">
      <p className="text-slate-500">{formatReportDateTime(point.taken)}</p>
      <p className="font-semibold text-[var(--Personal-colors-black)]">
        {point.views.toLocaleString()}{" "}
        {t("adv_project_page.report.chart.views")}
      </p>
      {/* У стартовой точки (момент публикации) прироста нет — не пишем «+0» */}
      {point.hours > 0 ? (
        <p className="font-medium" style={{ color: DELTA_COLOR }}>
          +{point.delta.toLocaleString()}{" "}
          {t("adv_project_page.report.chart.delta_short")}
        </p>
      ) : null}
    </div>
  );
};

const LegendItem: FC<{ color: string; label: string; bar?: boolean }> = ({
  color,
  label,
  bar,
}) => (
  <span className="flex items-center gap-1.5">
    <span
      className={bar ? "h-2.5 w-2 rounded-[2px]" : "h-0.5 w-3 rounded-full"}
      style={{ background: color }}
    />
    {label}
  </span>
);

/**
 * График динамики просмотров поста: область — накопленные просмотры, столбики —
 * прирост с предыдущего снимка (своя шкала справа). Ось X — часы после публикации,
 * точки — реальные снимки. Используется и в модалке, и в табе «Графики»
 */
export const ViewsDynamicsChart: FC<ViewsDynamicsChartProps> = ({
  chart,
  height = 260,
}) => {
  const { t } = useTranslation();
  // Уникальный id градиента — графиков на странице несколько
  const gradientId = `viewsDynamicsFill-${useId().replace(/:/g, "")}`;

  // Ширина контейнера — чтобы ужать подписи вместо горизонтальной прокрутки
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const hasChart = !!chart && chart.points.length >= 2;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasChart]);

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

  const hourUnit = t("adv_project_page.report.chart.hour_short");
  const axis = getAxisLayout({ width, chart, hourUnit });
  const formatValue = (value: number) =>
    axis.narrow ? shortNumber(value) : value.toLocaleString();

  return (
    <div className="grid w-full gap-2">
      <div ref={containerRef} style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chart.points}
            margin={{ top: 10, right: CHART_RIGHT_MARGIN, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={VIEWS_COLOR} stopOpacity={0.3} />
                <stop
                  offset="100%"
                  stopColor={VIEWS_COLOR}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              type="number"
              dataKey="hours"
              domain={[0, chart.maxHour]}
              padding={{ right: X_PADDING_RIGHT }}
              ticks={axis.ticks}
              // Шаг подписей — по доступной ширине, точки остаются реальными снимками
              interval={0}
              tickFormatter={(hour: number) => `${hour} ${hourUnit}`}
              tick={{ fontSize: axis.fontSize, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#d9d9d9" }}
            />
            <YAxis
              yAxisId="views"
              tickFormatter={formatValue}
              tick={{ fontSize: axis.fontSize, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              width={axis.yAxisWidth}
            />
            <YAxis
              yAxisId="delta"
              orientation="right"
              tickFormatter={formatValue}
              tick={{ fontSize: axis.fontSize, fill: DELTA_COLOR }}
              tickLine={false}
              axisLine={false}
              width={axis.deltaAxisWidth}
            />
            <Tooltip content={ChartTooltip} />
            <Bar
              yAxisId="delta"
              dataKey="delta"
              fill={DELTA_COLOR}
              fillOpacity={0.55}
              barSize={axis.barSize}
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
            />
            <Area
              yAxisId="views"
              type="monotone"
              dataKey="views"
              stroke={VIEWS_COLOR}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={{ r: 3, fill: VIEWS_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <LegendItem
          color={VIEWS_COLOR}
          label={t("adv_project_page.report.chart.cumulative")}
        />
        <LegendItem
          color={DELTA_COLOR}
          label={t("adv_project_page.report.chart.delta")}
          bar
        />
      </div>
    </div>
  );
};
