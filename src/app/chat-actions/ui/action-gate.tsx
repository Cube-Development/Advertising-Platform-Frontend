import { ENUM_ROLES, ROLES_TYPES_LIST } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { Lock, UserCog } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  getChatActionDenial,
  IChatActionAccess,
} from "../model/action-visibility";
import { useChatActionNav } from "./use-chat-action-nav";

interface IActionGateProps extends IChatActionAccess {
  children: ReactNode;
}

const GateCard: FC<{
  icon: ReactNode;
  title: string;
  text: string;
  ctaLabel: string;
  ctaTo: string;
}> = ({ icon, title, text, ctaLabel, ctaTo }) => {
  const { go } = useChatActionNav();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
      <div className="text-gray-400">{icon}</div>
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-xs leading-4 text-gray-500">{text}</p>
      <button
        type="button"
        onClick={() => go(ctaTo)}
        className="mt-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
      >
        {ctaLabel}
      </button>
    </div>
  );
};

/**
 * Auth / role guard for a chat action's body.
 *
 * The registry already filters actions the current user cannot use, so this is
 * defence in depth: the role can change (or a session can expire) while a panel
 * is open. It never redirects — it renders an inline card with a CTA the user
 * has to press, so the page underneath is never moved without a gesture.
 *
 * Deliberately does not open `LoginModal`: Radix portals to `document.body`,
 * which paints *behind* the popover panel.
 */
export const ActionGate: FC<IActionGateProps> = ({ auth, roles, children }) => {
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const denial = getChatActionDenial({ auth, roles }, isAuth, role);

  if (denial === "auth") {
    return (
      <GateCard
        icon={<Lock className="size-7" />}
        title={t("chat_actions.gate.auth.title", "Нужен вход в аккаунт")}
        text={t(
          "chat_actions.gate.auth.text",
          "Войдите, чтобы посмотреть эти данные",
        )}
        ctaLabel={t("chat_actions.gate.auth.cta", "Войти")}
        ctaTo={ENUM_PATHS.LOGIN}
      />
    );
  }

  if (denial === "only-public") {
    return (
      <GateCard
        icon={<UserCog className="size-7" />}
        title={t("chat_actions.gate.authed.title", "Вы уже вошли")}
        text={t(
          "chat_actions.gate.authed.text",
          "Этот раздел доступен только незалогиненным пользователям",
        )}
        ctaLabel={t("chat_actions.gate.authed.cta", "В профиль")}
        ctaTo={ENUM_PATHS.PROFILE}
      />
    );
  }

  if (denial === "role") {
    const allowed = (roles ?? [])
      .map((r) => ROLES_TYPES_LIST.find((item) => item.type === r)?.name)
      .filter(Boolean)
      .map((key) => t(key as string))
      .join(", ");

    return (
      <GateCard
        icon={<UserCog className="size-7" />}
        title={t("chat_actions.gate.role.title", "Другой режим работы")}
        text={t("chat_actions.gate.role.text", {
          defaultValue: "Раздел доступен в режиме: {{roles}}",
          roles: allowed,
        })}
        ctaLabel={t("chat_actions.gate.role.cta", "Сменить режим")}
        ctaTo={
          role === ENUM_ROLES.BLOGGER
            ? ENUM_PATHS.MAIN
            : ENUM_PATHS.MAIN_BLOGGER
        }
      />
    );
  }

  return <>{children}</>;
};
