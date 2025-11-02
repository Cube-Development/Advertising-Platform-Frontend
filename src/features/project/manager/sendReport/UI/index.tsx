import {
  useDownloadCompletedReportMutation,
  useOrderReportInfoMutation,
} from "@entities/project";
import { MyButton } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

interface SendReportProps {
  project_id: string;
  is_agency?: boolean;
}

export const SendReport: FC<SendReportProps> = ({
  project_id,
  is_agency = false,
}) => {
  const { t } = useTranslation();
  const [reportInfo] = useOrderReportInfoMutation();
  const [downloadCompletedReport] = useDownloadCompletedReportMutation();

  const handleOnClick = () => {
    if (is_agency) {
      downloadCompletedReport({ project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        });
    } else {
      reportInfo({ project_id })
        .unwrap()
        .then((res) => {
          downloadFileOnDevice(res.url, res.file_name + ".xlsx");
        })
        .catch((err) => {
          console.error("Error downloading the file", err);
          alert("Не удалось скачать файл");
        });
    }
  };

  return (
    <MyButton
      buttons_type="button__blue"
      className="md:!text-base !text-sm flex items-center justify-center !font-semibold"
      onClick={handleOnClick}
    >
      <Download className="size-6 stroke-[1.5px]" />
      {t(`order_btn.sendReport`)}
    </MyButton>
  );
};
