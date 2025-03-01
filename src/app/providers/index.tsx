import compose from "compose-function";
import { withHeight } from "./withHeight";
import { withStore } from "./withStore";
import { withTooltip } from "./withTooltip";
import { withWebsocket } from "./withWebsocket";
import { withTelegram } from "./withTelegram";

export const withProviders = compose(
  withStore,
  withWebsocket,
  withHeight,
  withTooltip,
  withTelegram,
);
// export const withProviders = compose(withWebsocket, withStore, );
