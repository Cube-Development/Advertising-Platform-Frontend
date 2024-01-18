import compose from "compose-function";
import { withLayout } from "./withLayout";
import { withRouter } from "./withRouter";
// import { withStore } from "./withStore";

export const withProviders = compose(withRouter, withLayout);
// export const withProviders = compose(withRouter, withStore);
// export const withProviders = withRouter