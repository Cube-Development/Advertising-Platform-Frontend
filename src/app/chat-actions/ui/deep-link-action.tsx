import { Check } from "lucide-react";
import { FC, ReactNode } from "react";
import { ActionShell } from "./action-shell";

interface IDeepLinkActionProps {
  title: string;
  subtitle?: string;
  /** Short "what you'll need / what happens" list. */
  bullets?: string[];
  /** Anything extra above the bullets — a live summary, a balance, a count. */
  preview?: ReactNode;
  ctaLabel?: string;
  /** Route in the app underneath. */
  to: string;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

/**
 * Panel for a flow too large to live inside a ~400px popover.
 *
 * The multi-step wizards (create order, add channel) and the filtered catalog
 * are thousands of lines of viewport-breakpointed layout with their own routing
 * and mount-time redirects. Rather than drag them into the panel, the AI shows
 * what the flow is and hands the user a single button into the real page.
 */
export const DeepLinkAction: FC<IDeepLinkActionProps> = ({
  title,
  subtitle,
  bullets,
  preview,
  ctaLabel,
  to,
  isLoading,
  isError,
  onRetry,
}) => (
  <ActionShell
    title={title}
    subtitle={subtitle}
    cta={{ to, label: ctaLabel }}
    isLoading={isLoading}
    isError={isError}
    onRetry={onRetry}
  >
    <div className="flex flex-col gap-3">
      {preview}
      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
              <span className="text-xs leading-4 text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </ActionShell>
);
