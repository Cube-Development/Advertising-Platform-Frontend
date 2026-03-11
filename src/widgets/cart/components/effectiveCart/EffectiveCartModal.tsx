import { CompactCatalogCard } from "@features/catalog";
import { DollarIcon, EyeIcon, HistogramIcon, SubsIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  MyButton,
} from "@shared/ui";
import { X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ICatalogChannel } from "@entities/project";
import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { EffectiveCartCardProps } from "./EffectiveCartCard";

interface EffectiveCartModalProps extends EffectiveCartCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetricRow: FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  diff: number;
}> = ({ icon, label, value, diff }) => {
  const isPositive = diff >= 0;
  const colorClass = isPositive ? "text-[#71c371]" : "text-red-400";
  const formattedDiff = (diff > 0 ? "+" : "") + diff + "%";

  return (
    <div className="flex flex-col gap-1 md:gap-1.5">
      <div className="flex items-center gap-1.5 text-[var(--Personal-colors-main)]">
        {icon}
        <span className="text-[10px] md:text-xs">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-xs md:text-sm text-gray-800">
          {value}
        </span>
        <span className={`text-[9px] md:text-[10px] font-bold ${colorClass}`}>
          {formattedDiff}
        </span>
      </div>
    </div>
  );
};

const CustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill="#666"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={10}
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

// Моковые данные, соответствующие интерфейсу ICatalogChannel
const MOCK_CHANNELS: ICatalogChannel[] = [
  {
    id: "1",
    name: "Uzbek MDK",
    description: "Юмор и развлечения в Телеграм",
    category: "Юмор и развлечения",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    subscribers: 301975,
    match: 95,
    platform: platformTypesNum.telegram,
    male: 50,
    female: 50,
    channel_languages: [ENUM_LANGUAGES_NUM.UZ, ENUM_LANGUAGES_NUM.RU],
    url: "t.me/mdkuzb",
    format: [
      {
        format: PostTypesNum.default,
        format_name: { small: "1/24", big: "1/24" },
        price: 1200000,
        views: 34975,
        er: 23.7,
        cpv: 121,
      },
    ],
    selected_format: {
      format: PostTypesNum.default,
      format_name: { small: "1/24", big: "1/24" },
      price: 1200000,
      views: 34975,
      er: 23.7,
      cpv: 121,
    },
  },
  {
    id: "2",
    name: "Toshkent News",
    description: "Главные новости Ташкента",
    category: "Новости и СМИ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    subscribers: 450000,
    match: 92,
    platform: platformTypesNum.telegram,
    male: 45,
    female: 55,
    channel_languages: [ENUM_LANGUAGES_NUM.UZ],
    url: "t.me/toshkent_news",
    format: [
      {
        format: PostTypesNum.default,
        format_name: { small: "1/24", big: "1/24" },
        price: 2500000,
        views: 85000,
        er: 18.5,
        cpv: 156,
      },
    ],
    selected_format: {
      format: PostTypesNum.default,
      format_name: { small: "1/24", big: "1/24" },
      price: 2500000,
      views: 85000,
      er: 18.5,
      cpv: 156,
    },
  },
  {
    id: "3",
    name: "Plov Center",
    description: "Все о гастрономии Узбекистана",
    category: "Еда и напитки",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    subscribers: 120000,
    match: 88,
    platform: platformTypesNum.telegram,
    male: 60,
    female: 40,
    channel_languages: [ENUM_LANGUAGES_NUM.RU, ENUM_LANGUAGES_NUM.UZ],
    url: "t.me/plov_center",
    format: [
      {
        format: PostTypesNum.default,
        format_name: { small: "1/24", big: "1/24" },
        price: 800000,
        views: 15000,
        er: 12.5,
        cpv: 98,
      },
    ],
    selected_format: {
      format: PostTypesNum.default,
      format_name: { small: "1/24", big: "1/24" },
      price: 800000,
      views: 15000,
      er: 12.5,
      cpv: 98,
    },
  },
];

interface EffectiveCartModalBodyProps {
  budget: number;
  metrics: EffectiveCartCardProps["metrics"];
  suggestedColor: string;
  data: any[];
  budgetColorClass: string;
  formattedBudgetDiff: string;
  onClose: () => void;
  isMobile: boolean;
  isEconomy: boolean;
}

const EffectiveCartModalBody: FC<EffectiveCartModalBodyProps> = ({
  budget,
  metrics,
  suggestedColor,
  data,
  budgetColorClass,
  formattedBudgetDiff,
  onClose,
  isMobile,
  isEconomy,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
      <p className="text-xs md:text-sm font-semibold mb-4 md:mb-6 text-gray-800">
        {t("cart.effective.modal.compare_header")}
      </p>

      <div className="mb-1">
        <span className="text-xs md:text-sm font-semibold text-gray-800">
          {t("cart.effective.modal.budget_total")}
        </span>
      </div>
      <div className="flex items-baseline gap-2 md:gap-3 mb-2">
        <span className="text-xl md:text-[28px] font-bold text-gray-900 leading-tight">
          {budget.toLocaleString()} {t("cart.effective.modal.currency")}
        </span>
        <span className={`text-sm md:text-xl font-bold ${budgetColorClass}`}>
          {formattedBudgetDiff}
        </span>
      </div>
      <p className="text-[10px] md:text-xs font-semibold mb-6 md:mb-8 text-gray-800 leading-relaxed">
        {isEconomy
          ? t("cart.effective.modal.results.economy")
          : t("cart.effective.modal.results.optimal")}
      </p>

      {/* Metrics summary */}
      <div className="grid grid-cols-2 gap-y-4 md:gap-y-6 gap-x-4 mb-8 md:mb-10 w-full max-w-md">
        <MetricRow
          icon={<EyeIcon />}
          label={t("cart.effective.modal.metrics.reach")}
          value={metrics.reach.value}
          diff={metrics.reach.diff}
        />
        <MetricRow
          icon={
            <DollarIcon className="size-4 text-[var(--Personal-colors-main)]" />
          }
          label={t("cart.effective.modal.metrics.cpv")}
          value={metrics.cpv.value}
          diff={metrics.cpv.diff}
        />
        <MetricRow
          icon={<SubsIcon />}
          label={t("cart.effective.modal.metrics.subscribers")}
          value={metrics.subscribers.value}
          diff={metrics.subscribers.diff}
        />
        <MetricRow
          icon={
            <HistogramIcon className="size-4 text-[var(--Personal-colors-main)]" />
          }
          label={t("cart.effective.modal.metrics.er")}
          value={metrics.er.value}
          diff={metrics.er.diff}
        />
      </div>

      {/* Bar Chart with Sticky Y Axis */}
      <div className="mt-4 relative h-[280px] w-full overflow-hidden border-b border-gray-100 pb-2">
        <div className="h-full overflow-x-auto scrollbar-hide">
          <div className="h-full min-w-[500px] md:min-w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
                barGap={2}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  domain={[0, 200]}
                  ticks={[0, 40, 80, 120, 160, 200]}
                  className="recharts-y-axis-sticky"
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    backgroundColor: "white",
                  }}
                  name={t("cart.effective.modal.chart_price_axis")}
                />
                <Bar
                  dataKey="current"
                  fill="#88c5d1"
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 30 : 55}
                >
                  <LabelList dataKey="current" content={<CustomizedLabel />} />
                </Bar>
                <Bar
                  dataKey="optimal"
                  fill={suggestedColor}
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 30 : 55}
                >
                  <LabelList dataKey="optimal" content={<CustomizedLabel />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex justify-center flex-wrap gap-4 md:gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#88c5d1]" />
          <span className="text-xs text-gray-500 font-medium">
            {t("cart.effective.modal.legend_current")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: suggestedColor }}
          />
          <span className="text-xs text-gray-500 font-medium">
            {isEconomy
              ? t("cart.effective.modal.legend_economy")
              : t("cart.effective.modal.legend_optimal")}
          </span>
        </div>
      </div>

      {/* List of platforms */}
      <div className="mt-8 md:mt-10 mb-6 md:mb-8 border-t border-dashed border-gray-200 pt-6 md:pt-8">
        <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-4">
          {t("cart.effective.modal.platforms_title")}
        </h3>
        <div className="flex flex-col gap-3">
          {MOCK_CHANNELS.map((channel) => (
            <CompactCatalogCard
              key={channel.id}
              card={channel}
              AddToBasketBtn={() => null}
              FormatList={() => null}
              onChangeCard={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 items-center gap-4 mt-6 md:mt-8 pt-4">
        <MyButton
          buttons_type="button__white"
          onClick={onClose}
          className="text-[10px] md:text-[12px]"
        >
          {t("cart.effective.modal.buttons.cancel")}
        </MyButton>
        <MyButton className="text-[10px] md:text-[12px]">
          {t("cart.effective.modal.buttons.replace")}
        </MyButton>
      </div>
    </div>
  );
};

export const EffectiveCartModal: FC<EffectiveCartModalProps> = (props) => {
  const { t } = useTranslation();
  const { title, type, budget, budgetDiff, metrics, isOpen, onClose } = props;
  const screen = useWindowWidth();
  const isEconomy = type === "economy";
  const suggestedColor = isEconomy ? "#FFA04F" : "#92d075";

  const budgetPercentDiff = (budgetDiff / budget) * 100;

  const data = [
    {
      name: t("cart.effective.modal.histogram.price"),
      current: 100,
      optimal: Number((100 + budgetPercentDiff).toFixed(1)),
    },
    {
      name: t("cart.effective.modal.histogram.reach"),
      current: 100,
      optimal: Number((100 + metrics.reach.diff).toFixed(1)),
    },
    {
      name: t("cart.effective.modal.histogram.subscribers"),
      current: 100,
      optimal: Number((100 + metrics.subscribers.diff).toFixed(1)),
    },
    {
      name: t("cart.effective.modal.histogram.cpv"),
      current: 100,
      optimal: Number((100 + metrics.cpv.diff).toFixed(1)),
    },
    {
      name: t("cart.effective.modal.histogram.er"),
      current: 100,
      optimal: Number((100 + metrics.er.diff).toFixed(1)),
    },
  ];

  const isPositiveBudget = budgetDiff > 0;
  const budgetColorClass = isPositiveBudget ? "text-red-400" : "text-[#71c371]";
  const formattedBudgetDiff =
    (isPositiveBudget ? "+" : "") + budgetDiff.toLocaleString();

  const bodyProps = {
    budget,
    metrics,
    suggestedColor,
    data,
    budgetColorClass,
    formattedBudgetDiff,
    onClose,
    isMobile: screen < BREAKPOINT.MD,
    isEconomy,
  };

  if (screen >= BREAKPOINT.MD) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl p-0 bg-white gap-0 rounded-2xl border-none overflow-hidden">
          <DialogHeader className="pb-2 md:pb-4 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800">
                {title}
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <DialogDescription className="sr-only">
              {t("cart.effective.modal.aria_desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <EffectiveCartModalBody {...bodyProps} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-white p-0 overflow-hidden h-full min-h-full rounded-none">
        <DrawerHeader className="pb-2 md:pb-4 border-b">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-xl md:text-2xl font-bold text-gray-800">
              {title}
            </DrawerTitle>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <DrawerDescription className="sr-only">
            {t("cart.effective.modal.aria_desc")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto flex-1 h-full">
          <EffectiveCartModalBody {...bodyProps} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
