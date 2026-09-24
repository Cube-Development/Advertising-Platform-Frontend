import {
  advProjectsAPI,
  IOrderReportInfo,
  useGetProjectReportsQuery,
  useRequestCompletedReportMutation,
} from "@entities/project";
import { ADV_PROJECTS } from "@shared/api";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, Popover, PopoverTrigger, useToast } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { ChevronDown, Download, Loader } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportVersionsPopoverContent } from "./report-versions-popover-content";

interface DownloadReportProps {
  project_id: string;
  report?: IOrderReportInfo | null;
}

const buttonClassName =
  "md:!text-sm !text-xs flex items-center justify-center w-full p-3 !text-start !h-auto md:shadow-none shadow-xl !font-medium";

export const DownloadReport: FC<DownloadReportProps> = ({
  project_id,
  report,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isWaiting, setIsWaiting] = useState(false);
  const [isVersionsOpen, setIsVersionsOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [reports, setReports] = useState<IOrderReportInfo[]>(() =>
    report ? [report] : [],
  );
  const [requestCompletedReport, { isLoading: isRequestLoading }] =
    useRequestCompletedReportMutation();

  const { data, isFetching } = useGetProjectReportsQuery(
    { project_id },
    {
      skip: !project_id || (!isWaiting && !isVersionsOpen),
      pollingInterval: isWaiting ? 4000 : 0,
    },
  );

  useEffect(() => {
    if (!report) return;

    setReports((current) =>
      current.some((item) => item.id === report.id)
        ? current
        : [report, ...current],
    );
  }, [report]);

  useEffect(() => {
    if (!data?.reports.length) return;

    setReports(data.reports);

    if (!isWaiting) return;

    setIsWaiting(false);
    dispatch(advProjectsAPI.util.invalidateTags([ADV_PROJECTS]));
  }, [data?.reports, dispatch, isWaiting]);

  const latestReport =
    (report && reports.find((item) => item.id === report.id)) ||
    report ||
    reports[0];
  const isGenerating = isRequestLoading || isWaiting;

  const handleRequest = async () => {
    try {
      await requestCompletedReport({ project_id }).unwrap();
      setIsWaiting(true);
    } catch {
      toast({
        variant: "error",
        title: t("order_btn.reportRequestError"),
      });
    }
  };

  const handleDownload = async (file: IOrderReportInfo) => {
    try {
      setDownloadingId(file.id);
      await downloadFileOnDevice(file.url, `${file.file_name}.xlsx`);
    } catch (error) {
      console.error("Error downloading the file", error);
      toast({
        variant: "error",
        title: t("order_btn.reportDownloadError"),
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (!latestReport) {
    return (
      <MyButton
        type="button"
        buttons_type="button__blue"
        className={buttonClassName}
        onClick={handleRequest}
        disabled={isGenerating || !project_id}
      >
        {isGenerating ? (
          <>
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={22}
              height={22}
            />
            {t("order_btn.reportGenerating")}
          </>
        ) : (
          <>
            <Download className="min-w-[20px] size-5 stroke-[2px]" />
            {t("order_btn.requestReport")}
          </>
        )}
      </MyButton>
    );
  }

  return (
    <div className="grid w-full gap-2">
      <MyButton
        type="button"
        buttons_type="button__blue"
        className={buttonClassName}
        onClick={() => handleDownload(latestReport)}
        disabled={downloadingId === latestReport.id}
      >
        {downloadingId === latestReport.id ? (
          <Loader
            className="animate-spin"
            stroke="#fff"
            width={22}
            height={22}
          />
        ) : (
          <>
            <Download className="min-w-[20px] size-5 stroke-[2px]" />
            {t("order_btn.downloadReport")}
          </>
        )}
      </MyButton>
      <Popover open={isVersionsOpen} onOpenChange={setIsVersionsOpen}>
        <PopoverTrigger asChild>
          <MyButton
            type="button"
            buttons_type="button__white"
            className={buttonClassName}
          >
            <ChevronDown className="min-w-[20px] size-5 stroke-[2px]" />
            {t("order_btn.reportVersions")}
          </MyButton>
        </PopoverTrigger>
        <ReportVersionsPopoverContent
          align="end"
          side="bottom"
          collisionPadding={12}
          className="w-72 max-w-[min(18rem,calc(100vw-1.5rem))] p-2"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          {isFetching && reports.length === 0 ? (
            <div className="flex justify-center py-3">
              <Loader className="animate-spin" width={20} height={20} />
            </div>
          ) : (
            <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
              {reports.map((item) => {
                const isLatest = item.id === latestReport.id;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-2 rounded-md px-2 py-2 text-left text-xs hover:bg-black/5 disabled:opacity-50"
                      onClick={() => handleDownload(item)}
                      disabled={downloadingId === item.id}
                    >
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate font-medium">
                          {item.file_name}
                        </span>
                        <span className="text-[var(--Personal-colors-Grey)]">
                          {item.created}
                        </span>
                      </span>
                      {downloadingId === item.id ? (
                        <Loader
                          className="mt-0.5 shrink-0 animate-spin"
                          width={16}
                          height={16}
                        />
                      ) : (
                        isLatest && (
                          <span className="shrink-0 text-[10px] font-medium text-[var(--Personal-colors-main)]">
                            {t("order_btn.reportLatest")}
                          </span>
                        )
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </ReportVersionsPopoverContent>
      </Popover>
    </div>
  );
};
