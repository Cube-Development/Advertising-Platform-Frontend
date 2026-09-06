import { ENUM_ROLES } from "@entities/user";
import { ENUM_AUTH_TYPES } from "@shared/routing";

export interface IChatActionAccess {
  /** PRIVATE = signed in only, ONLY_PUBLIC = signed out only. */
  auth?: ENUM_AUTH_TYPES;
  /** Roles allowed to see this action. Omitted = any role. */
  roles?: ENUM_ROLES[];
}

export type TChatActionDenial = "auth" | "only-public" | "role" | null;

/**
 * Why (if at all) the current user may not use an action.
 *
 * A read-only mirror of the checks in `src/app/router/protected-route.tsx`.
 * Deliberately does NOT redirect and does NOT dispatch `toggleRole` — a chat
 * panel must never move the user or mutate global role state as a side effect
 * of the AI deciding to show something.
 */
export const getChatActionDenial = (
  access: IChatActionAccess,
  isAuth: boolean,
  role: ENUM_ROLES,
): TChatActionDenial => {
  if (access.auth === ENUM_AUTH_TYPES.PRIVATE && !isAuth) return "auth";
  if (access.auth === ENUM_AUTH_TYPES.ONLY_PUBLIC && isAuth)
    return "only-public";
  if (access.roles?.length && !access.roles.includes(role)) return "role";
  return null;
};

/**
 * Whether the action should be registered at all — i.e. whether the AI is even
 * told it exists. Unregistering re-broadcasts the catalogue to the AI, so a
 * blogger is never offered advertiser-only flows and vice versa.
 */
export const isChatActionVisible = (
  access: IChatActionAccess,
  isAuth: boolean,
  role: ENUM_ROLES,
): boolean => getChatActionDenial(access, isAuth, role) === null;
