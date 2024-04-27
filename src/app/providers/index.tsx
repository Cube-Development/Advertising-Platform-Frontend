import compose from "compose-function";
import { withStore } from "./withStore";

export const withProviders = compose(withStore);
