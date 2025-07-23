import { ParsedCertificateInfo } from "@entities/organization";
import { Building, Calendar, CheckCircle, MapPin } from "lucide-react";
import { FC } from "react";

interface ICertificateItemProps {
  info: ParsedCertificateInfo;
  isSelected?: boolean;
  showDetails?: boolean;
}

export const CertificateItem: FC<ICertificateItemProps> = ({
  info,
  isSelected = false,
  showDetails = true,
}) => {
  return (
    <div className="w-full space-y-3">
      {/* Основная информация */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold leading-tight text-gray-900 truncate">
            {info.cn.toUpperCase()}
          </h4>
          <p className="mt-1 font-mono text-lg font-semibold text-blue-600">
            {info.pnfl}
          </p>
        </div>
        {isSelected && (
          <CheckCircle className="flex-shrink-0 w-6 h-6 ml-2 text-blue-600" />
        )}
      </div>

      {/* Дополнительные детали */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="flex-shrink-0 w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">до {info.validTo}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="flex-shrink-0 w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{info.location}</span>
          </div>
          {info.organization !== "Не указано" && (
            <div className="flex items-center col-span-2 text-gray-600">
              <Building className="flex-shrink-0 w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{info.organization}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
