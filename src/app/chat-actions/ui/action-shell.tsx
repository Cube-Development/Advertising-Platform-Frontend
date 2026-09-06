import { ArrowUpRight } from "lucide-react";
import { FC, ReactNode, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { ActionEmpty, ActionError, ActionSkeleton } from "./action-states";
import styles from "./action-shell.module.scss";
import { useChatActionNav } from "./use-chat-action-nav";

export interface IActionCta {
  label?: string;
  /** Route in the app underneath — opened via `useChatActionNav().go`. */
  to: string;
  state?: unknown;
}

export interface IActionShellProps {
  title: string;
  subtitle?: string;
  /** Rendered at the top-right of the header (a badge, a count…). */
  headerSlot?: ReactNode;
  /**
   * Controls that must stay usable no matter what the body shows — a status
   * filter, a search box. Rendered above the body and never replaced by the
   * loading / error / empty branches, so a filter that returns nothing can
   * still be changed back.
   */
  toolbar?: ReactNode;
  /** Deep-link out of the panel into the full page. */
  cta?: IActionCta;
  /** Extra footer content, rendered left of the CTA. */
  footerSlot?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyText?: string;
  /** Skip the default `.content` padding (for full-bleed lists). */
  flush?: boolean;
  children: ReactNode;
}

/**
 * Frame every chat action panel shares: header, scrollable body, footer CTA.
 *
 * It owns the loading / error / empty branches so no individual action repeats
 * them, and it never falls back to a page reload on failure.
 */
export const ActionShell: FC<IActionShellProps> = ({
  title,
  subtitle,
  headerSlot,
  toolbar,
  cta,
  footerSlot,
  isLoading,
  isError,
  onRetry,
  isEmpty,
  emptyText,
  flush,
  children,
}) => {
  const { t } = useTranslation();
  const { go } = useChatActionNav();

  const body = isError ? (
    <ActionError onRetry={onRetry} />
  ) : isLoading ? (
    <ActionSkeleton />
  ) : isEmpty ? (
    <ActionEmpty text={emptyText} />
  ) : (
    <div className={flush ? undefined : styles.content}>
      <Suspense fallback={<ActionSkeleton />}>{children}</Suspense>
    </div>
  );

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="truncate text-sm font-semibold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs leading-4 text-gray-500">{subtitle}</p>
          )}
        </div>
        {headerSlot}
      </div>

      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}

      <div className={styles.body}>{body}</div>

      {(cta || footerSlot) && (
        <div className={styles.footer}>
          <div className="min-w-0 flex-1 text-xs text-gray-500">
            {footerSlot}
          </div>
          {cta && (
            <button
              type="button"
              onClick={() => go(cta.to, { state: cta.state })}
              className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              {cta.label ?? t("chat_actions.cta.open", "Открыть целиком")}
              <ArrowUpRight className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
