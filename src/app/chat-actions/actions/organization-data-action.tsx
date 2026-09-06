import { ENUM_PATHS } from "@shared/routing";
import { OrganizationDataForm } from "@widgets/profile/settings-profile/UI";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

/**
 * The profile page's organization form, reused as-is — it takes no props, reads
 * its own data and has no viewport branching of its own.
 */
const OrganizationDataAction = () => {
  const { t } = useTranslation();
  return (
    <ActionShell
      title={t("chat_actions.organization.title", "Данные организации")}
      subtitle={t(
        "chat_actions.organization.subtitle",
        "Реквизиты для счетов и документов",
      )}
      cta={{ to: ENUM_PATHS.PROFILE }}
    >
      <OrganizationDataForm />
    </ActionShell>
  );
};

export default OrganizationDataAction;
