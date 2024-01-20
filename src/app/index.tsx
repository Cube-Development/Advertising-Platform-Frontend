import { withProviders } from "./providers";
import { Routing } from "pages";

const App: React.FC = () => {
  return <Routing />;
};

export default withProviders(App);
