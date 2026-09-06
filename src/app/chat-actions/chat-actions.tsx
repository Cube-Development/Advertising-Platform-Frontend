import { useAppSelector } from "@shared/hooks";
import { useIsChatRoute } from "@shared/lib/chat-route";
import { Fragment, useMemo } from "react";
import { ChatAction } from "./chat-action";
import { ChatActionsDevtools } from "./dev/chat-actions-devtools";
import { CHAT_ACTIONS } from "./model/actions.registry";
import { isChatActionVisible } from "./model/action-visibility";
import { ActionGate } from "./ui";

/**
 * Registry of AI chat actions.
 *
 * Rendered only on the two pages that carry the chat widget itself (see
 * `useIsChatRoute`). Registering actions where no <adras-plugin> is mounted
 * would be pointless — nothing reads the registry — and it would leave the
 * hidden custom elements in the DOM of every page.
 *
 * Only the actions the current user can actually use are rendered. That is not
 * cosmetic: `<adras-action>` registers itself on `connectedCallback` and
 * unregisters on `disconnectedCallback`, and the plugin re-broadcasts the whole
 * catalogue to the AI whenever that set changes — so a blogger is never offered
 * advertiser flows, and vice versa.
 *
 * The `key` forces a full remount of the list when role or auth changes, which
 * guarantees the custom elements run their connect/disconnect callbacks instead
 * of React quietly reusing them.
 *
 * Every flow is lazily loaded and mounted only while its panel is open (see
 * `ChatAction`), so declaring all of them here costs nothing until the user
 * actually triggers one.
 */
export const ChatActions = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const isChatRoute = useIsChatRoute();

  const actions = useMemo(
    () =>
      CHAT_ACTIONS.filter((action) =>
        isChatActionVisible(action, isAuth, role),
      ),
    [isAuth, role],
  );

  // Ранний выход только после всех хуков — порядок вызовов должен быть стабилен.
  if (!isChatRoute) return null;

  return (
    <Fragment key={`${role}:${isAuth}`}>
      {actions.map(({ name, description, auth, roles, Component }) => (
        <ChatAction key={name} name={name} description={description}>
          <ActionGate auth={auth} roles={roles}>
            <Component />
          </ActionGate>
        </ChatAction>
      ))}
      {import.meta.env.DEV && (
        <ChatActionsDevtools names={actions.map((action) => action.name)} />
      )}
    </Fragment>
  );
};
