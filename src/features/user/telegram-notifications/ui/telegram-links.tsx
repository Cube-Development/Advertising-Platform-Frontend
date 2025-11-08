import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { useCopyLink } from "@shared/hooks";
import {
  ENUM_VIEWER_ROLES,
  IGetProjectAccessCodesRes,
  useGetTelegramNotificationLinkQuery,
  useGetTelegramRoleNotificationLinkQuery,
} from "@entities/project";
import { CheckCheck, Link as LinkIcon } from "lucide-react";
import { TelegramIcon } from "@shared/assets";

interface ITelegramLinksBlockProps {
  project_id: string;
  projectAccessCodes?: IGetProjectAccessCodesRes;
}

export const TelegramLinksBlock: FC<ITelegramLinksBlockProps> = ({
  project_id,
  projectAccessCodes,
}) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();
  const [copiedRole, setCopiedRole] = useState<ENUM_VIEWER_ROLES | null>(null);
  const roles = projectAccessCodes?.access?.map((access) => access.role) || [];

  const { data: telegramRoleNotificationLinkForManager } =
    useGetTelegramNotificationLinkQuery();
  const { data: telegramRoleNotificationLinkForCustomer } =
    useGetTelegramRoleNotificationLinkQuery(
      {
        project_id: project_id,
        code:
          projectAccessCodes?.access?.find(
            (access) => access.role === ENUM_VIEWER_ROLES.CUSTOMER,
          )?.code || 0,
        subrole: ENUM_VIEWER_ROLES.CUSTOMER,
      },
      {
        skip: !projectAccessCodes?.access?.find(
          (access) => access.role === ENUM_VIEWER_ROLES.CUSTOMER,
        ),
      },
    );
  const { data: telegramRoleNotificationLinkForPublisher } =
    useGetTelegramRoleNotificationLinkQuery(
      {
        project_id: project_id,
        code:
          projectAccessCodes?.access?.find(
            (access) => access.role === ENUM_VIEWER_ROLES.PUBLISHER,
          )?.code || 0,
        subrole: ENUM_VIEWER_ROLES.PUBLISHER,
      },
      {
        skip: !projectAccessCodes?.access?.find(
          (access) => access.role === ENUM_VIEWER_ROLES.PUBLISHER,
        ),
      },
    );

  const handleOnClick = (role: ENUM_VIEWER_ROLES) => {
    copyLink(
      role === ENUM_VIEWER_ROLES.CUSTOMER
        ? telegramRoleNotificationLinkForCustomer?.deeplink_url
        : telegramRoleNotificationLinkForPublisher?.deeplink_url,
    );
    setCopiedRole(role);
    setTimeout(() => setCopiedRole(null), 1000);
  };

  return (
    <div className="grid grid-flow-row gap-2">
      <Link
        to={telegramRoleNotificationLinkForManager?.deeplink_url || ""}
        target="_blank"
      >
        <MyButton
          buttons_type="button__white"
          className="md:!text-sm !text-xs flex items-center justify-center p-3 !text-start !h-full [&>svg]:size-5 [&>svg]:stroke-[1.5px] !font-medium shadow-xl"
        >
          <TelegramIcon />{" "}
          {t(
            "orders_manager.project_page_btn.notification.notification_link_button",
          )}
        </MyButton>
      </Link>
      {roles.map((role) => (
        <MyButton
          buttons_type={copiedRole === role ? "button__green" : "button__white"}
          className="md:!text-sm !text-xs flex items-center justify-center w-!full p-2 !text-start !min-h-10 !h-auto [&>svg]:size-5 [&>svg]:stroke-[2px] [&>svg]:min-w-[20px] !font-medium shadow-xl"
          onClick={() => handleOnClick(role)}
        >
          {copiedRole === role ? (
            <>
              <CheckCheck />
              {t("orders_manager.project_page_btn.share_project_link.copied")}
            </>
          ) : (
            <>
              <LinkIcon />
              {role === ENUM_VIEWER_ROLES.CUSTOMER
                ? t(
                    "orders_manager.project_page_btn.notification.notification_link_for_customer",
                  )
                : t(
                    "orders_manager.project_page_btn.notification.notification_link_for_publisher",
                  )}
            </>
          )}
        </MyButton>
      ))}
    </div>
  );
};
