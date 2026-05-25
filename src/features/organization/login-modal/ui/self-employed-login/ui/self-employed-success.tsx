import { OrganizationInviteLink } from "@features/organization";
import { CheckCircle2 } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface SelfEmployedSuccessProps {
  inviteUrl?: string;
}

export const SelfEmployedSuccess: FC<SelfEmployedSuccessProps> = ({
  inviteUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 px-5 py-8 pb-10 content-start">
      <div className="grid gap-3 rounded-xl border border-[#4d37b3]/20 bg-[#4d37b3]/5 p-4">
        <div className="grid grid-cols-[max-content,1fr] gap-3 items-center">
          <div className="p-2 rounded-lg bg-[#4d37b3]/10">
            <CheckCircle2 size={22} className="text-[#4d37b3]" />
          </div>
          <p className="text-sm font-semibold text-[#4d37b3]">
            {t("organization.login.self_employed.success.banner.badge")}
          </p>
        </div>
        <p className="text-sm text-gray-700">
          {t("organization.login.self_employed.success.banner.text")}
        </p>
      </div>

      <div className="grid gap-2 text-center">
        <p className="text-2xl font-semibold text-gray-900">
          {t("organization.login.self_employed.success.title")}
        </p>
        <span className="text-sm text-gray-600">
          {t("organization.login.self_employed.success.description")}
        </span>
      </div>

      <p className="text-sm text-center text-gray-500">
        {t("organization.login.self_employed.success.action_hint")}
      </p>

      <OrganizationInviteLink inviteUrl={inviteUrl} />
    </div>
  );
};
