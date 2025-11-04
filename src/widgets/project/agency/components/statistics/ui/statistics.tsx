import { FC, useState } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui";

interface StatisticsProps {
  project: IAgencyProjectCard;
}

export const Statistics: FC<StatisticsProps> = ({ project }) => {
  const { t } = useTranslation();
  const [accordionValue, setAccordionValue] = useState<string>("");

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
    ? (() => {
        // Создаем мапу для группировки по дате+времени
        const groupedData = new Map<
          string,
          {
            dateTime: string;
            dateTimeValue: number;
            views: number;
            price: number;
          }
        >();

        project.orders
          .filter((o) => o.publish_date && o.publish_time)
          .forEach((order) => {
            // Получаем дату
            const dateStr =
              typeof order.publish_date === "object"
                ? order.publish_date.date_from
                : order.publish_date;

            // Получаем время
            const timeStr = order.publish_time.time_from;

            if (!dateStr || !timeStr) return;

            // Парсим дату (формат DD.MM.YYYY)
            const dateParts = dateStr.split(".");
            if (dateParts.length !== 3) return;
            const [day, month, year] = dateParts.map(Number);

            // Парсим время (формат HH:MM или HH:MM:SS)
            const timeParts = timeStr.split(":");
            if (timeParts.length < 2) return;
            const [hours, minutes] = timeParts.map(Number);

            // Проверяем валидность
            if (
              isNaN(day) ||
              isNaN(month) ||
              isNaN(year) ||
              isNaN(hours) ||
              isNaN(minutes)
            )
              return;

            // Создаем объект Date
            const dateTimeObj = new Date(year, month - 1, day, hours, minutes);

            // Проверяем, что дата валидна
            if (isNaN(dateTimeObj.getTime())) return;

            const dateTimeValue = dateTimeObj.getTime();

            // Создаем ключ из даты и времени для группировки
            const dateTimeKey = `${dateStr}_${timeStr}`;

            // Форматируем для отображения
            const formattedDate = dateTimeObj.toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "short",
            });
            const formattedTime = timeStr.slice(0, 5); // Берем только часы:минуты
            const displayLabel = `${formattedDate} ${formattedTime}`;

            // Группируем и суммируем
            if (groupedData.has(dateTimeKey)) {
              const existing = groupedData.get(dateTimeKey)!;
              existing.views += order.views || 0;
              existing.price += order.price || 0;
            } else {
              groupedData.set(dateTimeKey, {
                dateTime: displayLabel,
                dateTimeValue,
                views: order.views || 0,
                price: order.price || 0,
              });
            }
          });

        // Преобразуем в массив и сортируем по дате+времени
        return Array.from(groupedData.values())
          .sort((a, b) => a.dateTimeValue - b.dateTimeValue)
          .map((item) => ({
            dateTime: item.dateTime,
            views: item.views,
            price: item.price,
          }));
      })()
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

      <div className="md:p-6 p-0 md:rounded-2xl rounded-none md:bg-[rgba(15,105,201,0.1)] bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Статусы заказов */}
          <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3">
            <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
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
                  className="md:text-sm text-xs font-medium"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, fontWeight: 500 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Топ каналов */}
          <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3 top-channels-chart">
            <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
              {t("project_page.statistics.top_channels.title")}
            </h3>
            <ResponsiveContainer width="100%" height={390}>
              <BarChart data={topChannelsData} className="-ml-4">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  className="md:text-[11px] text-[10px] font-medium"
                  tickFormatter={(value) => {
                    const maxLength = 10;
                    if (value && value.length > maxLength) {
                      return value.substring(0, maxLength) + "...";
                    }
                    return value;
                  }}
                />
                <YAxis
                  className="md:w-[80px] w-[40px] md:text-[13px] text-[10px] font-medium"
                  tickFormatter={(value) => {
                    if (value >= 1000000)
                      return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                    return value.toString();
                  }}
                />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? value.toLocaleString() : value
                  }
                  contentStyle={{ fontSize: 12, fontWeight: 500 }}
                />
                <Legend verticalAlign="bottom" />
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

        <Accordion
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="w-full"
        >
          <AccordionItem value="more-statistics" className="border-none">
            <AccordionContent className="grid grid-flow-row gap-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Распределение по платформам */}
                <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3">
                  <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
                    {t("project_page.statistics.platforms_distribution.title")}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ platform, orders }) =>
                          `${platform}: ${orders}`
                        }
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
                        contentStyle={{ fontSize: 12, fontWeight: 500 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 text-center text-sm text-slate-600">
                    {t(
                      "project_page.statistics.platforms_distribution.total_orders",
                    )}{" "}
                    {project?.orders?.length || 0}
                  </div>
                </div>

                {/* Демография */}
                <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3">
                  <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
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
                <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3 top-channels-chart">
                  <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
                    {t("project_page.statistics.publications_dynamics.title")}
                  </h3>
                  <ResponsiveContainer
                    width="100%"
                    height={370}
                    className="scale-x-[1.2] md:scale-x-100"
                  >
                    <AreaChart data={publicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="dateTime"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        interval={0}
                        className="md:text-[11px] text-[10px] font-medium"
                      />
                      <YAxis
                        yAxisId="left"
                        width={80}
                        tickFormatter={formatAxisValue}
                        className="md:w-[80px] w-[10px] md:text-[13px] text-[10px] font-medium"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        width={80}
                        tickFormatter={formatAxisValue}
                        className="md:w-[80px] w-[10px] md:text-[13px] text-[10px] font-medium"
                      />
                      <Tooltip
                        formatter={(value) =>
                          typeof value === "number"
                            ? value.toLocaleString()
                            : value
                        }
                        contentStyle={{ fontSize: 12, fontWeight: 500 }}
                      />
                      <Legend verticalAlign="bottom" />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="price"
                        name={t(
                          "project_page.statistics.publications_dynamics.budget",
                        )}
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="views"
                        name={t(
                          "project_page.statistics.publications_dynamics.views",
                        )}
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Эффективность по категориям */}
                <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3 top-channels-chart">
                  <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
                    {t("project_page.statistics.category_metrics.title")}
                  </h3>
                  <ResponsiveContainer width="100%" height={370}>
                    <BarChart data={categoryData} className="-ml-8">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        className="md:text-[11px] text-[10px] font-medium"
                        dx={-5}
                      />
                      <YAxis
                        width={80}
                        tickFormatter={formatAxisValue}
                        className="md:w-[80px] w-[10px] md:text-[12px] text-[10px] font-medium"
                      />
                      <Tooltip
                        contentStyle={{ fontSize: 12, fontWeight: 500 }}
                      />
                      <Legend verticalAlign="bottom" />
                      <Bar
                        dataKey="avgER"
                        name={t(
                          "project_page.statistics.category_metrics.avgER",
                        )}
                        fill="#10b981"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="avgCPV"
                        name={t(
                          "project_page.statistics.category_metrics.avgCPV",
                        )}
                        fill="#f59e0b"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CPV vs ER scatter */}
                <div className="bg-white rounded-2xl md:border-none border-[1.5px] border-[rgba(0,0,0,rgba(10,165,190,0.6))] mobile-xl:p-6 p-3 top-channels-chart">
                  <h3 className="lg:text-start text-center md:text-xl mobile-xl:text-lg text-sm font-semibold text-slate-800 mb-4">
                    {t("project_page.statistics.efficiency.title")}
                  </h3>
                  <ResponsiveContainer width="100%" height={370}>
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        className="md:text-[11px] text-[10px] font-medium"
                        dx={-5}
                      />
                      <YAxis
                        yAxisId="left"
                        tickFormatter={formatAxisValue}
                        label={{
                          value: t("project_page.statistics.efficiency.cpv"),
                          angle: -90,
                          position: "insideLeft",
                        }}
                        className="md:w-[80px] w-[10px] md:text-[12px] text-[10px] font-medium"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(value) => value.toFixed(2)}
                        label={{
                          value: t("project_page.statistics.efficiency.er"),
                          angle: 90,
                          position: "insideRight",
                        }}
                        className="md:w-[80px] w-[10px] md:text-[12px] text-[10px] font-medium"
                      />
                      <Tooltip
                        contentStyle={{ fontSize: 12, fontWeight: 500 }}
                      />
                      <Legend verticalAlign="bottom" />
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
            </AccordionContent>
            <div className="flex justify-center">
              <AccordionTrigger className="mt-6 px-4 py-3 bg-[var(--URL)] text-white rounded-lg hover:opacity-80 transition-all duration-500 font-medium mobile-xl:text-base text-sm hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {accordionValue === "more-statistics"
                  ? t("project_page.hide")
                  : t("project_page.show_all")}
              </AccordionTrigger>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
