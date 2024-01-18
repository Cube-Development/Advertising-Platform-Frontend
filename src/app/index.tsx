import { FC, ReactElement } from "react";
import Routing from "../pages";
import { withProviders } from "./providers";

const App: FC = (): ReactElement => {
  return <Routing/>;
};

export default withProviders(App);
