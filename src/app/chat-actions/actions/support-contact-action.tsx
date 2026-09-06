import { ENUM_ROLES } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { Mail, Phone, Send } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ActionShell } from "../ui/action-shell";

const ContactRow: FC<{
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}> = ({ icon, label, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="grid grid-cols-[auto,1fr] items-center gap-3 rounded-2xl border border-gray-200 p-3 transition-colors hover:border-blue-600"
  >
    <span className="text-blue-600">{icon}</span>
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-xs font-semibold text-gray-900">
        {value}
      </span>
      <span className="text-[11px] leading-4 text-gray-500">{label}</span>
    </span>
  </a>
);

/** Support contacts, pulled from the same strings the footer uses. */
const SupportContactAction = () => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);
  const isBlogger = role === ENUM_ROLES.BLOGGER;

  return (
    <ActionShell
      title={t("chat_actions.support.title", "Поддержка Blogix")}
      subtitle={t("chat_actions.support.subtitle", "Мы на связи круглосуточно")}
      cta={{
        to: ENUM_PATHS.FAQ,
        label: t("chat_actions.support.cta", "Частые вопросы"),
      }}
    >
      <div className="flex flex-col gap-2">
        <ContactRow
          icon={<Send className="size-4" />}
          value="@blogix_support"
          label={
            isBlogger
              ? t("footer.contacts.blogger_title")
              : t("footer.contacts.advertiser_title")
          }
          href={
            isBlogger
              ? "https://t.me/blogix_support_bloggers"
              : "https://t.me/blogix_support"
          }
        />
        <ContactRow
          icon={<Mail className="size-4" />}
          value="@blogix_support"
          label={t("footer.contacts.email_title")}
          href="https://t.me/blogix_support"
        />
        <ContactRow
          icon={<Phone className="size-4" />}
          value="+998 93 070 86 86"
          label={t("footer.contacts.cooperation_title")}
          href="tel:+998930708686"
        />
      </div>
    </ActionShell>
  );
};

export default SupportContactAction;
