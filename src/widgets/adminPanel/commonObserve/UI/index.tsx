import {
  ICommonObserveReq,
  ICommonObserveTotals,
  useGetCommonObserveQuery,
} from "@entities/admin";
import { BarSubFilter } from "@features/other";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SpinnerLoader,
} from "@shared/ui";
import { Input } from "@shared/ui/shadcn-ui/ui/input";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/shadcn-ui/ui/table";
import { formatMoney } from "@shared/utils";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  COMMON_OBSERVE_COLUMN_KEYS,
  COMMON_OBSERVE_PERIOD,
  COMMON_OBSERVE_PERIOD_TABS,
  CommonObserveColumnKey,
  getCommonObserveColumnLabelKey,
} from "../model/constants";
import { getDateRangeByPeriod, toApiDate } from "../model/helpers";
import { CommonObserveChart } from "./CommonObserveChart";
import { CommonObserveTotalsCards } from "./CommonObserveTotalsCards";
import styles from "./styles.module.scss";

interface ICommonObserveForm {
  period: COMMON_OBSERVE_PERIOD;
  date_from: string;
  date_to: string;
}

export const CommonObserve: FC = () => {
  const { t } = useTranslation();
  const defaultRange = getDateRangeByPeriod(COMMON_OBSERVE_PERIOD.ONE_MONTH);

  const [queryParams, setQueryParams] = useState<ICommonObserveReq>(() => ({
    date_from: toApiDate(defaultRange.dateFrom),
    date_to: toApiDate(defaultRange.dateTo),
  }));

  const { watch, setValue } = useForm<ICommonObserveForm>({
    defaultValues: {
      period: COMMON_OBSERVE_PERIOD.ONE_MONTH,
      date_from: defaultRange.dateFrom,
      date_to: defaultRange.dateTo,
    },
  });

  const formFields = watch();

  const { data: observeData, isLoading, isFetching } =
    useGetCommonObserveQuery(queryParams);

  const formatCellValue = (key: CommonObserveColumnKey, value: number | string) => {
    if (key === "turnover" && typeof value === "number") {
      return formatMoney(value);
    }
    return value;
  };

  const renderTotalsCell = (
    key: CommonObserveColumnKey,
    totals: ICommonObserveTotals,
  ) => {
    if (key === "date") {
      return t("admin_panel.common_observe.total_row");
    }
    return formatCellValue(key, totals[key]);
  };

  const changeTab = (period: COMMON_OBSERVE_PERIOD) => {
    const range = getDateRangeByPeriod(period);
    setValue("period", period);
    setValue("date_from", range.dateFrom);
    setValue("date_to", range.dateTo);
    setQueryParams({
      date_from: toApiDate(range.dateFrom),
      date_to: toApiDate(range.dateTo),
    });
  };

  const applyDates = () => {
    if (!formFields.date_from || !formFields.date_to) {
      return;
    }

    setQueryParams({
      date_from: toApiDate(formFields.date_from),
      date_to: toApiDate(formFields.date_to),
    });
  };

  const isPending = isLoading || isFetching;

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.common_observe")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.common_observe")}</span>
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.panel}>
            <div className={styles.filter}>
              <BarSubFilter
                tab={formFields.period}
                changeTab={changeTab}
                tab_list={COMMON_OBSERVE_PERIOD_TABS}
              />
              <div className={styles.dates}>
                <div className={styles.dateField}>
                  <Label htmlFor="date_from">
                    {t("admin_panel.common_observe.date_from")}
                  </Label>
                  <Input
                    id="date_from"
                    type="date"
                    value={formFields.date_from}
                    onChange={(event) =>
                      setValue("date_from", event.target.value)
                    }
                  />
                </div>
                <div className={styles.dateField}>
                  <Label htmlFor="date_to">
                    {t("admin_panel.common_observe.date_to")}
                  </Label>
                  <Input
                    id="date_to"
                    type="date"
                    value={formFields.date_to}
                    onChange={(event) =>
                      setValue("date_to", event.target.value)
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="primary"
                  onClick={applyDates}
                  disabled={isPending}
                >
                  {t("admin_panel.common_observe.show")}
                </Button>
              </div>
            </div>
          </div>

          {observeData?.totals && !isPending && (
            <div className={styles.panel}>
              <CommonObserveTotalsCards totals={observeData.totals} />
            </div>
          )}

          <Card className={styles.panel}>
            <CardHeader>
              <CardTitle>{t("admin_panel.common_observe.chart_title")}</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="flex justify-center py-12">
                  <SpinnerLoader />
                </div>
              ) : (
                <CommonObserveChart data={observeData?.data ?? []} />
              )}
            </CardContent>
          </Card>

          <div className={styles.panel}>
            {isPending ? (
              <div className="flex justify-center py-12">
                <SpinnerLoader />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {COMMON_OBSERVE_COLUMN_KEYS.map((key) => (
                      <TableHead key={key}>
                        {t(getCommonObserveColumnLabelKey(key))}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {observeData?.data?.length ? (
                    observeData.data.map((row) => (
                      <TableRow key={row.date}>
                        {COMMON_OBSERVE_COLUMN_KEYS.map((key) => (
                          <TableCell key={key}>
                            {formatCellValue(key, row[key])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={COMMON_OBSERVE_COLUMN_KEYS.length}
                        className="text-center text-muted-foreground"
                      >
                        {t("admin_panel.common_observe.empty")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                {observeData?.totals && (
                  <TableFooter>
                    <TableRow>
                      {COMMON_OBSERVE_COLUMN_KEYS.map((key) => (
                        <TableCell key={key}>
                          {renderTotalsCell(key, observeData.totals)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
