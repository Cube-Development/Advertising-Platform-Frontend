import { AlertCircle, Inbox } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

/**
 * Placeholder / empty / error states for chat action panels.
 *
 * All three are deliberately layout-neutral: a plain block that fills the width
 * it is given, so they read correctly in both the ~320px INLINE panel and the
 * ~900px SIDE panel without a single breakpoint.
 *
 * Strings use `t(key, defaultValue)` so the panels are fully readable before
 * the keys exist in the locale files under public/locales.
 */

export const ActionSkeleton: FC<{ rows?: number }> = ({ rows = 3 }) => (
  <div className="flex w-full flex-col gap-3 p-4" aria-busy="true">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="flex w-full animate-pulse flex-col gap-2 rounded-2xl border border-gray-200 p-3"
      >
        <div className="h-3 w-1/2 rounded bg-skeleton-dark" />
        <div className="h-3 w-full rounded bg-skeleton-dark" />
        <div className="h-3 w-2/3 rounded bg-skeleton-dark" />
      </div>
    ))}
  </div>
);

interface IActionMessageProps {
  icon: ReactNode;
  title: string;
  text?: string;
  action?: ReactNode;
}

const ActionMessage: FC<IActionMessageProps> = ({
  icon,
  title,
  text,
  action,
}) => (
  <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
    <div className="text-gray-400">{icon}</div>
    <p className="text-sm font-semibold text-gray-900">{title}</p>
    {text && <p className="text-xs leading-4 text-gray-500">{text}</p>}
    {action}
  </div>
);

export const ActionEmpty: FC<{
  title?: string;
  text?: string;
  action?: ReactNode;
}> = ({ title, text, action }) => {
  const { t } = useTranslation();
  return (
    <ActionMessage
      icon={<Inbox className="size-7" />}
      title={title ?? t("chat_actions.empty.title", "Пока пусто")}
      text={text}
      action={action}
    />
  );
};

/**
 * Never reloads the page. Page-level chunk loaders in this app do
 * `window.location.reload()` on failure; doing that from a panel would throw
 * away whatever the user was doing on the page underneath.
 */
export const ActionError: FC<{ onRetry?: () => void; text?: string }> = ({
  onRetry,
  text,
}) => {
  const { t } = useTranslation();
  return (
    <ActionMessage
      icon={<AlertCircle className="size-7 text-red-400" />}
      title={t("chat_actions.error.title", "Не удалось загрузить")}
      text={text ?? t("chat_actions.error.text", "Попробуйте ещё раз")}
      action={
        onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            {t("chat_actions.error.retry", "Повторить")}
          </button>
        ) : undefined
      }
    />
  );
};

/** Rendered when an action's own lazy chunk fails to load. */
export const ChunkFailedAction: FC = () => <ActionError />;
