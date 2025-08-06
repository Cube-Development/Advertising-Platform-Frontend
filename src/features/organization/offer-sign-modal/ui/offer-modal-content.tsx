import { useCheckOfferSignedMutation } from "@entities/organization";
import { offerSign } from "@entities/user";
import { SignDocument } from "@features/documents";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  FileText,
  Key,
  Lock,
  Shield,
} from "lucide-react";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

interface IOfferModalContentProps {
  offer_id: string;
}

export const OfferModalContent: FC<IOfferModalContentProps> = ({
  offer_id,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuthEcp, isOfferSign } = useAppSelector((state) => state.user);
  const requirements = t("organization.offer_sign.requirements", {
    returnObjects: true,
  }) as { item: string }[];
  const [checkSign, { isLoading }] = useCheckOfferSignedMutation();
  const dispatch = useAppDispatch();

  const handleSign = async () => {
    await checkSign()
      .unwrap()
      .then(() => {
        // Шаг 6.1: Указываем что оферта подписана
        dispatch(offerSign());
        toast({
          variant: "warning",
          title: t("toasts.organization.offer_sign.success"),
        });
      })
      .catch(() => {
        toast({
          variant: "warning",
          title: t("toasts.organization.offer_sign.need"),
        });
      });
  };

  return (
    <div className="grid grid-flow-row gap-1 p-5 md:gap-3">
      {/* Заголовок с иконкой */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-5 h-5 text-[var(--Personal-colors-main)]" />
        </div>
        <p className="py-2.5 font-semibold text-gray-900 md:text-xl text-md">
          {t("organization.offer_sign.title")}
        </p>
      </div>

      {/* Описание */}
      <span className="text-sm leading-relaxed text-gray-600 md:text-lg">
        <Trans
          i18nKey="organization.offer_sign.description"
          components={{
            1: (
              <a
                href={ENUM_PATHS.PUBLIC_OFFER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              />
            ),
          }}
        />
      </span>

      {/* Требования */}
      <div className="my-2 space-y-1 md:space-y-3">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-1 bg-green-100 rounded-full mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-xs leading-relaxed text-gray-700 md:text-sm">
              {requirement?.item}
            </span>
          </div>
        ))}
      </div>

      {/* Важное уведомление */}
      <div className="flex items-center gap-2 p-3 my-2 border rounded-lg bg-amber-50 border-amber-200">
        <AlertCircle className="flex-shrink-0 w-4 h-4 text-amber-600" />
        <p className="text-xs text-amber-800">
          {t("organization.offer_sign.warning")}
        </p>
      </div>

      {/* Кнопка подписания */}
      {isAuthEcp && !isOfferSign ? (
        <SignDocument
          documentId={offer_id}
          owner={0}
          onClick={handleSign}
          isLoading={isLoading}
        />
      ) : isAuthEcp && isOfferSign ? (
        <div>
          {/* Разметка для авторизованного пользователя */}
          <div className="p-6 overflow-hidden border-2 border-green-200 border-dashed rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-center">
              {/* Главная иконка */}
              <div className="inline-flex p-3 mb-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>

              {/* Заголовок */}
              <h3 className="mb-2 text-base font-semibold text-green-900">
                {t("organization.offer_sign.authorization_success.title")}
              </h3>

              {/* Основное сообщение */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {t(
                      "organization.offer_sign.authorization_success.subtitle",
                    )}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-green-700">
                  {t(
                    "organization.offer_sign.authorization_success.description",
                  )}
                </p>
              </div>

              {/* Информация о статусе */}
              <div className="grid grid-cols-[max-content,1fr] items-center gap-1.5 px-3 py-1.5 bg-green-100/50 rounded-full border border-green-200 w-full">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-green-700">
                    {t("organization.offer_sign.authorization_success.status")}
                  </span>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-green-700" />
                    <span className="text-xs font-semibold text-green-700">
                      {t(
                        "organization.offer_sign.authorization_success.active",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Декоративная рамка */}
          <div className="p-6 overflow-hidden border-2 border-red-200 border-dashed rounded-xl bg-gradient-to-br from-red-50 to-orange-50">
            <div className="text-center ">
              {/* Главная иконка */}
              <div className="inline-flex p-3 mb-3 bg-red-100 rounded-full">
                <Lock className="w-6 h-6 text-red-600" />
              </div>

              {/* Заголовок */}
              <h3 className="mb-2 text-base font-semibold text-red-900">
                {t("organization.offer_sign.authorization_required.title")}
              </h3>

              {/* Основное сообщение */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Key className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {t(
                      "organization.offer_sign.authorization_required.subtitle",
                    )}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-red-700">
                  {t(
                    "organization.offer_sign.authorization_required.description",
                  )}
                </p>
              </div>

              {/* Подсказка */}
              <div className="grid grid-cols-[max-content,1fr] items-center gap-1.5 px-3 py-1.5 bg-red-100/50 rounded-full border border-red-200 w-full">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-red-700">
                    {t(
                      "organization.offer_sign.authorization_required.section",
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-red-700" />
                    <span className="text-xs font-semibold text-red-700">
                      {t(
                        "organization.offer_sign.authorization_required.organization_data",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="text-xs text-center text-gray-500">
        {t("organization.offer_sign.legal_notice")}
      </div>
    </div>
  );
};
