import { ICommonObserveItem, ICommonObserveTotals } from "@entities/admin";
import {
  COMMON_OBSERVE_CHART_SERIES,
  COMMON_OBSERVE_COLUMN_KEYS,
  COMMON_OBSERVE_METRIC_KEYS,
  CommonObserveColumnKey,
} from "./constants";

const METRIC_CHART_KEYS = [
  "projects",
  "common_orders",
  "publisher_orders",
  "self_connect_orders",
] as const;

const COLUMN_INDEX: Record<CommonObserveColumnKey, number> = {
  date: 1,
  projects: 2,
  common_orders: 3,
  publisher_orders: 4,
  self_connect_orders: 5,
  turnover: 6,
};

export interface CommonObserveExportLabels {
  reportTitle: string;
  sheetName: string;
  totalsTitle: string;
  totalRow: string;
  dateFrom: string;
  dateTo: string;
  chartMetricsTitle: string;
  chartTurnoverTitle: string;
  columns: Record<CommonObserveColumnKey, string>;
}

export interface ExportCommonObserveParams {
  data: ICommonObserveItem[];
  totals: ICommonObserveTotals;
  dateFrom: string;
  dateTo: string;
  labels: CommonObserveExportLabels;
}

const escapeSheetName = (name: string) => name.replace(/'/g, "''");

const buildRangeRef = (
  sheetName: string,
  col: number,
  startRow: number,
  endRow: number,
  colIndexToLetter: (index: number) => string,
) => {
  const letter = colIndexToLetter(col);
  return `'${escapeSheetName(sheetName)}'!$${letter}$${startRow}:$${letter}$${endRow}`;
};

const getSeriesColor = (key: CommonObserveColumnKey) => {
  const series = COMMON_OBSERVE_CHART_SERIES.find((item) => item.key === key);
  if (!series) {
    return undefined;
  }
  return series.color.replace("#", "FF");
};

export const exportCommonObserveToExcel = async ({
  data,
  totals,
  dateFrom,
  dateTo,
  labels,
}: ExportCommonObserveParams): Promise<void> => {
  const { Workbook, colIndexToLetter, style, NumFmt } = await import(
    "@node-projects/excelforge"
  );

  const workbook = new Workbook();
  const sheetName = labels.sheetName;
  const worksheet = workbook.addSheet(sheetName);

  const headerStyle = style().bold().bg("FFE8F5F3").build();
  const titleStyle = style().bold().fontSize(14).build();
  const totalsStyle = style().bold().build();
  const turnoverStyle = style().numFmt(NumFmt.Decimal2).build();
  const totalsRowStyle = style().bold().bg("FFE8F5F3").build();
  const totalsTurnoverStyle = style()
    .bold()
    .bg("FFE8F5F3")
    .numFmt(NumFmt.Decimal2)
    .build();

  worksheet.setValue(1, 1, labels.reportTitle);
  worksheet.setStyle(1, 1, titleStyle);
  worksheet.setValue(
    2,
    1,
    `${labels.dateFrom}: ${dateFrom} — ${labels.dateTo}: ${dateTo}`,
  );

  worksheet.setValue(4, 1, labels.totalsTitle);
  worksheet.setStyle(4, 1, totalsStyle);

  COMMON_OBSERVE_METRIC_KEYS.forEach((key, index) => {
    const row = 5 + index;
    worksheet.setValue(row, 1, labels.columns[key]);
    worksheet.setValue(row, 2, totals[key]);
    if (key === "turnover") {
      worksheet.setStyle(row, 2, turnoverStyle);
    }
  });

  const tableHeaderRow = 11;
  const firstDataRow = 12;
  const lastDataRow = firstDataRow + data.length - 1;
  const totalsRow = lastDataRow + 1;

  COMMON_OBSERVE_COLUMN_KEYS.forEach((key, index) => {
    const col = index + 1;
    worksheet.setValue(tableHeaderRow, col, labels.columns[key]);
    worksheet.setStyle(tableHeaderRow, col, headerStyle);
  });

  data.forEach((row, rowIndex) => {
    const excelRow = firstDataRow + rowIndex;
    COMMON_OBSERVE_COLUMN_KEYS.forEach((key, colIndex) => {
      const col = colIndex + 1;
      worksheet.setValue(excelRow, col, row[key]);
      if (key === "turnover") {
        worksheet.setStyle(excelRow, col, turnoverStyle);
      }
    });
  });

  COMMON_OBSERVE_COLUMN_KEYS.forEach((key, colIndex) => {
    const col = colIndex + 1;
    if (key === "date") {
      worksheet.setValue(totalsRow, col, labels.totalRow);
      worksheet.setStyle(totalsRow, col, totalsRowStyle);
      return;
    }

    worksheet.setValue(totalsRow, col, totals[key]);
    worksheet.setStyle(
      totalsRow,
      col,
      key === "turnover" ? totalsTurnoverStyle : totalsRowStyle,
    );
  });

  worksheet.autoFitColumns(10, 40);

  const categoriesRange = buildRangeRef(
    sheetName,
    COLUMN_INDEX.date,
    firstDataRow,
    lastDataRow,
    colIndexToLetter,
  );

  worksheet.addChart({
    type: "line",
    title: labels.chartMetricsTitle,
    series: METRIC_CHART_KEYS.map((key) => ({
      name: labels.columns[key],
      categories: categoriesRange,
      values: buildRangeRef(
        sheetName,
        COLUMN_INDEX[key],
        firstDataRow,
        lastDataRow,
        colIndexToLetter,
      ),
      color: getSeriesColor(key),
      lineWidth: 2,
    })),
    from: { col: 7, row: 10 },
    to: { col: 15, row: 27 },
    legend: "bottom",
    varyColors: true,
    colorPalette: "teal",
    grouping: "standard",
  });

  worksheet.addChart({
    type: "line",
    title: labels.chartTurnoverTitle,
    series: [
      {
        name: labels.columns.turnover,
        categories: categoriesRange,
        values: buildRangeRef(
          sheetName,
          COLUMN_INDEX.turnover,
          firstDataRow,
          lastDataRow,
          colIndexToLetter,
        ),
        color: getSeriesColor("turnover"),
        lineWidth: 2,
      },
    ],
    from: { col: 7, row: 28 },
    to: { col: 15, row: 45 },
    legend: false,
    varyColors: false,
    grouping: "standard",
  });

  await workbook.download(`common-observe_${dateFrom}_${dateTo}.xlsx`);
};
