import { ENUM_PATHS } from "@shared/routing";
import {
  ChangeNotificationsForm,
  ChangePasswordForm,
  UserDataForm,
} from "@widgets/profile/settings-profile/UI";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionTabs } from "../ui";
import { ActionShell } from "../ui/action-shell";

type TProfileTab = "data" | "password" | "notifications";

/**
 * Profile settings as tabs over the page's own forms.
 *
 * The page arranges these with `NavigationCard` and a viewport-driven two
 * column grid; here they are stacked behind a scrollable tab strip, which is
 * the only layout that works at both 340px and 900px without a breakpoint.
 */
const ProfileSettingsAction = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TProfileTab>("data");

  return (
    <ActionShell
      title={t("chat_actions.profile.title", "Настройки профиля")}
      subtitle={t(
        "chat_actions.profile.subtitle",
        "Личные данные, пароль и уведомления",
      )}
      cta={{ to: ENUM_PATHS.PROFILE }}
      toolbar={
        <ActionTabs
          value={tab}
          onChange={setTab}
          tabs={[
            {
              value: "data",
              label: t("chat_actions.profile.tab_data", "Данные"),
            },
            {
              value: "password",
              label: t("chat_actions.profile.tab_password", "Пароль"),
            },
            {
              value: "notifications",
              label: t("chat_actions.profile.tab_notifications", "Уведомления"),
            },
          ]}
        />
      }
    >
      <>
        {tab === "data" && <UserDataForm />}
        {tab === "password" && <ChangePasswordForm />}
        {tab === "notifications" && <ChangeNotificationsForm />}
      </>
    </ActionShell>
  );
};

export default ProfileSettingsAction;
