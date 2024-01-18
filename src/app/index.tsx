import { withProviders } from "./providers";
import { FC, ReactElement } from "react";
import Routing from "../pages";

const App: FC = (): ReactElement => {
  return <Routing/>;
};

export default withProviders(App);
