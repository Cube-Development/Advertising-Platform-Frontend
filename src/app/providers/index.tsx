import compose from "compose-function";
import { withAuth } from "./withAuth";
import { withRole } from "./withRole";
import { withLayout } from "./withLayout";
import { withRouter } from "./withRouter";
import { withStore } from "./withStore";

export const withProviders = compose(withStore , withRouter, withAuth, withRole,    withLayout);
// export const withProviders = compose(withRouter, withStore);
// export const withProviders = withRouter
