import { FC, ReactNode } from "react";
import styles from "./action-list.module.scss";

/**
 * Small building blocks every list-shaped chat action reuses.
 *
 * They carry no viewport breakpoints at all — the only responsive rule lives in
 * the stylesheet as a `@container chat-stage` query, so a panel that is 340px
 * wide lays out as 340px even on a 1920px screen.
 */

export interface IStatTile {
  label: string;
  value: ReactNode;
}

export const ActionStats: FC<{ items: IStatTile[] }> = ({ items }) => (
  <div className={styles.stats}>
    {items.map(({ label, value }) => (
      <div key={label} className={styles.tile}>
        <span className={styles.tileLabel}>{label}</span>
        <span className={styles.tileValue}>{value}</span>
      </div>
    ))}
  </div>
);

export const ActionList: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.list}>{children}</div>
);

interface IActionRowProps {
  title: string;
  subtitle?: string;
  /** Leading visual — avatar, platform icon, status dot. */
  leading?: ReactNode;
  /** Trailing value — amount, count, status. */
  meta?: ReactNode;
  onClick?: () => void;
}

export const ActionRow: FC<IActionRowProps> = ({
  title,
  subtitle,
  leading,
  meta,
  onClick,
}) => {
  const content = (
    <>
      {leading ?? <span />}
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{title}</span>
        {subtitle && <span className={styles.rowSubtitle}>{subtitle}</span>}
      </span>
      {meta ? <span className={styles.rowMeta}>{meta}</span> : <span />}
    </>
  );

  if (!onClick) return <div className={styles.row}>{content}</div>;

  return (
    <button type="button" onClick={onClick} className={styles.row}>
      {content}
    </button>
  );
};
