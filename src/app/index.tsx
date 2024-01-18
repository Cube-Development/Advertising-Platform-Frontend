import { FC, ReactElement } from "react";
import { withProviders } from "./providers";
import { Routing } from "pages";

const App: FC = (): ReactElement => {
  return <Routing />;
};

export default withProviders(App);
