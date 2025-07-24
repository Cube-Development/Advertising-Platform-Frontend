import {
  DOCUMENT_STATUS_META,
  DOCUMENT_TYPE_META,
} from "@entities/documents/config";
import { ENUM_DOCUMENT_STATUS, IDocumentEDO } from "@entities/documents/types";
import { formatDate, formatMoney } from "@shared/utils";
import { Calendar, Tag } from "lucide-react";
import { FC } from "react";

interface DocumentCardProps {
  document: IDocumentEDO;
  signDocument: FC<{
    documentId: string;
    disabled: boolean;
  }>;
}

export const DocumentCard: FC<DocumentCardProps> = ({
  document,
  signDocument: SignDocument,
}) => {
  const isDisabled = document.doc_status === ENUM_DOCUMENT_STATUS.SIGNED;
  const statusInfo = DOCUMENT_STATUS_META[document.doc_status];
  return (
    <div className="mb-4 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      <div className="p-6">
        {/* Заголовок с типом документа и статусом */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Tag className="flex-shrink-0 w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium tracking-wide text-blue-600 uppercase">
              {DOCUMENT_TYPE_META[document?.doctype]}
            </span>
          </div>
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
          >
            {statusInfo.icon}
            <span className="ml-1">{statusInfo?.label}</span>
          </div>
          {/* <StatusBadge status={document.doc_status} /> */}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Левая колонка - Основная информация */}
          <div className="space-y-4">
            {/* Номер и дата договора */}
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Номер и дата договора:</span>{" "}
                {document.contract_number} от{" "}
                {formatDate(document.contract_date)}
              </p>
            </div>

            {/* Дата обновления */}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="flex-shrink-0 w-4 h-4 mr-2" />
              <span>Дата обновления: {formatDate(document.doc_date)}</span>
            </div>

            {/* Информация о контрагенте */}
            <div className="p-4 space-y-3 rounded-lg bg-gray-50">
              <h4 className="text-sm font-semibold text-gray-900">
                Контрагент
              </h4>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-800">
                  {document.partnerCompany}
                </p>
                <p className="text-xs text-gray-500">
                  ИНН: {document.partnerTin}
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка - Финансы и действия */}
          <div className="space-y-4">
            {/* Финансовая информация */}
            <div className="p-4 rounded-lg bg-blue-50">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Стоимость
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Стоимость поставки:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatMoney(document.total_delivery_sum)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Сумма НДС:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatMoney(document.total_vat_sum)}
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      Стоимость с НДС:
                    </span>
                    <span className="text-base font-bold text-blue-600">
                      {formatMoney(document.total_sum)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка подписания */}
            <SignDocument documentId={document.doc_id} disabled={isDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};
