import { useOrderReportInfoMutation } from "@entities/project";
import { MyButton } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SendReportProps {
  project_id: string;
}

export const SendReport: FC<SendReportProps> = ({ project_id }) => {
  const { t } = useTranslation();
  const [reportInfo] = useOrderReportInfoMutation();
  const handleOnClick = () => {
    project_id &&
      reportInfo({ project_id })
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
    <MyButton className={styles.button} onClick={handleOnClick}>
      {t(`order_btn.sendReport`)}
    </MyButton>
  );
};
