import { useCopyLink } from "@shared/hooks";
import { MyButton } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ENUM_VIEWER_ROLES,
  IGetProjectAccessCodesRes,
} from "@entities/project";
import { ENUM_PATHS } from "@shared/routing";
import { CheckCheck, Link } from "lucide-react";

interface ShareProjectLinkProps {
  project_id: string;
  projectAccessCodes?: IGetProjectAccessCodesRes;
}

export const ShareProjectLink: FC<ShareProjectLinkProps> = ({
  project_id,
  projectAccessCodes,
}) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();

  const [copiedRole, setCopiedRole] = useState<ENUM_VIEWER_ROLES | null>(null);
  const roles = projectAccessCodes?.access?.map((access) => access.role) || [];

  const handleOnClick = (role: ENUM_VIEWER_ROLES) => {
    if (projectAccessCodes?.access?.length === 0) return;
    const permissionCode = projectAccessCodes?.access?.find(
      (access) => access.role === role,
    )?.code;
    const projectUrl = `${window.location.origin}${ENUM_PATHS.PROJECT_PAGE.replace(":project_id", project_id)}?permission=${permissionCode}`;
    copyLink(projectUrl);
    setCopiedRole(role);
    setTimeout(() => setCopiedRole(null), 1000);
  };

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 md:gap-4 gap-2">
      {roles.map((role) => (
        <MyButton
          buttons_type={copiedRole === role ? "button__green" : "button__white"}
          className="md:!text-sm !text-xs flex items-center justify-center w-!full p-2 !text-start !min-h-10 !h-auto [&>svg]:size-5 [&>svg]:stroke-[2px] !font-medium md:shadow-none shadow-xl"
          onClick={() => handleOnClick(role)}
        >
          {copiedRole === role ? (
            <>
              <CheckCheck />
              {t("orders_manager.project_page_btn.share_project_link.copied")}
            </>
          ) : (
            <>
              <Link />
              {role === ENUM_VIEWER_ROLES.CUSTOMER
                ? t(
                    "orders_manager.project_page_btn.share_project_link.customer",
                  )
                : t(
                    "orders_manager.project_page_btn.share_project_link.publisher",
                  )}
            </>
          )}
        </MyButton>
      ))}
    </div>
  );
};
