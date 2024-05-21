import compose from "compose-function";
import { withStore } from "./withStore";
import { withWebsocket } from "./withWebsocket";

export const withProviders = compose(withStore, withWebsocket);
// export const withProviders = compose(withWebsocket, withStore, );
