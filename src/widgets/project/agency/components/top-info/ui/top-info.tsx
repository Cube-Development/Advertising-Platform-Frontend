import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CheckCheck, Download, Flag, Loader } from "lucide-react";
import {
  ENUM_VIEWER_ROLES,
  projectStatus,
  useAgencyApproveProjectMutation,
  useDownloadCompletedReportMutation,
  useDownloadRequestApproveReportMutation,
} from "@entities/project";
import { CancelIcon, CompleteIcon, RocketIcon, WaitIcon } from "@shared/assets";
import { MyButton, useToast } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";

interface TopInfoProps {
  project_name: string;
  is_request_approve: projectStatus;
  count_channels: number;
  budget: number;
  views: number;
  in_progress: number;
  completed: number;
  canceled: number;
  wait: number;
  remainder?: number;
  viewer: ENUM_VIEWER_ROLES;
  project_id: string;
  code: number;
}

export const TopInfo: FC<TopInfoProps> = ({
  project_name,
  is_request_approve,
  count_channels,
  budget,
  views,
  in_progress,
  completed,
  canceled,
  wait,
  viewer,
  project_id,
  code,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [agencyApproveProject, { isLoading: isAgencyApproveProjectLoading }] =
    useAgencyApproveProjectMutation();
  const [
    downloadRequestApproveReport,
    { isLoading: isDownloadRequestApproveReportLoading },
  ] = useDownloadRequestApproveReportMutation();
  const [
    downloadCompletedReport,
    { isLoading: isDownloadCompletedReportLoading },
  ] = useDownloadCompletedReportMutation();

  const handleApproveProject = async () => {
    await agencyApproveProject({ project_id: project_id, code: code })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.orders_manager.approve_project.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.orders_manager.approve_project.error"),
        });
        console.error("error: ", error);
      });
  };

  const handleDownloadReport = async () => {
    if (is_request_approve === projectStatus.completed) {
      await downloadCompletedReport({ project_id: project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        })
        .catch((error) => {
          console.error("error: ", error);
        });
    } else {
      await downloadRequestApproveReport({ project_id: project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        })
        .catch((error) => {
          console.error("error: ", error);
        });
    }
  };

  return (
    <div className="grid grid-flow-row md:gap-10 gap-6">
      <div className="grid md:grid-flow-col grid-flow-row gap-4 items-center md:justify-between justify-center md:justify-items-start justify-items-center">
        <h1 className="xl:text-2xl md:text-lg text-base font-bold text-[var(--Personal-colors-black)]">
          {project_name}
        </h1>
        <MyButton
          buttons_type="button__orange"
          className="h-[54px] flex items-center justify-center min-w-[240px]"
          onClick={handleDownloadReport}
        >
          {isDownloadRequestApproveReportLoading ||
          isDownloadCompletedReportLoading ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={20}
              height={20}
            />
          ) : (
            <>
              <Download className="size-5 stroke-[2px]" />
              {t("orders_manager.project_page_btn.download_report")}
            </>
          )}
        </MyButton>
        {viewer === ENUM_VIEWER_ROLES.CUSTOMER &&
          (is_request_approve === projectStatus.request_approve ||
            is_request_approve === projectStatus.cart_created ||
            is_request_approve === projectStatus.changed) && (
            <MyButton
              buttons_type="button__blue"
              className="h-[54px] flex items-center justify-center min-w-[240px]"
              onClick={handleApproveProject}
            >
              {isAgencyApproveProjectLoading ? (
                <Loader
                  className="animate-spin"
                  stroke="#fff"
                  width={20}
                  height={20}
                />
              ) : (
                <>
                  <CheckCheck className="size-5 stroke-[2px]" />{" "}
                  {t("orders_manager.project_page_btn.approve_project")}
                </>
              )}
            </MyButton>
          )}
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center px-2 py-4 shadow-md rounded-[10px] bg-[#0f69c91a] gap-[10px]">
          <p className="text-[var(--Personal-colors-black)] md:text-xl text-base font-semibold">
            {is_request_approve === projectStatus.completed
              ? t("orders_advertiser.card.status.completed")
              : t("orders_advertiser.card.status.active")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-4 shadow-md rounded-[10px] bg-[#f5f5f6] gap-[10px]">
          <p className="text-[#00000073] md:text-base text-sm font-medium">
            {t("orders_advertiser.card.channels")}:
          </p>
          <span className="text-[var(--Personal-colors-black)] md:text-base text-sm font-semibold">
            {count_channels?.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-4 shadow-md rounded-[10px] bg-[#f5f5f6] gap-[10px]">
          <p className="text-[#00000073] md:text-base text-sm font-medium">
            {t("orders_advertiser.card.views")}:
          </p>
          <span className="text-[var(--Personal-colors-black)] md:text-base text-sm font-semibold">
            ~ {views?.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-4 shadow-md rounded-[10px] bg-[#f5f5f6] gap-[10px]">
          <p className="text-[#00000073] md:text-base text-sm font-medium">
            {t("orders_advertiser.card.cost")}:
          </p>
          <span className="flex items-start gap-1">
            <span className="text-[var(--Personal-colors-black)] md:text-base text-sm font-semibold">
              {budget?.toLocaleString()}
            </span>
            <small className="text-[var(--Personal-colors-black)] md:text-base text-sm font-semibold">
              {t("symbol")}
            </small>
          </span>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-4 md:text-lg text-base text-center text-[var(--Personal-colors-black)] font-semibold">
        <Flag className="size-8 stroke-[1.5px] text-[var(--Personal-colors-main2)]" />
        <p>
          {is_request_approve === projectStatus.request_approve ||
          is_request_approve === projectStatus.cart_created
            ? t("orders_manager.project_page_status.request_approve")
            : is_request_approve === projectStatus.approved
              ? t("orders_manager.project_page_status.approved")
              : is_request_approve === projectStatus.changed
                ? t("orders_manager.project_page_status.changed")
                : is_request_approve === projectStatus.in_progress
                  ? t("orders_manager.project_page_status.in_progress")
                  : is_request_approve === projectStatus.completed
                    ? t("orders_manager.project_page_status.completed")
                    : ""}
        </p>
      </div>
      {is_request_approve ===
        (projectStatus.in_progress || !projectStatus.completed) && (
        <div className="grid grid-cols-4 mobile-xl:gap-4 gap-2">
          <div className="rounded-[10px] py-4 flex items-center justify-center gap-2 border-2 border-black/10 shadow-sm [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <RocketIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {in_progress?.toLocaleString()}
            </p>
          </div>
          <div className="rounded-[10px] py-4 flex items-center justify-center gap-2 border-2 border-black/10 shadow-sm [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <CompleteIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {completed?.toLocaleString()}
            </p>
          </div>
          <div className="rounded-[10px] py-4 flex items-center justify-center gap-2 border-2 border-black/10 shadow-sm [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <CancelIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {canceled?.toLocaleString()}
            </p>
          </div>
          <div className="rounded-[10px] py-4 flex items-center justify-center gap-2 border-2 border-black/10 shadow-sm [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <WaitIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {wait?.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
