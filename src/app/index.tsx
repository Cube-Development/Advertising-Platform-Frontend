import { Routing } from "@pages/index";
import { withProviders } from "./providers";

const App: React.FC = () => {
  return (
    <>
      <Routing />
      <h1>CI/CD PIPELINE YEEEEAAAAAAAHHHH</h1>
    </>
  );
};

export default withProviders(App);
