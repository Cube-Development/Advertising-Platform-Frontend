import {
  ACCOUNTING_SIGNATURE_LIST,
  ACCOUNTING_STATUS_LIST,
  ADMIN_ACCOUNTING_STATUS,
  ADMIN_ACCOUNTING_TYPE,
} from "@entities/admin/config";
import { IAdminAccountingData } from "@entities/admin/types";
import { formatMoney } from "@shared/utils";
import { ArrowUpDown, Calendar, Tag, Wallet } from "lucide-react";
import { ButtonHTMLAttributes, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface IAccountingCardProps {
  transaction: IAdminAccountingData;
  signAccounting: FC<
    {
      documentId: string;
      userId: string;
      batchId: string;
      transaction_type: ADMIN_ACCOUNTING_TYPE;
    } & ButtonHTMLAttributes<HTMLButtonElement>
  >;
}

export const AccountingCard: FC<IAccountingCardProps> = ({
  transaction,
  signAccounting: SignAccounting,
}) => {
  const { t } = useTranslation();
  const isDisabled = transaction?.status === ADMIN_ACCOUNTING_STATUS.COMPLETED;
  const statusInfo = useMemo(() => {
    return ACCOUNTING_SIGNATURE_LIST?.find(
      (item) => item.status === transaction?.status,
    )!;
  }, [transaction?.status]);

  const walletInfo = useMemo(() => {
    return ACCOUNTING_STATUS_LIST?.find(
      (item) =>
        item?.wallet === transaction?.wallet_type &&
        item?.type === transaction?.type,
    )!;
  }, [transaction?.wallet_type, transaction?.type]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="relative mb-4 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      <div
        className={`grid grid-cols-[max-content,1fr] items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo?.color} absolute top-4 left-4 right-auto sm:left-auto sm:right-4`}
      >
        <statusInfo.icon size={16} />
        <span className="ml-1 truncate">{t(statusInfo?.label)}</span>
      </div>
      <div className="p-6">
        {/* Заголовок с типом документа и статусом */}
        <div className="flex items-center justify-between mt-8 mb-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Tag className="flex-shrink-0 w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium tracking-wide text-blue-600 uppercase truncate md:text-sm">
              {t(walletInfo?.label)}
            </span>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Левая колонка - Основная информация */}
          <div className="space-y-4">
            {/* Номер и дата договора */}
            <div>
              <p className="grid text-sm text-[var(--Personal-colors-black)] grid-cols-[max-content,1fr] gap-2 items-center ">
                <span className="font-medium ">
                  {t("admin_panel.accounting.card.transaction_id")}:
                </span>
                <span
                  onClick={() => handleCopyLink(transaction?.id)}
                  className="text-blue-500 truncate cursor-pointer"
                >
                  {transaction?.id}
                </span>
              </p>
            </div>

            {/* Дата обновления */}
            <div className="flex items-center text-sm text-[var(--Personal-colors-black)]">
              <Calendar className="flex-shrink-0 w-4 h-4 mr-2" />
              <p className="flex items-center justify-between gap-2 text-sm font-medium">
                <span>{t("admin_panel.accounting.card.created_date")}:</span>
                <span>
                  {transaction?.created_time} / {transaction?.created_date}
                </span>
              </p>
            </div>

            {/* Информация о контрагенте */}
            <div className="p-4 space-y-3 rounded-lg bg-gray-50">
              <h4 className="text-sm font-semibold text-[var(--Personal-colors-black)]">
                {t("admin_panel.accounting.card.user")}
              </h4>
              <div className="space-y-1">
                <p className="flex items-center justify-between gap-2 text-sm font-semibold">
                  <span className=" text-[var(--Personal-colors-black)]">
                    {t("admin_panel.accounting.card.tin")}:
                  </span>
                  <span className=" text-[var(--Personal-colors-light-black)]">
                    {transaction?.TIN}
                  </span>
                </p>
                <p className="text-sm font-semibold text-[var(--Personal-colors-black)] flex items-center gap-2 justify-between">
                  <span className=" text-[var(--Personal-colors-black)]">
                    {t("admin_panel.accounting.card.pinfl")}:
                  </span>
                  <span className=" text-[var(--Personal-colors-light-black)]">
                    {transaction?.PINFL}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка - Финансы и действия */}
          <div className="space-y-4">
            {/* Финансовая информация */}
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center justify-start gap-2">
                    <Wallet size={16} />
                    <span className="text-sm font-semibold text-[var(--Personal-colors-black)]">
                      {t("admin_panel.accounting.card.wallet_type")}:
                    </span>
                  </div>
                  <span className="text-sm text-[var(--Personal-colors-light-black)] font-semibold ">
                    {t(walletInfo?.wallet_label || "")}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center justify-start gap-2">
                    <ArrowUpDown size={16} />
                    <span className="text-sm font-semibold text-[var(--Personal-colors-black)] ">
                      {t("admin_panel.accounting.card.transaction_type")}:
                    </span>
                  </div>
                  <span className="text-sm text-[var(--Personal-colors-light-black)] font-semibold ">
                    {t(walletInfo?.type_label || "")}
                  </span>
                </div>
                <div className="border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--Personal-colors-black)]">
                      {t("admin_panel.accounting.card.amount")}:
                    </span>
                    <span className="text-base font-bold text-blue-600">
                      {formatMoney(transaction?.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <SignAccounting
              documentId={transaction?.doc_id}
              userId={transaction?.user_id}
              batchId={transaction?.id}
              transaction_type={transaction?.type}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
