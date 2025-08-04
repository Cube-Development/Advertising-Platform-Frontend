import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

interface ITopupSuccessCardProps {
  downloadBtn: React.ReactNode;
}

export const TopupSuccessCard: FC<ITopupSuccessCardProps> = ({
  downloadBtn: DownloadBtn,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative space-y-6 overflow-hidden frame sm:space-y-8 md:space-y-10">
      <div className="relative mt-4 text-center sm:space-y-5 md:space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 sm:w-18 sm:h-18 md:w-20 md:h-20">
          <CheckCircle className="w-8 h-8 text-white sm:w-9 sm:h-9 md:w-10 md:h-10" />
        </div>
        <div className="grid grid-flow-row gap-2">
          <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text sm:text-xl">
            {t("wallet.topup.success.title")}
          </p>
          <span className="text-sm text-muted-foreground sm:text-base">
            {t("wallet.topup.success.text")}
          </span>
        </div>
      </div>
      <div className="grid items-center justify-center">{DownloadBtn}</div>
    </div>
  );
};
