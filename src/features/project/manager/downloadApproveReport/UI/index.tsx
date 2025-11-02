import { useDownloadRequestApproveReportMutation } from "@entities/project";
import { MyButton } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Download, Loader } from "lucide-react";

interface DownloadApproveReportProps {
  project_id: string;
}

export const DownloadApproveReport: FC<DownloadApproveReportProps> = ({
  project_id,
}) => {
  const { t } = useTranslation();
  const [
    downloadRequestApproveReport,
    { isLoading: isDownloadRequestApproveReportLoading },
  ] = useDownloadRequestApproveReportMutation();
  const handleOnClick = () => {
    project_id &&
      downloadRequestApproveReport({ project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        })
        .catch((err) => {
          console.error("Error downloading the file", err);
          alert("Не удалось скачать файл");
        });
  };

  return (
    <MyButton
      buttons_type="button__white"
      className="md:!text-sm !text-xs flex items-center justify-center w-!full p-3 !text-start !h-auto"
      onClick={handleOnClick}
    >
      {isDownloadRequestApproveReportLoading ? (
        <Loader
          className="animate-spin"
          stroke="var(--Personal-colors-main)"
          width={22}
          height={22}
        />
      ) : (
        <>
          <Download className="size-5 stroke-[2px]" />
          {t("orders_manager.project_page_btn.download_request_approve_report")}
        </>
      )}
    </MyButton>
  );
};
