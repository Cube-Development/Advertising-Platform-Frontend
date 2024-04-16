import compose from "compose-function";
import { withLayout } from "./withLayout";
import { withRouter } from "./withRouter";
import { withStore } from "./withStore";

// export const withProviders = compose(withStore, withRouter, withLayout);
export const withProviders = compose(withStore);
