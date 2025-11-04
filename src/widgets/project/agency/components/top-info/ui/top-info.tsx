import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CheckCheck, Download, Flag, Loader } from "lucide-react";
import {
  ENUM_VIEWER_ROLES,
  IAgencyOrderCard,
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
  orders?: IAgencyOrderCard[];
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
  remainder,
  orders,
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
        <h1 className="xl:text-2xl md:text-xl text-base font-bold text-[var(--Personal-colors-black)]">
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

      <div className="grid lg:grid-cols-4 mobile-xl:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-white rounded-2xl shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] mobile-xl:p-6 p-4 border-l-4 border-blue-500">
          <div className="text-slate-600 md:text-sm text-xs font-medium mb-1">
            {t("project_page.top_info.views")}
          </div>
          <div className="md:text-base text-sm font-bold text-slate-800">
            {views.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {count_channels} {t("project_page.top_info.channels")}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] mobile-xl:p-6 p-4 border-l-4 border-green-500">
          <div className="text-slate-600 md:text-sm text-xs font-medium mb-1">
            {t("project_page.top_info.budget")}
          </div>
          <div className="md:text-base text-sm font-bold text-slate-800">
            {budget.toLocaleString()} {t("symbol")}
          </div>
          <div className="text-xs text-green-600 mt-2">
            {t("project_page.top_info.remainder")}:{" "}
            {(remainder || 0).toLocaleString()} {t("symbol")}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] mobile-xl:p-6 p-4 border-l-4 border-amber-500">
          <div className="text-slate-600 md:text-sm text-xs font-medium mb-1">
            {t("project_page.top_info.cpv")}
          </div>
          <div className="md:text-base text-sm font-bold text-slate-800">
            {orders && orders.length > 0
              ? (
                  orders.reduce((s, o) => s + (o.cpv || 0), 0) / orders.length
                ).toFixed(1)
              : "0.0"}{" "}
            {t("symbol")}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {t("project_page.top_info.per_view")}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] mobile-xl:p-6 p-4 border-l-4 border-purple-500">
          <div className="text-slate-600 md:text-sm text-xs font-medium mb-1">
            {t("project_page.top_info.er")}
          </div>
          <div className="md:text-base text-sm font-bold text-slate-800">
            {orders && orders.length > 0
              ? (
                  orders.reduce((s, o) => s + (o.er || 0), 0) / orders.length
                ).toFixed(1)
              : "0.0"}
            %
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {t("project_page.top_info.involvement")}
          </div>
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
          <div className="shadow-md rounded-[10px] bg-white/80 border-[1.5px] border-black/5 py-4 flex items-center justify-center gap-2 [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <RocketIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {in_progress?.toLocaleString()}
            </p>
          </div>
          <div className="shadow-md rounded-[10px] bg-white/80 border-[1.5px] border-black/5 py-4 flex items-center justify-center gap-2 [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <CompleteIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {completed?.toLocaleString()}
            </p>
          </div>
          <div className="shadow-md rounded-[10px] bg-white/80 border-[1.5px] border-black/5 py-4 flex items-center justify-center gap-2 [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
            <CancelIcon />
            <p className="mobile-xl:text-base text-sm font-medium">
              {canceled?.toLocaleString()}
            </p>
          </div>
          <div className="shadow-md rounded-[10px] bg-white/80 border-[1px] border-black/5 py-4 flex items-center justify-center gap-2 [&>svg]:mobile-xl:size-[26px] [&>svg]:size-5">
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
