import { MyButton } from "@shared/ui";
import { ExternalLink } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface OrganizationInviteLinkProps {
  inviteUrl?: string;
  className?: string;
}

export const OrganizationInviteLink: FC<OrganizationInviteLinkProps> = ({
  inviteUrl,
  className,
}) => {
  const { t } = useTranslation();
  const url = inviteUrl?.trim();

  const handleOpen = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <MyButton
      type="button"
      className={`flex items-center justify-center gap-2 w-full ${className ?? ""}`}
      onClick={handleOpen}
      disabled={!url}
    >
      <ExternalLink size={18} />
      {t("profile.user_block.organization_data.invite_link")}
    </MyButton>
  );
};
