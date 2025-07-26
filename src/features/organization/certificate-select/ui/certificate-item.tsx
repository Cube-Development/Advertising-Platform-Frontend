import { ParsedCertificateInfo } from "@entities/organization";
import { Building, Calendar, CheckCircle, MapPin } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ICertificateItemProps {
  info: ParsedCertificateInfo;
  isSelected?: boolean;
}

export const CertificateItem: FC<ICertificateItemProps> = ({
  info,
  isSelected = false,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full space-y-3">
      {/* Основная информация */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 space-y-3">
          <h4 className="text-lg font-bold leading-tight text-gray-900 truncate">
            {info.cn.toUpperCase()}
          </h4>
          <div className="grid items-center justify-between grid-flow-col gap-2">
            <p className="px-2 font-mono text-lg font-semibold text-[#4d37b3] bg-white rounded-xl">
              {info.pnfl}
            </p>
            <span className="px-2 truncate bg-white border rounded-xl border-2-gray-200">
              {t("organization.login.didox.certificate.until")} {info.validTo}
            </span>
          </div>
        </div>
        {isSelected && (
          <CheckCircle className="flex-shrink-0 w-6 h-6 ml-2 text-[#4d37b3]" />
        )}
      </div>
    </div>
  );
};
