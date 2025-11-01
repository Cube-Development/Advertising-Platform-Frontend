import { MyButton } from "@shared/ui";
import { downloadFileOnDevice } from "@shared/utils";
import { FileDown } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IDownloadInvoiceProps {
  url: string;
}

export const DownloadInvoice: FC<IDownloadInvoiceProps> = ({ url }) => {
  const { t } = useTranslation();
  const handleDownload = async () => {
    await downloadFileOnDevice(url, "Invoice" + ".pdf");
  };

  if (!url) return;

  return (
    <MyButton onClick={handleDownload} className="gap-2 text-sm md:text-lg">
      <FileDown size={18} />
      {t(`wallet.topup.success.buttons.download`)}
    </MyButton>
  );
};
