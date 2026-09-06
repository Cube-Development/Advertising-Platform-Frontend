import {
  ENUM_ROLES,
  ROLES_TYPES_LIST,
  toggleRole,
  USER_ROLES,
  useUpdateRoleMutation,
} from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { Megaphone, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";
import { useChatActionNav } from "../ui/use-chat-action-nav";

/**
 * Switch between the advertiser and blogger sides of the app.
 *
 * Mirrors `widgets/layouts/components/sidebar/UI/switcher.tsx`: flip the Redux
 * role (which also writes the cookie) and persist it server-side when signed
 * in, then move to that side's home page.
 *
 * Switching role changes which actions are registered, so the plugin
 * re-broadcasts the catalogue and this panel unmounts itself.
 */
const RoleSwitchAction = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { go } = useChatActionNav();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [updateRole] = useUpdateRoleMutation();

  const isBlogger = role === ENUM_ROLES.BLOGGER;
  const toRole = isBlogger ? ENUM_ROLES.ADVERTISER : ENUM_ROLES.BLOGGER;
  const toPage = isBlogger ? ENUM_PATHS.MAIN : ENUM_PATHS.MAIN_BLOGGER;

  const currentName = t(
    ROLES_TYPES_LIST.find((item) => item.type === role)?.name ?? "",
  );
  const nextName = t(
    ROLES_TYPES_LIST.find((item) => item.type === toRole)?.name ?? "",
  );

  const handleSwitch = () => {
    if (USER_ROLES.includes(role)) {
      dispatch(toggleRole(toRole));
      if (isAuth) updateRole({ role: toRole });
    }
    go(toPage);
  };

  return (
    <ActionShell
      title={t("chat_actions.role_switch.title", "Режим работы")}
      subtitle={t("chat_actions.role_switch.subtitle", {
        defaultValue: "Сейчас вы в режиме: {{role}}",
        role: currentName,
      })}
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[auto,1fr] items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3">
          <span className="text-blue-600">
            {isBlogger ? (
              <Radio className="size-5" />
            ) : (
              <Megaphone className="size-5" />
            )}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-xs font-semibold text-gray-900">
              {currentName}
            </span>
            <span className="text-[11px] leading-4 text-gray-500">
              {isBlogger
                ? t(
                    "chat_actions.role_switch.blogger_hint",
                    "Свои каналы, входящие предложения и заработок",
                  )
                : t(
                    "chat_actions.role_switch.advertiser_hint",
                    "Каталог каналов, корзина и рекламные кампании",
                  )}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSwitch}
          disabled={!USER_ROLES.includes(role)}
          className="w-full rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-default disabled:bg-gray-300"
        >
          {t("chat_actions.role_switch.cta", {
            defaultValue: "Перейти в режим: {{role}}",
            role: nextName,
          })}
        </button>
      </div>
    </ActionShell>
  );
};

export default RoleSwitchAction;
