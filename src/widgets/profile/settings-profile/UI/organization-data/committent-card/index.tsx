import {
  ENUM_ORGANIZATION_STATUS,
  IGetMyOrganizationResponse,
  ORGANIZATION_STATUS_LIST,
} from "@entities/organization";
import { OrganizationInviteLink } from "@features/organization";
import { cn } from "@shared/ui";
import { User } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ICommittentCardProps {
  organization: IGetMyOrganizationResponse;
}

export const CommittentCard: FC<ICommittentCardProps> = ({ organization }) => {
  const { t } = useTranslation();

  const statusLabel =
    ORGANIZATION_STATUS_LIST.find((item) => item.status === organization.status)
      ?.label || "";

  const isApproved = organization.status === ENUM_ORGANIZATION_STATUS.ACTIVE;

  return (
    <div className="grid grid-flow-row gap-[30px] max-sm:gap-5">
      <div className="grid grid-flow-row gap-2">
        <p className="text-[#4d37b3] text-sm font-semibold leading-none">
          {t("organization.login.self_employed.header.brand")}
        </p>
        <div className="grid grid-cols-[max-content,1fr] gap-3 items-center">
          <div className="p-2 rounded-lg bg-[#4d37b3]/10">
            <User size={20} className="text-[#4d37b3]" />
          </div>
          <div className="grid gap-1">
            <p className="text-black text-base font-semibold leading-none max-sm:text-xs">
              {t("profile.user_block.committent_card.title")}
            </p>
            <p className="text-[#757575] text-xs font-medium leading-[1.4]">
              {t("profile.user_block.committent_card.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row gap-2 p-4 rounded-xl border border-[#4d37b3]/20 bg-[#4d37b3]/5">
        <p className="text-[#374151] text-xs font-medium leading-[1.4]">
          {organization.self_employed
            ? "Всё отлично! Вы зарегистрированы."
            : "Необходимо зарегистрироваться в Didox"}
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-x-2.5 gap-y-[25px] max-sm:flex max-sm:flex-col max-sm:gap-5">
        <div className="grid grid-flow-row gap-[15px] max-sm:gap-2.5">
          <span className="text-[#757575] text-xs font-medium leading-none max-sm:text-[10px]">
            {t("profile.user_block.organization_data.fields.type")}
          </span>
          <span className="text-black text-xs font-medium leading-none max-sm:text-[10px]">
            {t(
              "profile.user_block.organization_data.organization_types.self_employed",
            )}
          </span>
        </div>

        <div className="grid grid-flow-row gap-[15px] max-sm:gap-2.5">
          <span className="text-[#757575] text-xs font-medium leading-none max-sm:text-[10px]">
            {t("profile.user_block.organization_data.fields.pinfl")}
          </span>
          <span className="text-black text-xs font-medium leading-none max-sm:text-[10px]">
            {organization.PINFL || "—"}
          </span>
        </div>

        <div className="grid grid-flow-row gap-[15px] max-sm:gap-2.5">
          <span className="text-[#757575] text-xs font-medium leading-none max-sm:text-[10px]">
            {t("profile.user_block.organization_data.fields.status")}
          </span>
          <span
            className={cn(
              "text-xs font-medium leading-none max-sm:text-[10px]",
              isApproved ? "text-[#48d23c]" : "text-[#ff0000]",
            )}
          >
            {statusLabel ? t(statusLabel) : "—"}
          </span>
        </div>

        {!organization.self_employed && !!organization.invite_url && (
          <div className="grid gap-[15px] max-sm:gap-2.5 col-span-full w-full">
            <OrganizationInviteLink inviteUrl={organization.invite_url} />
          </div>
        )}
      </div>
    </div>
  );
};
