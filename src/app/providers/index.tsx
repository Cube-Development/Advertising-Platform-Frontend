import compose from "compose-function";
import { withHeight } from "./withHeight";
import { withStore } from "./withStore";
import { withTooltip } from "./withTooltip";
import { withWebsocket } from "./withWebsocket";

export const withProviders = compose(
  withStore,
  withWebsocket,
  withHeight,
  withTooltip,
);
// export const withProviders = compose(withWebsocket, withStore, );
