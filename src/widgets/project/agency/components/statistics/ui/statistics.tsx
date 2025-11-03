import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IAgencyOrderCard, IAgencyProjectCard } from "@entities/project";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { platformTypesNum } from "@entities/platform";
import { ChartPie } from "lucide-react";

interface StatisticsProps {
  project: IAgencyProjectCard;
}

export const Statistics: FC<StatisticsProps> = ({ project }) => {
  const { t } = useTranslation();

  // Форматирование больших чисел для осей
  const formatAxisValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };
  // Данные для графика статусов
  const statusData = [
    {
      name: t("project_page.statistics.orders_status.completed"),
      value: project?.completed ?? 0,
      color: "#0ab39c",
    },
    {
      name: t("project_page.statistics.orders_status.in_progress"),
      value: project?.in_progress ?? 0,
      color: "#3b82f6",
    },
    {
      name: t("project_page.statistics.orders_status.wait"),
      value: project?.wait ?? 0,
      color: "#f1b143",
    },
    {
      name: t("project_page.statistics.orders_status.canceled"),
      value: (project?.canceled ?? 0) + (project?.canceled_rejected ?? 0),
      color: "#fe3430fc",
    },
  ].filter((item) => item.value && item.value > 0);

  // Топ каналов по охватам
  const topChannelsData = project?.orders
    ? [...project.orders]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
        .map((order) => ({
          name: order.name!,
          views: order.views!,
          subscribers: order.subscribers!,
          er: order.er!,
        }))
    : undefined;

  // Эффективность каналов (CPV vs ER)
  const efficiencyData = project?.orders?.map((order) => ({
    name: order.name.substring(0, 10),
    cpv: order.cpv,
    er: order.er,
    views: order.views,
  }));

  // Динамика публикаций
  const publicationData = project?.orders
    ? [...project.orders]
        .filter((o) => o.publish_date)
        .sort((a, b) => {
          const dateA =
            typeof a.publish_date === "object"
              ? a.publish_date.date_from
              : a.publish_date;
          const dateB =
            typeof b.publish_date === "object"
              ? b.publish_date.date_from
              : b.publish_date;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        })
        .map((order) => {
          const date =
            typeof order.publish_date === "object"
              ? order.publish_date.date_from
              : order.publish_date;
          return {
            date: new Date(date).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "short",
            }),
            views: order.views!,
            price: order.price!,
          };
        })
    : undefined;

  // Демография
  const calculateAvgDemography = () => {
    const total = project?.orders?.reduce((acc, o) => acc + o.views!, 0) || 0;
    const maleWeighted =
      project?.orders?.reduce((acc, o) => acc + o.male * o.views!, 0) || 0;
    const femaleWeighted =
      project?.orders?.reduce((acc, o) => acc + o.female * o.views!, 0) || 0;

    return [
      {
        name: t("project_page.statistics.demography.men"),
        value: Math.round(maleWeighted / total),
        color: "#3b82f6",
      },
      {
        name: t("project_page.statistics.demography.women"),
        value: Math.round(femaleWeighted / total),
        color: "#ec4899",
      },
    ];
  };

  const demographyData = calculateAvgDemography();

  // Метрики по категориям
  interface CategoryMetrics {
    category: string;
    views: number;
    er: number;
    cpv: number;
    count: number;
  }

  const categoryData = Object.values(
    project?.orders?.reduce(
      (acc: Record<string, CategoryMetrics>, order: IAgencyOrderCard) => {
        const category = order.category || "";
        if (!acc[category]) {
          acc[category] = {
            category,
            views: 0,
            er: 0,
            cpv: 0,
            count: 0,
          };
        }
        acc[category].views += order.views || 0;
        acc[category].er += order.er || 0;
        acc[category].cpv += order.cpv || 0;
        acc[category].count += 1;
        return acc;
      },
      {} as Record<string, CategoryMetrics>,
    ) || {},
  ).map((item) => ({
    category: item.category.substring(0, 13),
    views: item.views,
    avgER: item.count > 0 ? +(item.er / item.count).toFixed(1) : 0,
    avgCPV: item.count > 0 ? +(item.cpv / item.count).toFixed(1) : 0,
  }));

  // Платформы
  interface PlatformMetrics {
    platform: string;
    views: number;
    orders: number;
    budget: number;
    er: number;
    count: number;
  }

  const getPlatformName = (platform: platformTypesNum) => {
    switch (platform) {
      case platformTypesNum.telegram:
        return t("platform_types.telegram.name");
      case platformTypesNum.instagram:
        return t("platform_types.instagram.name");
      case platformTypesNum.youtube:
        return t("platform_types.youtube.name");
      case platformTypesNum.site:
        return t("platform_types.site.name");
      default:
        return "";
    }
  };

  const platformData = Object.values(
    project?.orders?.reduce(
      (acc: Record<string, PlatformMetrics>, order: IAgencyOrderCard) => {
        const platformName = getPlatformName(
          order.platform as platformTypesNum,
        );
        if (!acc[platformName]) {
          acc[platformName] = {
            platform: platformName,
            views: 0,
            orders: 0,
            budget: 0,
            er: 0,
            count: 0,
          };
        }
        acc[platformName].views += order.views || 0;
        acc[platformName].orders += 1;
        acc[platformName].budget += order.price || 0;
        acc[platformName].er += order.er || 0;
        acc[platformName].count += 1;
        return acc;
      },
      {} as Record<string, PlatformMetrics>,
    ) || {},
  ).map((item) => ({
    platform: item.platform,
    views: item.views,
    orders: item.orders,
    budget: item.budget,
    avgER: item.count > 0 ? +(item.er / item.count).toFixed(1) : 0,
  }));

  const platformColors: Record<string, string> = {
    [t("platform_types.telegram.name")]: "#0088cc",
    [t("platform_types.instagram.name")]: "#E4405F",
    [t("platform_types.youtube.name")]: "#FF0000",
    [t("platform_types.site.name")]: "#6366f1",
  };

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="grid grid-flow-row gap-6">
      <div className="flex items-center justify-center mobile-xl:gap-4 gap-2">
        <ChartPie className="md:size-8 mobile-xl:size-7 size-6 text-slate-800" />
        <p className="text-center md:text-2xl mobile-xl:text-xl text-base font-bold text-slate-800">
          {t("project_page.statistics.title")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Статусы заказов */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.orders_status.title")}
          </h3>
          <ResponsiveContainer width="100%" height={390}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={
                  statusData.length > 0
                    ? statusData
                    : [
                        {
                          name: t(
                            "project_page.statistics.orders_status.in_progress",
                          ),
                          value: project?.count_channels ?? 0,
                          color: "#3b82f6",
                        },
                      ]
                }
                cx="50%"
                cy="50%"
                labelLine={true}
                label={(props: {
                  name?: string | number;
                  percent?: number;
                  payload?: { value?: number };
                }) => {
                  const name = props.name || "";
                  const value = props.payload?.value || 0;
                  const percent = props.percent || 0;
                  if (value === 0) return null;
                  return `${value} (${(percent * 100).toFixed(0)}%)`;
                }}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={8}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Топ каналов */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.top_channels.title")}
          </h3>
          <ResponsiveContainer width="100%" height={390}>
            <BarChart
              data={topChannelsData}
              margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => {
                  const maxLength = 10;
                  if (value && value.length > maxLength) {
                    return value.substring(0, maxLength) + "...";
                  }
                  return value;
                }}
              />
              <YAxis
                width={80}
                tickFormatter={(value) => {
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                  return value.toString();
                }}
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number" ? value.toLocaleString() : value
                }
              />
              <Legend verticalAlign="top" />
              <Bar
                dataKey="subscribers"
                name={t("project_page.statistics.top_channels.subscribers")}
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="views"
                name={t("project_page.statistics.top_channels.views")}
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Распределение по платформам */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.platforms_distribution.title")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ platform, orders }) => `${platform}: ${orders}`}
                fill="#8884d8"
                dataKey="orders"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={8}
              >
                {platformData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      platformColors[entry.platform] ||
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => {
                  if (name === "orders")
                    return [
                      `${value} ${t("project_page.statistics.platforms_distribution.total_orders")}`,
                      t(
                        "project_page.statistics.platforms_distribution.total_orders",
                      ),
                    ];
                  return [value, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm text-slate-600">
            {t("project_page.statistics.platforms_distribution.total_orders")}{" "}
            {project?.orders?.length || 0}
          </div>
        </div>

        {/* Демография */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.demography.title")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={demographyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                fill="#8884d8"
                dataKey="value"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={8}
              >
                {demographyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm text-slate-600">
            {t("project_page.statistics.demography.description")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Динамика публикаций */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.publications_dynamics.title")}
          </h3>
          <ResponsiveContainer width="100%" height={370}>
            <AreaChart
              data={publicationData}
              margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                width={80}
                tickFormatter={formatAxisValue}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                width={80}
                tickFormatter={formatAxisValue}
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number" ? value.toLocaleString() : value
                }
              />
              <Legend verticalAlign="top" />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="views"
                name={t("project_page.statistics.publications_dynamics.views")}
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="price"
                name={t("project_page.statistics.publications_dynamics.budget")}
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Эффективность по категориям */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.category_metrics.title")}
          </h3>
          <ResponsiveContainer width="100%" height={370}>
            <BarChart
              data={categoryData}
              margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 11 }}
                dx={-5}
              />
              <YAxis width={80} tickFormatter={formatAxisValue} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgER"
                name={t("project_page.statistics.category_metrics.avgER")}
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="avgCPV"
                name={t("project_page.statistics.category_metrics.avgCPV")}
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CPV vs ER scatter */}
        <div className="bg-white rounded-2xl shadow-lg mobile-xl:p-6 p-3">
          <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-base font-semibold text-slate-800 mb-4">
            {t("project_page.statistics.efficiency.title")}
          </h3>
          <ResponsiveContainer width="100%" height={370}>
            <LineChart
              data={efficiencyData}
              margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 11 }}
                dx={-5}
              />
              <YAxis
                yAxisId="left"
                width={80}
                tickFormatter={formatAxisValue}
                label={{
                  value: t("project_page.statistics.efficiency.cpv"),
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                width={80}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: t("project_page.statistics.efficiency.er"),
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cpv"
                stroke="#f59e0b"
                strokeWidth={2}
                name={t("project_page.statistics.efficiency.cpv")}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="er"
                stroke="#10b981"
                strokeWidth={2}
                name={t("project_page.statistics.efficiency.er")}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-xs text-slate-600">
            {t("project_page.statistics.efficiency.description")}
          </div>
        </div>
      </div>
    </div>
  );
};
