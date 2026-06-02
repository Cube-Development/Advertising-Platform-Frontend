import { cn } from "@shared/ui";
import { Button } from "@shared/ui/shadcn-ui";
import { CheckCircle2, Info, LucideIcon } from "lucide-react";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  REGISTRATION_TYPE_HINTS,
  REGISTRATION_TYPE_OPTIONS,
  RegistrationType,
} from "./model";

interface RegistrationTypeSelectProps {
  onContinue: (type: RegistrationType) => void;
}

export const RegistrationTypeSelect: FC<RegistrationTypeSelectProps> = ({
  onContinue,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<RegistrationType | null>(null);

  const hints = useMemo(
    () => (selected ? REGISTRATION_TYPE_HINTS[selected] : null),
    [selected],
  );

  const handleContinue = () => {
    if (!selected) return;
    onContinue(selected);
  };

  return (
    <div className="grid grid-rows-[max-content,1fr] h-full w-full">
      <div className="grid gap-1 bg-[#341F47] px-5 py-6">
        <p className="text-lg font-semibold text-white">
          {t("organization.login.registration_type.header.title")}
        </p>
        <p className="text-sm text-white/80">
          {t("organization.login.registration_type.header.subtitle")}
        </p>
      </div>

      <div className="grid gap-5 px-5 py-6">
        <div className="grid gap-5 content-start">
          <div className="grid gap-2 text-center">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              {t("organization.login.registration_type.title")}
            </p>
            <span className="text-sm text-gray-600">
              {t("organization.login.registration_type.description")}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {REGISTRATION_TYPE_OPTIONS.map((item) => (
              <TypeOption
                key={item.type}
                label={t(item.label)}
                description={t(item.description)}
                icon={item.icon}
                isActive={selected === item.type}
                onClick={() => setSelected(item.type)}
              />
            ))}
          </div>

          <div className="rounded-xl bg-[#F4F5F7] md:p-4 p-3">
            <div className="grid grid-cols-[max-content,1fr] gap-2 items-start">
              <Info size={18} className="text-[#4d37b3] shrink-0" />
              <p className="text-sm text-gray-700">
                {t("organization.login.registration_type.info.text")}
              </p>
            </div>
          </div>

          {hints && (
            <div className="grid gap-2 rounded-xl border border-[#4d37b3]/20 bg-[#4d37b3]/5 p-4">
              <p className="text-sm font-medium text-[#4d37b3]">
                {t("organization.login.registration_type.hints.title")}
              </p>
              <ul className="grid gap-2">
                {hints.map((key) => (
                  <li
                    key={key}
                    className="grid grid-cols-[max-content,1fr] gap-2 items-start text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-[#4d37b3] shrink-0"
                    />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="grid items-end mb-5">
          <Button
            type="button"
            variant="primary"
            size="xl"
            className="w-full"
            disabled={!selected}
            onClick={handleContinue}
          >
            {t("organization.login.registration_type.buttons.continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface TypeOptionProps {
  label: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

const TypeOption: FC<TypeOptionProps> = ({
  label,
  description,
  icon: Icon,
  isActive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full p-3 md:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left",
      isActive
        ? "border-[#4d37b3] bg-[#4d37b3]/5"
        : "border-gray-200 bg-white hover:border-gray-300",
    )}
  >
    <div className="grid grid-cols-[max-content,1fr] gap-3 items-start">
      <RoundCheckbox checked={isActive} />
      <div className="grid flex-1 min-w-0 gap-1">
        <div className="grid grid-cols-[1fr,max-content] items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              isActive ? "text-[#4d37b3]" : "text-gray-900",
            )}
          >
            {label}
          </span>
          <Icon
            size={22}
            className={isActive ? "text-[#4d37b3]" : "text-gray-400"}
          />
        </div>
        <p className="text-xs text-gray-500 text-left">{description}</p>
      </div>
    </div>
  </button>
);

const RoundCheckbox: FC<{ checked: boolean }> = ({ checked }) => (
  <div
    className={cn(
      "w-4 h-4 rounded-full border-2 grid items-center justify-center transition-all duration-200 shrink-0 self-center",
      checked ? "border-[#4d37b3] bg-[#4d37b3]" : "border-gray-300",
    )}
  >
    <div className="w-2 h-2 m-auto bg-white rounded-full" />
  </div>
);
