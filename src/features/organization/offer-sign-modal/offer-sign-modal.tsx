import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";
import { SignDocument } from "@features/documents";
import { useAppSelector } from "@shared/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  MyButton,
} from "@shared/ui";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  FilePen,
  FileText,
  Key,
  Lock,
} from "lucide-react";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface OfferSignModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  haveTrigger?: boolean;
}

export const OfferSignModal: FC<OfferSignModalProps> = ({
  open = false,
  haveTrigger = true,
  setOpen = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);
  const { data: organization } = useGetOrganizationQuery();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  const requirements = t("organization.offer_sign.requirements", {
    returnObjects: true,
  }) as { item: string }[];

  if (organization?.status === ENUM_ORGANIZATION_STATUS.ACTIVE) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {haveTrigger && (
        <DialogTrigger asChild>
          <MyButton
            {...props}
            type="button"
            className="flex items-center justify-center gap-2 w-none"
          >
            <FilePen size={18} />
            {t("organization.offer_sign.buttons.sign")}
          </MyButton>
        </DialogTrigger>
      )}

      <DialogContent className="overflow-hidden frame ">
        {/* Заголовок с иконкой */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-[var(--Personal-colors-main)]" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {t("organization.offer_sign.title")}
          </DialogTitle>
        </div>

        {/* Описание */}
        <DialogDescription className="leading-relaxed text-gray-600">
          {t("organization.offer_sign.description")}:
        </DialogDescription>

        {/* Требования */}
        <div className="my-2 space-y-3">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-1 bg-green-100 rounded-full mt-0.5">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm leading-relaxed text-gray-700">
                {requirement?.item}
              </span>
            </div>
          ))}
        </div>

        {/* Важное уведомление */}
        <div className="flex items-start gap-2 p-3 my-2 border rounded-lg bg-amber-50 border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            {t("organization.offer_sign.warning")}
          </p>
        </div>

        {/* Кнопка подписания */}
        {isAuthEcp ? (
          <SignDocument documentId={organization?.id || ""} />
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
      </DialogContent>
    </Dialog>
  );
};
