import { IOrderReportInfo, useGetProjectReportsQuery } from "@entities/project";
import { MyButton, Popover, PopoverTrigger, useToast } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { ChevronDown, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { getReportDownloadFileName } from "../model/getReportDownloadFileName";
import { ReportVersionsPopoverContent } from "./report-versions-popover-content";

const buttonClassName =
  "md:!text-sm !text-xs flex items-center justify-center w-full p-3 !text-start !h-auto md:shadow-none shadow-xl !font-medium";

interface ProjectReportVersionsProps {
  project_id: string;
  report?: IOrderReportInfo | null;
}

export const ProjectReportVersions: FC<ProjectReportVersionsProps> = ({
  project_id,
  report,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data, isFetching } = useGetProjectReportsQuery(
    { project_id },
    {
      skip: !project_id,
      pollingInterval: 0,
    },
  );

  const reports: IOrderReportInfo[] = data?.reports?.length
    ? data.reports
    : report
      ? [report]
      : [];

  const hasVersions = reports.length > 0;

  const latestReportId =
    data?.reports?.[0]?.id ?? report?.id ?? reports[0]?.id;

  const handleDownload = async (file: IOrderReportInfo) => {
    try {
      setDownloadingId(file.id);
      await downloadFileOnDevice(
        file.url,
        getReportDownloadFileName(file.file_name),
      );
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

  if (!hasVersions) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
        {isFetching && !reports.length ? (
          <div className="flex justify-center py-3">
            <Loader className="animate-spin" width={20} height={20} />
          </div>
        ) : (
          <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
            {reports.map((item) => {
              const isLatest = item.id === latestReportId;

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
  );
};
