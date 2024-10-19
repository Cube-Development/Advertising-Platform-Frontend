import compose from "compose-function";
import { withStore } from "./withStore";
import { withWebsocket } from "./withWebsocket";
import { withHeight } from "./withHeight";

export const withProviders = compose(withStore, withWebsocket, withHeight);
// export const withProviders = compose(withWebsocket, withStore, );
