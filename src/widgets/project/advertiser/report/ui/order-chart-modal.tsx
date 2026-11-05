import { ICompletedOrder } from "@entities/project";
import {
  CustomCloseButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui";
import { ChartLine } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderChartContent } from "./order-chart-card";

/** Кнопка на карточке размещения — открывает график в модалке */
export const OrderChartModal: FC<{ order: ICompletedOrder }> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-[var(--Personal-colors-main)] px-3 py-2.5 text-sm font-medium text-[var(--Personal-colors-main)] transition-opacity hover:opacity-80"
        >
          <ChartLine className="size-4" />
          {t("adv_project_page.report.chart.open")}
        </button>
      </DialogTrigger>
      {/* У общего DialogContent отступы только с sm:, а колонка сетки растягивается
          графиком — задаём мобильные отступы и колонку minmax(0, 1fr) */}
      <DialogContent className="max-h-[90dvh] w-[calc(100vw-32px)] max-w-3xl grid-cols-[minmax(0,1fr)] overflow-y-auto p-4 sm:p-6">
        <DialogClose asChild>
          <CustomCloseButton className="top-1 translate-y-0" />
        </DialogClose>
        <DialogTitle className="pr-8 text-base md:text-lg">
          {t("adv_project_page.report.chart.title")}
        </DialogTitle>
        <DialogDescription className="sr-only">{order.name}</DialogDescription>
        <OrderChartContent order={order} height={320} wide />
      </DialogContent>
    </Dialog>
  );
};
