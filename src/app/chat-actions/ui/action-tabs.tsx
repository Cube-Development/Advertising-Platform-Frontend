import { FC } from "react";

export interface IActionTab<T extends string> {
  value: T;
  label: string;
}

interface IActionTabsProps<T extends string> {
  tabs: IActionTab<T>[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Status filter for a panel.
 *
 * A horizontally scrollable strip rather than the app's `BarFilter`, which
 * lays itself out against viewport breakpoints. Scrolling instead of wrapping
 * keeps the header height fixed, which matters in INLINE placement where the
 * plugin caps the whole panel at 50% of the chat window.
 */
export const ActionTabs = <T extends string>({
  tabs,
  value,
  onChange,
}: IActionTabsProps<T>) => (
  <div className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        type="button"
        onClick={() => onChange(tab.value)}
        className={
          "shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors " +
          (tab.value === value
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-300 text-gray-600 hover:border-blue-600")
        }
      >
        {tab.label}
      </button>
    ))}
  </div>
);

/** Non-generic alias so `ActionTabs` can be used without explicit type args. */
export const ActionTabsPlain = ActionTabs as FC<IActionTabsProps<string>>;
