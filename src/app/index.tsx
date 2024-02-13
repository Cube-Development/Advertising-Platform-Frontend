import { Routing } from "@pages/index";
import { withProviders } from "./providers";

const App: React.FC = () => {
  return <Routing />;
};

export default withProviders(App);
