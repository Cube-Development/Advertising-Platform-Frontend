export * from "./action-gate";
export * from "./action-list";
export * from "./action-shell";
export * from "./action-states";
export * from "./action-tabs";
export * from "./deep-link-action";
export * from "./use-chat-action-nav";

/**
 * Page size chat panels ask for.
 *
 * Deliberately different from the `INTERSECTION_ELEMENTS.*` values the real
 * pages use, so a panel and the page underneath never share an RTK Query cache
 * entry — a panel must not be able to trigger a refetch that makes the page
 * flicker.
 */
export const CHAT_ACTION_PAGE_SIZE = 5;
