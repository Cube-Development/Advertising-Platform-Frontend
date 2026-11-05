import { ICompletedOrder, platformToIcon } from "@entities/project";
import { BoyIcon, GirlIcon } from "@shared/assets";
import { Skeleton } from "@shared/ui/shadcn-ui";
import { downloadFileOnDevice, formatMoney } from "@shared/utils";
import { Download, ExternalLink, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  formatReportDate,
  formatReportTime,
  toExternalUrl,
} from "../lib/format";
import { OrderChartModal } from "./order-chart-modal";

const Metric: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="grid grid-flow-row gap-1.5 rounded-[10px] bg-[#f5f5f6] px-3 py-2">
    <p className="text-xs font-medium text-black/45">{label}</p>
    <p className="text-sm font-semibold text-[var(--Personal-colors-black)]">
      {value}
    </p>
  </div>
);

/** Имя файла скриншота: «канал-screenshot.png», расширение — из ссылки */
const getScreenshotFileName = (name: string, url: string) => {
  const ext =
    new URL(url).pathname.match(/\.(png|jpe?g|webp|gif)$/i)?.[1] ?? "png";
  const base =
    name
      // Символы, запрещённые в именах файлов
      .replace(/[\\/:*?"<>|]+/g, "")
      .trim()
      .replace(/\s+/g, "_") || "post";
  return `${base}-screenshot.${ext.toLowerCase()}`;
};

/** Скачивает скриншот на устройство; если хранилище не отдаёт файл (CORS) — открывает в новой вкладке */
const DownloadScreenshot: FC<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await downloadFileOnDevice(url, getScreenshotFileName(name, url));
    } catch (error) {
      console.error("error: ", error);
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 rounded-xl border border-[var(--Personal-colors-main)] px-3 py-2.5 text-sm font-medium text-[var(--Personal-colors-main)] transition-opacity hover:opacity-80 disabled:opacity-60"
    >
      {isLoading ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {t("adv_project_page.completed_orders.screenshot")}
    </button>
  );
};

const CompletedOrderCard: FC<{ order: ICompletedOrder }> = ({ order }) => {
  const { t } = useTranslation();
  const PlatformIcon = platformToIcon[order.platform];
  const channelUrl = toExternalUrl(order.url);
  const postUrl = toExternalUrl(order.post_url);
  const screenshotUrl = toExternalUrl(order.post_screenshot_url);

  return (
    <div className="grid gap-4 rounded-[20px] border-[1px] border-[var(--Card-separator)] bg-white/80 p-4 shadow-lg md:grid-cols-[minmax(0,1fr)_260px] md:p-5">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-start gap-3">
          {PlatformIcon ? (
            <div className="mt-0.5 size-6 shrink-0 [&>svg]:size-6">
              <PlatformIcon />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            {channelUrl ? (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-sm font-semibold text-[var(--Personal-colors-black)] hover:underline md:text-base"
              >
                {order.name}
              </a>
            ) : (
              <p className="truncate text-sm font-semibold text-[var(--Personal-colors-black)] md:text-base">
                {order.name}
              </p>
            )}
            <p
              className="truncate text-xs text-slate-500"
              title={[order.category, order.region].filter(Boolean).join(" · ")}
            >
              {[order.category, order.region].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
          <Metric
            label={t("adv_project_page.completed_orders.subscribers")}
            value={order.subscribers?.toLocaleString() ?? "—"}
          />
          <Metric
            label={t("adv_project_page.completed_orders.average_views")}
            value={order.average_views?.toLocaleString() ?? "—"}
          />
          <Metric
            label={t("adv_project_page.completed_orders.real_views")}
            value={order.real_views?.toLocaleString() ?? "—"}
          />
          <Metric
            label={t("adv_project_page.completed_orders.publish_date")}
            value={`${formatReportDate(order.publish_date)} ${formatReportTime(order.publish_time)}`.trim()}
          />
          <Metric
            label={t("adv_project_page.completed_orders.publish_count")}
            value={order.publish_count?.toLocaleString() ?? "—"}
          />
          <Metric label="ER" value={`${order.ER ?? 0}%`} />
          <Metric label="CPV" value={`${order.CPV ?? 0} ${t("symbol")}`} />
          <div className="flex items-center justify-center gap-3 rounded-[10px] bg-[#f5f5f6] px-3 py-2 [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&_svg]:size-5">
            <div>
              <BoyIcon />
              <span className="text-sm font-semibold">{order.male ?? 0}%</span>
            </div>
            <div>
              <GirlIcon />
              <span className="text-sm font-semibold">
                {order.female ?? 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row content-between gap-3 border-t border-[var(--Card-separator)] pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
        <div className="grid grid-flow-row gap-2 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">
              {t("adv_project_page.completed_orders.amount")}
            </span>
            <span className="font-medium">
              {formatMoney(order.amount ?? 0)} {t("symbol")}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">
              {t("adv_project_page.completed_orders.vat")}
            </span>
            <span className="font-medium">
              {formatMoney(order.VAT ?? 0)} {t("symbol")}
            </span>
          </div>
          <div className="flex justify-between gap-2 border-t border-[var(--Card-separator)] pt-2">
            <span className="font-semibold">
              {t("adv_project_page.completed_orders.total")}
            </span>
            <span className="font-bold text-[var(--Personal-colors-main)]">
              {formatMoney(order.total_sum ?? 0)} {t("symbol")}
            </span>
          </div>
        </div>

        <div className="grid grid-flow-row gap-2">
          {postUrl ? (
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--primary-gradient)" }}
            >
              <ExternalLink className="size-4" />
              {t("adv_project_page.completed_orders.post")}
            </a>
          ) : null}
          {screenshotUrl ? (
            <DownloadScreenshot url={screenshotUrl} name={order.name} />
          ) : null}
          <OrderChartModal order={order} />
        </div>
      </div>
    </div>
  );
};

interface CompletedOrdersListProps {
  orders: ICompletedOrder[];
  isLoading: boolean;
}

/** Таба «Размещения»: карточки выполненных размещений, по кнопке — график в модалке */
export const CompletedOrdersList: FC<CompletedOrdersListProps> = ({
  orders,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-flow-row gap-4">
      {isLoading ? (
        <div className="grid grid-flow-row gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className="bg-skeleton-light h-[200px] w-full rounded-[20px]"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="rounded-[20px] bg-white/60 py-10 text-center text-sm text-slate-500 shadow-lg">
          {t("adv_project_page.report.empty")}
        </p>
      ) : (
        <div className="grid grid-flow-row gap-3">
          {orders.map((order) => (
            <CompletedOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
