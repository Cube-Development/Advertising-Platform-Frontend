import { useOrderReportInfoMutation } from "@entities/project";
import { MyButton, useToast } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Download, Loader } from "lucide-react";

interface DownloadReportProps {
  project_id: string;
}

export const DownloadReport: FC<DownloadReportProps> = ({ project_id }) => {
  const { t } = useTranslation();
  const [reportInfo, { isLoading: isReportInfoLoading }] =
    useOrderReportInfoMutation();
  const { toast } = useToast();
  const handleOnClick = () => {
    project_id &&
      reportInfo({ project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        })
        .catch((err) => {
          console.error("Error downloading the file", err);
          toast({
            variant: "error",
            title: "Не удалось скачать файл",
          });
        });
  };
  return (
    <MyButton
      buttons_type="button__blue"
      className="md:!text-sm !text-xs flex items-center justify-center w-!full p-3 !text-start !h-auto md:shadow-none shadow-xl !font-medium"
      onClick={handleOnClick}
    >
      {isReportInfoLoading ? (
        <Loader className="animate-spin" stroke="#fff" width={22} height={22} />
      ) : (
        <>
          <Download className="min-w-[20px] size-5 stroke-[2px]" />
          {t(`order_btn.downloadReport`)}
        </>
      )}
    </MyButton>
  );
};
